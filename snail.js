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

// Test cases
console.log("");
console.log("----------------------array1----------------------");
console.log("");
console.log(snail([[]]));
console.log([[]]);

console.log("");
console.log("----------------------array2----------------------");
console.log("");
console.log(snail([[1]]));
console.log([[1]]);

console.log("");
console.log("----------------------array3----------------------");
console.log("");
console.log(
  snail([
    [1, 2],
    [3, 4],
  ])
);
console.log([1, 2, 4, 3]);

console.log("");
console.log("----------------------array4----------------------");
console.log("");
console.log(
  snail([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
);
console.log([1, 2, 3, 6, 9, 8, 7, 4, 5]);

console.log("");
console.log("----------------------array5----------------------");
console.log("");
console.log(
  snail([
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25],
  ])
);
console.log([
  1, 2, 3, 4, 5, 10, 15, 20, 25, 24, 23, 22, 21, 16, 11, 6, 7, 8, 9, 14, 19, 18, 17, 12, 13,
]);

console.log("");
console.log("----------------------array6----------------------");
console.log("");

console.log(
  snail([
    [1, 2, 3, 4, 5, 6],
    [20, 21, 22, 23, 24, 7],
    [19, 32, 33, 34, 25, 8],
    [18, 31, 36, 35, 26, 9],
    [17, 30, 29, 28, 27, 10],
    [16, 15, 14, 13, 12, 11],
  ])
);
console.log([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
  28, 29, 30, 31, 32, 33, 34, 35, 36,
]);
console.log("");
