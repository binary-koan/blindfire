import { compact, find, flatMap, includes, times } from "lodash";

import blankTile from "../../models/map/blank-tile";

// Picked at random but designed to give a good balance between performance and ability to actually
// join up maps
const MAX_SEARCH_DISTANCE = 6;

// Utility to create a set of values identified by the stringified object (instead of object ID)
// This allows creating a set of arrays (points) with a meaningful implementation of `has()`,
// `without()`, etc.
function createPointSet(initialValues) {
  const base = new Map(initialValues.map(value => [value.toString(), value]));

  return {
    base,
    get size() { return base.size; },

    add: (item) => base.set(item.toString(), item),
    has: (item) => base.has(item.toString()),

    findMap: (mapper) => {
      let found;

      base.forEach(value => {
        const result = mapper(value);
        if (!found && result) found = result;
      });

      return found;
    },

    mergeEach: (callback) => {
      const itemsToMerge = new Set();

      base.forEach((item) => {
        callback(item).forEach(newItem => itemsToMerge.add(newItem))
      });

      itemsToMerge.forEach(item => base.set(item.toString(), item));
    },

    without: (toRemove) => {
      return createPointSet([...base.values()].filter(item => !toRemove.has(item)));
    }
  }
}

export default function ensureConnectedMap(tiles) {
  const tileRange = times(tiles.length);

  const blankTilesList = findBlankTiles();
  const blankTiles = createPointSet(blankTilesList);
  const connectedTiles = createPointSet([blankTilesList[0]]);

  function findBlankTiles() {
    // "Blank" tiles are those which the player can move through
    return compact(flatMap(tiles, list =>
      list.map(tile => tile.stopsPlayers ? null : [tile.x, tile.y])
    ));
  }

  function neighbours(x, y) {
    return [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]];
  }

  function validNeighbours(x, y) {
    return neighbours(x, y).filter(([nX, nY]) =>
      includes(tileRange, nX) && includes(tileRange, nY)
    );
  }

  function blankNeighbours(x, y) {
    return validNeighbours(x, y).filter(point => blankTiles.has(point));
  }

  function pathToUnconnectedTile([fromX, fromY], searchDistance, unconnectedTiles) {
    return find(
      [
        times(searchDistance).map(i => [fromX + i, fromY]),
        times(searchDistance).map(i => [fromX - i, fromY]),
        times(searchDistance).map(i => [fromX, fromY + i]),
        times(searchDistance).map(i => [fromX, fromY - i])
      ],
      path => unconnectedTiles.has(path[path.length - 1])
    );
  }

  function findTilesToErase() {
    const unconnectedTiles = blankTiles.without(connectedTiles);

    let searchDistance = 3; // Includes start and end tile
    while (searchDistance < MAX_SEARCH_DISTANCE) {
      const tilesToErase = connectedTiles.findMap(tile =>
        pathToUnconnectedTile(tile, searchDistance, unconnectedTiles)
      );

      if (tilesToErase) return tilesToErase;
      searchDistance += 1;
    }
  }

  function connectAnotherTile() {
    const tilesToErase = findTilesToErase();

    if (tilesToErase) {
      tilesToErase.forEach(([x, y]) => {
        tiles[x][y] = blankTile(x, y);

        blankTiles.add([x, y]);
        connectedTiles.add([x, y]);
      });
    }
  }

  while (blankTiles.size !== connectedTiles.size) {
    const oldConnectedTilesSize = connectedTiles.size;

    connectedTiles.mergeEach(([x, y]) => blankNeighbours(x, y));

    if (connectedTiles.size === oldConnectedTilesSize) {
      connectAnotherTile();

      if (connectedTiles.size === oldConnectedTilesSize) {
        // Couldn't find a tile to connect, so pull out
        return false;
      }
    }
  }

  return true;
}
