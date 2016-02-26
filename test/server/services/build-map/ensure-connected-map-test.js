import test from "tape";
import { clone } from "lodash";

import ensureConnectedMap from "../../../../src/server/services/build-map/ensure-connected-map";
import wallTile from "../../../../src/server/objects/map/wall";
import blankTile from "../../../../src/server/objects/map/blank";

function tileBlankness(tiles) {
  return tiles.map(list =>
    list.map(tile => tile.stopsPlayers)
  );
}

test("Ensure map is connected :: When already connected", t => {
  const tiles = [
    [wallTile(0, 0), wallTile(1, 0), wallTile(2, 0)],
    [wallTile(0, 1), blankTile(1, 1), wallTile(2, 1)],
    [wallTile(0, 2), wallTile(1, 2), wallTile(2, 2)]
  ];
  const expectedTiles = clone(tiles);

  const result = ensureConnectedMap(tiles);

  t.equals(result, true, "succeeds");
  t.deepEquals(tileBlankness(tiles), tileBlankness(expectedTiles), "doesn't modify tiles");

  t.end();
});

test("Ensure map is connected :: When a tile to remove can be found", t => {
  const tiles = [
    [blankTile(0, 0), blankTile(1, 0), wallTile(2, 0)],
    [blankTile(0, 1), wallTile(1, 1), blankTile(2, 1)],
    [wallTile(0, 2), blankTile(1, 2), wallTile(2, 2)]
  ];
  const expectedTiles = [
    [blankTile(0, 0), blankTile(1, 0), wallTile(2, 0)],
    [blankTile(0, 1), blankTile(1, 1), blankTile(2, 1)],
    [wallTile(0, 2), blankTile(1, 2), wallTile(2, 2)]
  ];

  const result = ensureConnectedMap(tiles);

  t.equals(result, true, "succeeds");
  t.deepEquals(tileBlankness(tiles), tileBlankness(expectedTiles), "blanks out a tile to connect the map");

  t.end();
});

test("Ensuring map is connected :: When no tile to remove can be found", t => {
  const tiles = [
    [blankTile(0, 0), wallTile(1, 0), wallTile(2, 0)],
    [wallTile(0, 1), blankTile(1, 1), wallTile(2, 1)],
    [wallTile(0, 2), wallTile(1, 2), wallTile(2, 2)]
  ];

  t.equals(ensureConnectedMap(tiles), false, "fails");

  t.end();
});
