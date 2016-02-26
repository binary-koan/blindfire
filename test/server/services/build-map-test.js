import test from "tape";
import sinon from "sinon";
import proxyquire from "proxyquire";
import { fill, mapKeys, mapValues } from "lodash";

test("Build map service", t => {
  const rooms = [
    { x: 0, y: 0, width: 6, height: 12 },
    { x: 6, y: 0, width: 6, height: 12 }
  ];

  const spies = {
    "./build-map/generate-rooms": { default: sinon.stub().returns(rooms) },
    "./build-map/add-room-walls": { default: sinon.spy() },
    "./build-map/populate-room": { default: sinon.spy() },
    "./build-map/generate-outer-walls": { default: sinon.spy() },
    "./build-map/fill-in-blanks": { default: sinon.spy() },
    "./build-map/ensure-connected-map": { default: sinon.stub().returns(true) },
  };
  const expectedTiles = fill(Array(12), []);

  const buildMap = proxyquire("../../../src/server/services/build-map", spies).default;

  buildMap(12, 1);

  t.ok(spies["./build-map/generate-rooms"].default.calledWith(12, 1), "generates rooms");

  rooms.forEach((room, i) => {
    t.ok(
      spies["./build-map/add-room-walls"].default.calledWith(expectedTiles, 1, room),
      `adds walls to room ${i + 1}`
    );

    t.ok(
      spies["./build-map/populate-room"].default.calledWith(expectedTiles, 1, room),
      `populates room ${i + 1}`
    );
  });

  t.ok(
    spies["./build-map/generate-outer-walls"].default.calledWith(expectedTiles),
    "generates outer walls"
  );
  t.ok(
    spies["./build-map/fill-in-blanks"].default.calledWith(expectedTiles),
    "fills in blanks"
  );
  t.ok(
    spies["./build-map/ensure-connected-map"].default.calledWith(expectedTiles),
    "ensures the map is connected"
  );

  t.end();
});
