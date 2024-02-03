// Given an n x n array, return the array elements arranged from outermost elements to the middle element, traveling clockwise.

snail = function (array) {
  let grid = array;
  let gridLength = array.length;

  if (!gridLength) return grid[0];
  if (gridLength === 1) return grid;

  let firstRow = grid.shift();
  let thirdRow = grid.pop().reverse();

  if (gridLength === 2) return firstRow.concat(thirdRow);

  let secondColumn = [];
  let fourthColumn = [];

  for (let i = 0; i < grid.length; i++) {
    secondColumn.push(grid[i].pop());
    fourthColumn.unshift(grid[i].shift());
  }

  return firstRow.concat(secondColumn, thirdRow, fourthColumn, snail(grid).flat());
};