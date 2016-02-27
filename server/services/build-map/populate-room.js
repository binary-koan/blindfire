import { random, times } from "lodash";

import treeTile from "../../models/map/tree-tile";

const TREE_MULTIPLIER = 2;

export default function populateRoom(tiles, complexity, { x, y, width, height }) {
  function addTrees() {
    times(Math.floor(TREE_MULTIPLIER * complexity / width), () => {
      const [treeX, treeY] = [x + random(width - 1), y + random(height - 1)];
      tiles[treeX][treeY] = treeTile(treeX, treeY);
    });
  }

  addTrees();
}
