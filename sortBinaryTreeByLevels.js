function treeByLevels(rootNode) {
  const sortedByLevels = [];
  const nodeQueue = [];

  if (typeof rootNode?.value !== "undefined") nodeQueue.push(rootNode);

  while (nodeQueue.length > 0) {
    if (typeof nodeQueue[0]?.value !== "undefined") sortedByLevels.push(nodeQueue[0].value);
    if (nodeQueue[0]?.left) nodeQueue.push(nodeQueue[0].left);
    if (nodeQueue[0]?.right) nodeQueue.push(nodeQueue[0].right);
    nodeQueue.shift();
  }

  return sortedByLevels;
}