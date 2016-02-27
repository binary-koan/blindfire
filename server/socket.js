import io from "socket.io";

import GameManager from "./models/game-manager";
import GameSocketClient from "./models/game-socket-client";
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

gameManager.on("joined game", ({ game, clients }) => {
  sendToClients(clients, "joined game", { game: gameToJson(game) });
});

gameManager.on("started game", ({ game, clients }) => {
  sendToClients(clients, "started game", { game: gameToJson(game) });
});

gameManager.on("processed actions", ({ game, clients, actions }) => {
  sendToClients(clients, "processed actions", { game: gameToJson(game), actions: actionsToJson(actions) });
});

gameManager.on("error", ({ clients, message }) {
  sendToClients(clients, "error", { message });
});
