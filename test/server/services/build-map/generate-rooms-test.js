import test from "tape";

import generateRooms from "../../..//server/services/build-map/generate-rooms";

test("Generate rooms :: Single room", t => {
  const rooms = generateRooms(12, 1);

  t.equals(rooms.length, 1, "generates one room");
  t.deepEquals(rooms[0], { x: 0, y: 0, width: 12, height: 12 }, "fills the map");
  t.end();
});

test("Generate rooms :: Multiple rooms", t => {
  const rooms = generateRooms(14, 4);
  const expectedRooms = [
    { x: 0, y: 0, width: 6, height: 6 },
    { x: 0, y: 6, width: 6, height: 8 },
    { x: 6, y: 0, width: 8, height: 6 },
    { x: 6, y: 6, width: 8, height: 8 }
  ];

  t.equals(rooms.length, 4, "generates a 2x2 grid of rooms");
  t.deepEquals(rooms, expectedRooms, "expands the edge rooms to fit the given size");
  t.end();
});
