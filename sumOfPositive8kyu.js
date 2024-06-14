function positiveSum(arr) {
  return arr.filter((num) => num > 0).reduce((total, curVal) => (total + curVal), 0);
}