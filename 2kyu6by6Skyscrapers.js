const { Grid } = require("swiper/modules");

function solvePuzzle(clues) {
  // Check clue validity, set grid size, construct and fill grid
  if (clues.length % 4 !== 0) return;
  const gridSize = clues.length / 4;
  const numberOfCells = gridSize ** 2;
  const cellSolutionSpaceRange = Array.from({ length: gridSize }, (_, i) => i + 1);
  const grid = Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize }, () => new Set(cellSolutionSpaceRange))
  );

  // Map Clues
  const colStartClue = clues.slice(0, gridSize);
  const colEndClue = clues.slice(gridSize * 2, gridSize * 3).reverse();
  const rowStartClue = clues.slice(gridSize * 3, gridSize * 4).reverse();
  const rowEndClue = clues.slice(gridSize, gridSize * 2);

  console.log("Clues:");
  console.log(`All Clues:${clues}`);
  console.log("");
  console.log(`Column  Start   Clues:    ${colStartClue}`);
  console.log(`Column  End     Clues:    ${colEndClue}`);
  console.log(`Row     Start   Clues:    ${rowStartClue}`);
  console.log(`Row     End     Clues:    ${rowEndClue}`);

  console.log("");
  console.log("Grid before:");
  console.log(grid);

  // Helper Functions
  let numberOfSolvedCells = 0;
  let numberOfCellsTraversed = 0;
  let maxIterations = numberOfCells * 4; //320 for 6x6
  const cellIsUnsolved = (row, col) => grid[row][col] instanceof Set;

  const deductValueFromSolutionSpace = (row, col, val) => {
    if (cellIsUnsolved(row, col) && grid[row][col].size > 1 && grid[row][col].has(val)) {
      grid[row][col].delete(val);

      solveSingleValCell(row, col);
    }
  };

  const solveSingleValCell = (row, col) => {
    if (cellIsUnsolved(row, col) && grid[row][col].size === 1) {
      const cellValue = grid[row][col].values().next().value;
      grid[row][col] = cellValue;
      numberOfSolvedCells++;

      for (let i = 0; i < gridSize; i++) {
        deductValueFromSolutionSpace(i, col, cellValue);
        deductValueFromSolutionSpace(row, i, cellValue);
      }
    }
  };

  const deductFromClueDistance = (row, col, clue, distanceToClue) => {
    if (clue === 1 && distanceToClue === 1) {
      for (const cellValue of grid[row][col]) {
        if (cellValue !== gridSize) grid[row][col].delete(cellValue);
      }
    } else {
      const limit = gridSize - (clue - distanceToClue);
      for (const cellValue of grid[row][col]) {
        if (cellValue > limit) grid[row][col].delete(cellValue);
      }
    }
    solveSingleValCell(row, col);
  };

  const initialDistanceDeductionFromClues = (row, col) => {
    if (colStartClue[col]) deductFromClueDistance(row, col, colStartClue[col], row + 1);
    if (colEndClue[col]) deductFromClueDistance(row, col, colEndClue[col], gridSize - row);
    if (rowStartClue[row]) deductFromClueDistance(row, col, rowStartClue[row], col + 1);
    if (rowEndClue[row]) deductFromClueDistance(row, col, rowEndClue[row], gridSize - col);
  };

  // If cell is the only one with value x in either row or col it must be the solution
  const deductFromRowColumnValues = (row, col) => {
    console.log(`Execute deductFromRowColumnValues on row: ${row}, col: ${col}`);
    if (cellIsUnsolved(row, col)) {
      console.log(`cell Is Unsolved: ${cellIsUnsolved(row, col)}`);
      const cellSet = new Set(grid[row][col]);

      const cumulativeRowValues = new Set();
      const cumulativeColValues = new Set();

      for (let i = 0; i < gridSize; i++) {
        if (i !== row) {
          const otherCell = grid[i][col];
          if (otherCell instanceof Set) {
            for (const val of otherCell) cumulativeRowValues.add(val);
          } else {
            cumulativeRowValues.add(otherCell);
          }
        }

        if (i !== col) {
          const otherCell = grid[row][i];
          if (otherCell instanceof Set) {
            for (const val of otherCell) cumulativeColValues.add(val);
          } else {
            cumulativeColValues.add(otherCell);
          }
        }

        console.log(`i: ${i}`);
        console.log(`grid ${[i]}, ${[col]}:`);
        console.log(grid[i][col]);
        console.log(`grid ${[row]}, ${[i]}:`);
        console.log(grid[row][i]);
        console.log(`cellSet is:`);
        console.log(cellSet);
      }

      console.log(`cumulativeRowValues is:`);
      console.log(cumulativeRowValues);
      console.log(`cumulativeColValues is:`);
      console.log(cumulativeColValues);
      const setRowDiff = new Set([...cellSet].filter((val) => !cumulativeRowValues.has(val)));
      const setColDiff = new Set([...cellSet].filter((val) => !cumulativeColValues.has(val)));

      if (setRowDiff.size === 1) grid[row][col] = new Set([setRowDiff.values().next().value]);
      if (setColDiff.size === 1) grid[row][col] = new Set([setColDiff.values().next().value]);
      console.log(`cellSet after:`);
      console.log(cellSet);
      console.log("");
    }
  };

  // Traverse Grid until solved
  while (numberOfCellsTraversed < maxIterations && numberOfSolvedCells < numberOfCells) {
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        numberOfCellsTraversed++;
        if (cellIsUnsolved(row, col)) {
          // Only executed on first run
          if (numberOfCellsTraversed <= numberOfCells) {
            initialDistanceDeductionFromClues(row, col);
          }

          deductFromRowColumnValues(row, col);
          solveSingleValCell(row, col);
        } else {
          continue;
        }
      }
    }
  }

  console.log("-----------------------------");
  console.log("Grid after:");
  console.log(grid);
  console.log("-----------------------------");
}

