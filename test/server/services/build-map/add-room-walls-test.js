import test from "tape";
import { some, every } from "lodash";

import addRoomWalls from "../../../../server/services/build-map/add-room-walls";

test("Adding room walls", t => {
  const tiles = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]
  ];

  addRoomWalls(tiles, 5, { x: 0, y: 0, width: 3, height: 3 });

  const hasWall = some(tiles, list =>
    some(list, tile => tile && tile.stopsPlayers)
  );
  t.ok(hasWall, "adds a wall to the room");
  t.end();
});
