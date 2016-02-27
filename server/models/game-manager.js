import Hashids from "hashids";

export default function GameManager() {
  const games = [];
  const hashids = new(Hashids);

  const { emit, on } = EventHandler();

  function joinGame(client, { create, id }) {
    if (client.inGame) return emit("error"
  }
}
