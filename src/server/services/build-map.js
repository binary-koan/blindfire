import { fill } from "lodash";

import generateRooms from "./build-map/generate-rooms";
import addRoomWalls from "./build-map/add-room-walls";
import populateRoom from "./build-map/populate-room";
import generateOuterWalls from "./build-map/generate-outer-walls";
import fillInBlanks from "./build-map/fill-in-blanks";
import ensureConnectedMap from "./build-map/ensure-connected-map";

const MIN_COMPLEXITY = 1;
const MAX_COMPLEXITY = 5;
const DEFAULT_COMPLEXITY = 3;

const ROOM_BUILDERS = [addRoomWalls, populateRoom];

export default function buildMap(size, complexity = DEFAULT_COMPLEXITY) {
  function attemptToGenerateMap() {
    const tiles = fill(Array(size), []);

    generateRooms(size, complexity).forEach(rect =>
      ROOM_BUILDERS.forEach(service => service(tiles, complexity, rect))
    );
    generateOuterWalls(tiles);
    fillInBlanks(tiles);

    if (ensureConnectedMap(tiles)) {
      return tiles;
    }
  }

  let tiles;
  while (!tiles) tiles = attemptToGenerateMap();

  return tiles;
}
