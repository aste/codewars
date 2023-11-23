function bigToSmall(arr) {
  const sortOrder = (a, b) => (a > b ? -1 : 0);
  const combinedArr = [];

  return combinedArr
    .concat(...arr)
    .sort(sortOrder)
    .join(">");
}