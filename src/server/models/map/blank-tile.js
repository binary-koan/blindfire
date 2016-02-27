export default function blankTile(x, y) {
  return {
    x, y,
    opaque: false,
    stopsPlayers: false,
    stopsBullets: false
  };
}
