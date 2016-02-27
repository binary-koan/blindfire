export default function wallTile(x, y) {
  return {
    x, y,
    opaque: true,
    stopsPlayers: true,
    stopsBullets: true
  };
}
