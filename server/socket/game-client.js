export default function GameSocketClient(socketClient) {
  let currentGame;
  let player;

  function join(game) {
    if (currentGame) throw "You're already in a game!";
    if (!game.acceptingPlayers) throw "You can't join that game!";

    currentGame = game;
    player = game.addPlayer();
  }

  function applyActions(actions) {
    if (!currentGame) throw "You're not in a game!";
    if (!player.isAlive) throw "You're dead, you can't act!";
    if (currentGame.hasActions(player)) throw "You've already entered actions this turn!";

    currentGame.recordActions(player);
  }

  return {
    join,
    applyActions,
    get game() { return currentGame; }
  };
}
