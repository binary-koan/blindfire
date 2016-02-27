import { times } from "lodash";

import blankTile from "../../models/map/blank-tile";

export default function fillInBlanks(tiles) {
  times(tiles.length, x => {
    times(tiles.length, y => {
      tiles[x][y] = tiles[x][y] || blankTile(x, y);
    })
  });
}
