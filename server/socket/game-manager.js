import Hashids from "hashids";

import Game from "./game";

export default function GameManager() {
  const games = [];
  const hashids = new(Hashids)("not actually a random salt");

  const { emit, on } = EventHandler();

  function clientError(client, message) {
    emit("error", { clients: [client], message };
  }

  function getGame({ create, id }) {
    if (create) {
      return games.push({ game: Game(), clients: [] });
    } else {
      return games[hashids.decode(id)[0]] || {};
    }
  }

  function joinGame(client, { create, id }) {
    const { game, clients } = getGame({ create, id });

    if (!game) return clientError("That game doesn't exist!");
    if (includes(clients, client)) return clientError("You're already in that game!");

    const joinResult = attempt(client.join, game);

    if (isError(joinResult)) {
      clientError(joinResult.message);
    } else {
      clients.push(client);
      emit("client joined", { game: socketGame.game, clients: socketGame.clients });
    }
  }

  function startGame(client, { id }) {
    const socketGame = getGame({ id });

    if (socketGame.game.canStart) {
      socketGame.game.start();

      emit("game started", { game: socketGame.game, clients: socketGame.clients });
    } else {
      clientError("The game can't be started yet!");
    }
  }

  function submitActions(client, { id, actions }) {
    const { game, clients } = getGame({ id });

    if (!game) throw "That game doesn't exist!";
    if (game !== client.game) throw "You're not in that game!";

    const submitResult = attempt(client.applyActions, actions);

    if (isError(submitResult)) {
      clientError(submitResult.message);
    } else if (game.isNewTurn) {
      emit("actions processed", { game, clients, actions: game.lastActions });
    } else {
      emit("actions received", { client });
    }
  }

  return { on, joinGame, startGame, submitActions };
}
