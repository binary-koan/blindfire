import { max, min, random, sample, sampleSize, times } from "lodash";

import wallTile from "../../models/map/wall-tile";

export default function addRoomWalls(tiles, complexity, { x, y, width, height }) {
  const possibleWalls = [
    leftWall(), rightWall(), topWall(), bottomWall(),
    sample([horizontalCenterWall(), verticalCenterWall()])
  ];

  function partialWall(coords) {
    const maxParts = min([complexity * 2, coords.size - 1]);
    const minParts = max([maxParts - complexity, 1]);

    const parts = random(minParts, maxParts);
    const start = random(coords.size - parts);

    return coords.slice(start, parts);
  }

  function leftWall() {
    return partialWall(times(height).map(i => [x, y + i]));
  }

  function rightWall() {
    return partialWall(times(height).map(i => [x + width - 1, y + i]));
  }

  function topWall() {
    return partialWall(times(width).map(i => [x + i, y]));
  }

  function bottomWall() {
    return partialWall(times(width).map(i => [x + i, y + height - 1]));
  }

  function verticalCenterWall() {
    return partialWall(times(height).map(i => [Math.floor(x + width / 2), y + i]));
  }

  function horizontalCenterWall() {
    return partialWall(times(width).map(i => [x + i, Math.floor(y + height / 2)]));
  }

  function wallCount() {
    const [min, max] = [complexity, possibleWalls.size].sort();

    return random(min, max);
  }

  function walls() {
    return sampleSize(possibleWalls, wallCount());
  }

  function addWall(coords) {
    coords.forEach(([x, y]) => {
      tiles[x][y] = wallTile(x, y);
    });
  }

  walls().forEach(coords => addWall(coords));
}