//    Initial simple Deduction

//      More Advanced deduction methods
//      if tower with x height is placed here, would it meet the criteria for the clue
//      if i can see tallest tower, where should the second tallest be placed to satisfy
//      clue condition, see if that deduction is possible

// Go over all cells
//    Place and deduct values
//      count visible tower in a row/column

//      If we have x cells with the same x values in a row or col e.g. 3 cells with the same
//      3, all 134, we can exclude these 3 values from all other cells in that row or column
//
// if clue is visible tower count plus 1, place the tallest remaining tower the
// if i place x here can it be solved
// with the towers currently visible from this clue, and the potential towers in the remaining cells can anything be deducted
// count visible towers from this clue

// Count inwards from clues
//    deduct potential values e.g.
//      max value (6) in the first position with 2 as a clue
//      4, 5, 6 in first, 5, 6, in second, 6 in third with 4 as a clue
//    how many towers are visible from this clue now
//      which fields are empty, can we deduct any values from this e.g.
//      if tower 5 and 6 are visible from a clue 3 field, and the first 3 cells are still free
//      we need to place 4 in the cell closest to the clue
//      if tower 4 is in the first cell, tower 6 is in the fourth cell, we must exclude tower 5
//      from cell 2 and three, if the clue is 2

// clue from either side is grid size plus one e.g. 3 and 4 in a 6x6 grid then we know the placement of the six tower
//
// (This might not be necessary)
// When all deterministic approaches have been explored, save the board, save the tracked numbers, for potential future backtracking
// In case we need to guess save the current board with the values we are sure are correct as a reference backup point we might need to come back to

const clue3 = [0, 3, 0, 5, 3, 4, 0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0];
const expected3 = [
  [5, 2, 6, 1, 4, 3],
  [6, 4, 3, 2, 5, 1],
  [3, 1, 5, 4, 6, 2],
  [2, 6, 1, 5, 3, 4],
  [4, 3, 2, 6, 1, 5],
  [1, 5, 4, 3, 2, 6],
];

// const clue3 = [0, 3, 0, 5, 3, 4, 0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0];
// const expected3 = [
//      0  3  0  5  3  4
//   0 [5, 2, 6, 1, 4, 3], 0
//   1 [6, 4, 3, 2, 5, 1], 0
//   3 [3, 1, 5, 4, 6, 2], 0
//   0 [2, 6, 1, 5, 3, 4], 0
//   2 [4, 3, 2, 6, 1, 5], 0
//   3 [1, 5, 4, 3, 2, 6], 1
//      3  2  3  0  3  0
// ];

// const clue3 = [0, 3, 0, 5, 3, 4, 0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0];
// const expected3 = [
//         3     5  3  4
//     [0, 0, 0, 0, 0, 0],
//   1 [6, 0, 0, 0, 0, 0],
//   3 [0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0],
//   2 [0, 0, 0, 6, 0, 0],
//   3 [0, 0, 0, 0, 0, 6], 1
//      3  2  3     3
// ];

// const clue3 = [0, 3, 0, 5, 3, 4, 0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0];
// const expected3 = [
//      0  3  0  5  3  4
//   0 [0, 0, 0, 0, 0, 0], 0
//   1 [0, 0, 0, 0, 0, 0], 0
//   3 [0, 0, 0, 0, 0, 0], 0
//   0 [0, 0, 0, 0, 0, 0], 0
//   2 [0, 0, 0, 0, 0, 0], 0
//   3 [0, 0, 0, 0, 0, 0], 1
//      3  2  3  0  3  0
// ];

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
//
//
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
