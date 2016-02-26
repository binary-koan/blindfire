import test from "tape";
import { includes, some } from "lodash";

import fillInBlanks from "../../../../src/server/services/build-map/fill-in-blanks";
import wallTile from "../../../../src/server/objects/map/wall";
import blankTile from "../../../../src/server/objects/map/blank";

test("Filling in blanks", t => {
  const tiles = [
    [undefined, wallTile(1, 0), wallTile(2, 0)],
    [wallTile(0, 1), undefined, wallTile(2, 1)],
    [undefined, wallTile(1, 2), undefined]
  ];

  fillInBlanks(tiles);

  const hasBlanks = some(tiles, list => includes(list, undefined));
  t.notOk(hasBlanks, "fills in all blanks");
  t.equals(tiles[0][0].stopsPlayers, false, "fills in blanks with non-blocking tiles");

  t.end();
});
