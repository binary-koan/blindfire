import { times } from "lodash";

import wallTile from "../../models/map/wall-tile";

export default function generateOuterWalls(tiles) {
  times(tiles.length, firstCoord => {
    [0, tiles.length - 1].forEach(secondCoord => {
      // Do both the horizontal and vertical walls at the same time
      tiles[firstCoord][secondCoord] = wallTile(firstCoord, secondCoord);
      tiles[secondCoord][firstCoord] = wallTile(secondCoord, firstCoord);
    })
  });
}
