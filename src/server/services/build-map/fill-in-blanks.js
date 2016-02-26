import { times } from "lodash";

import blankTile from "../../objects/map/blank";

export default function fillInBlanks(tiles) {
  times(tiles.length, x => {
    times(tiles.length, y => {
      tiles[x][y] = tiles[x][y] || blankTile(x, y);
    })
  });
}
