function solvePuzzle(clues) {
  // Check grid validity, set grid size, construct and fill grid
  if (clues.length % 4 !== 0) return;
  const gridSize = clues.length / 4;
  const grid = Array(gridSize)
    .fill(null)
    .map(() => Array(gridSize).fill(0));

  // Map Clues
  const leftRowClues = clues.slice(gridSize * 3, gridSize * 4).reverse();
  const rightRowClues = clues.slice(gridSize, gridSize * 2);
  const topColumnClues = clues.slice(0, gridSize);
  const bottomColumnClues = clues.slice(gridSize * 2, gridSize * 3).reverse();

  // Track Numerical Values Used
  const usedInRow = Array(gridSize)
    .fill(null)
    .map(() => new Set());
  const usedInColumn = Array(gridSize)
    .fill(null)
    .map(() => new Set());


  // Insert cell value
  const insertCellValue = (row, col, val) => {
    grid[row][col] = val;
    usedInRow[row].add(val);
    usedInColumn[col].add(val);
  };

  // Remove cell value
  const removeCellValue = (row, col, val) => {
    grid[row][col] = 0;
    usedInRow[row].delete(val);
    usedInColumn[col].delete(val);
  }




  console.log(grid);
}

// const clue1 = [3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2, 4];
// const expected1 = [
//   [2, 1, 4, 3, 5, 6],
//   [1, 6, 3, 2, 4, 5],
//   [4, 3, 6, 5, 1, 2],
//   [6, 5, 2, 1, 3, 4],
//   [5, 4, 1, 6, 2, 3],
//   [3, 2, 5, 4, 6, 1],
// ];

// const clue2 = [0, 0, 0, 2, 2, 0, 0, 0, 0, 6, 3, 0, 0, 4, 0, 0, 0, 0, 4, 4, 0, 3, 0, 0];
// const expected2 = [
//   [5, 6, 1, 4, 3, 2],
//   [4, 1, 3, 2, 6, 5],
//   [2, 3, 6, 1, 5, 4],
//   [6, 5, 4, 3, 2, 1],
//   [1, 2, 5, 6, 4, 3],
//   [3, 4, 2, 5, 1, 6],
// ];

// const clue3 = [0, 3, 0, 5, 3, 4, 0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0];
const clue3 = [0, 3, 0, 5, 3, 4, 0, 0, 0, 0, 0, 1, 0, 3, 6, 3, 2, 3, 3, 2, 0, 3, 1, 0];
const expected3 = [
  [5, 2, 6, 1, 4, 3],
  [6, 4, 3, 2, 5, 1],
  [3, 1, 5, 4, 6, 2],
  [2, 6, 1, 5, 3, 4],
  [4, 3, 2, 6, 1, 5],
  [1, 5, 4, 3, 2, 6],
];

// console.log(expected1);
// console.log(solvePuzzle(clue1));
// solvePuzzle(clue1);
// console.log("");

// console.log(expected2);
// console.log(solvePuzzle(clue2));
// solvePuzzle(clue2);
// console.log("");

// console.log(expected3);
// console.log(solvePuzzle(clue3));
solvePuzzle(clue3);
console.log("");

// Description:
// In a grid of 6 by 6 squares you want to place a skyscraper in each square with only some clues:

// The height of the skyscrapers is between 1 and 6
// No two skyscrapers in a row or column may have the same number of floors
// A clue is the number of skyscrapers that you can see in a row or column from the outside
// Higher skyscrapers block the view of lower skyscrapers located behind them

// Can you write a program that can solve each 6 by 6 puzzle?

// Example:

// To understand how the puzzle works, this is an example of a row with 2 clues. Seen from the left there are 6 buildings visible while seen from the right side only 1:

//  6	  	  	  	  	  	  	 1

// There is only one way in which the skyscrapers can be placed. From left-to-right all six buildings must be visible and no building may hide behind another building:

//  6	 1	 2	 3	 4	 5	 6	 1

// Example of a 6 by 6 puzzle with the solution:

//   	   	   	   	2	2

//  3
//   	  	  	  	  	  	  	 6
//  4	  	  	  	  	  	  	 3
//  4
//   	  	  	  	  	4

//   	  	  	  	 2	 2
//   	 5	 6	 1	 4	 3	 2
//   	 4	 1	 3	 2	 6	 5
//  3	 2	 3	 6	 1	 5	 4
//   	 6	 5	 4	 3	 2	 1	 6
//  4	 1	 2	 5	 6	 4	 3	 3
//  4	 3	 4	 2	 5	 1	 6
//   	  	  	  	  	4

// Task:

// Finish:
// function solvePuzzle(clues)
// Pass the clues in an array of 24 items. The clues are in the array around the clock. Index:
//   	 0	 1	 2	 3	 4	 5
//  23	  	  	  	  	  	  	 6
//  22	  	  	  	  	  	  	 7
//  21	  	  	  	  	  	  	 8
//  20	  	  	  	  	  	  	 9
//  19	  	  	  	  	  	  	 10
//  18	  	  	  	  	  	  	 11
//   	17	16	15	14	13	12
// If no clue is available, add value `0`
// Each puzzle has only one possible solution
// `SolvePuzzle()` returns matrix `int[][]`. The first indexer is for the row, the second indexer for the column. Python returns a 6-tuple of 6-tuples, Ruby a 6-Array of 6-Arrays.
