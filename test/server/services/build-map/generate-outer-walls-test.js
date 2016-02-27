import test from "tape";
import { every, isUndefined } from "lodash";

import generateOuterWalls from "../../../../server/services/build-map/generate-outer-walls";

test("Generate outer walls", t => {
  const tiles = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]
  ];

  generateOuterWalls(tiles);

  const hasWalls = every(
    [[0, 0], [1, 0], [2, 0], [0, 1], [2, 1], [0, 2], [1, 2], [2, 2]],
    ([x, y]) => tiles[x][y].stopsPlayers
  );

  t.ok(hasWalls, "adds walls around the map");
  t.ok(isUndefined(tiles[1][1]), "doesn't change the center tile");
  t.end();
});
