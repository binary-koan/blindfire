import test from "tape";
import { some, every } from "lodash";

import populateRoom from "../../../../server/services/build-map/populate-room";

test("Populating the room", t => {
  const tiles = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]
  ];

  populateRoom(tiles, 5, { x: 0, y: 0, width: 3, height: 3 });

  const hasTree = some(tiles, list =>
    some(list, tile => tile && tile.stopsPlayers && !tile.stopsBullets)
  );
  t.ok(hasTree, "adds a tree to the room");
  t.end();
});
