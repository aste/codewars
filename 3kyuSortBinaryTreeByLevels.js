function treeByLevels(rootNode) {
  const sortedByLevels = [];
  const nodeQueue = [rootNode];

  while (nodeQueue.length) {
    if (typeof nodeQueue[0]?.value !== "undefined") sortedByLevels.push(nodeQueue[0].value);
    if (nodeQueue[0]?.left) nodeQueue.push(nodeQueue[0].left);
    if (nodeQueue[0]?.right) nodeQueue.push(nodeQueue[0].right);
    nodeQueue.shift();
  }

  return sortedByLevels;
}