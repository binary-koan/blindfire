import io from "socket.io";

import GameManager from "./game-manager";
import GameSocketClient from "./game-client";
import gameToJson from "./presenters/game-to-json";
import actionsToJson from "./presenters/actions-to-json";

const socket = io();
const gameManager = GameManager();

function sendToClients(clients, eventName, data) {
  clients.forEach(client => client.socketClient.emit(eventName, data));
}

socket.on("connection", socketClient => {
  const client = GameSocketClient(socketClient);

  client.on("join game", partial(gameManager.joinGame, client));
  client.on("start game", partial(gameManager.startGame, client));
  client.on("submit actions", partial(gameManager.submitActions, client));
});

gameManager.on("client joined", ({ game, clients }) => {
  sendToClients(clients, "client joined", { game: gameToJson(game) });
});

gameManager.on("game started", ({ game, clients }) => {
  sendToClients(clients, "game started", { game: gameToJson(game) });
});

gameManager.on("actions received", ({ game, client }) => {
  sendToClients([client], "actions received");
});

gameManager.on("actions processed", ({ game, clients, actions }) => {
  sendToClients(clients, "actions processed", { game: gameToJson(game), actions: actionsToJson(actions) });
});

gameManager.on("error", ({ clients, message }) {
  sendToClients(clients, "error", { message });
});
