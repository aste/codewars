function solvePuzzle(clues) {
  // Check clue validity, set grid size, construct and fill grid
  if (clues.length % 4 !== 0) return;
  const gridSize = clues.length / 4;
  const cellSolutionSpaceRange = Array.from({ length: gridSize }, (_, i) => i + 1);
  const grid = Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize }, () => new Set(cellSolutionSpaceRange))
  );

  // Map Clues
  const topColumnClues = clues.slice(0, gridSize);
  const rightRowClues = clues.slice(gridSize, gridSize * 2);
  const bottomColumnClues = clues.slice(gridSize * 2, gridSize * 3).reverse();
  const leftRowClues = clues.slice(gridSize * 3, gridSize * 4).reverse();

  console.log("Clues:");
  console.log(`All Clues:${clues}`);
  console.log("");
  console.log(`top    Column  Clues:    ${topColumnClues}`);
  console.log(`right  Row     Clues:    ${rightRowClues}`);
  console.log(`bottom Column  Clues:    ${bottomColumnClues}`);
  console.log(`left   Row     Clues:    ${leftRowClues}`);

  console.log("");
  console.log("Grid:");
  console.log(grid);

  // Helper Functions
  const cellIsUnsolved = (row, col) => grid[row][col] instanceof Set;

  // const deductValueFromRowAndColumn = (1, 4) => {
  const traverseRowCol = (row, col, normalDirection = true) => {};

  const deductValueFromSolutionSpace = (row, col, val) => {
    if (grid[row][col] instanceof Set && grid[row][col].has(val) && grid.size > 1) {
      grid[row][col].delete(val);

      solveSingleValCell(row, col);
    }
  };

  // Place cell value, remove value from all cells in both row and col direction
  const solveSingleValCell = (row, col) => {
    if (grid[row][col] instanceof Set && grid[row][col].size === 1) {
      const cellValue = grid[row][col].values().next().value;
      grid[row][col] = cellValue;

      for (let i = 0; i < gridSize; i++) {
        deductValueFromSolutionSpace(i, col, cellValue);
        deductValueFromSolutionSpace(row, i, cellValue);
      }
    }
  };

  // Traverse Row
  // Traverse Column

  // Traverse all clues
  const traverseClue = () => {
    for (let index = 0; index < gridSize; index++) {
      let topClue = topColumnClues[i];
      if (topClue) {
        for (let crossIndex = 0; crossIndex < gridSize; crossIndex++) {
          topClue += 1;
          deductCellValueFromClue(topClue, index, crossIndex);
        }
      }
      // if (leftRowClues[i]) {
      // }
      // // Reverse transverse
      // if (rightRowClues[i]) {
      // }
      // if (bottomColumnClues[i]) {
      // }
    }
  };
  //    Deduct and place values inwards from clue
  //      deduct gradually inwards from clue e.g. clue 4 should remove the tallest 3 towers,
  //      from the 1st cell, the tallest 2 towers from the 2nd cell, the tallest tower from
  //      the 3rd cell
  //      if tower with x height is placed here, would it meet the criteria for the clue
  //      if i can see tallest tower, where should the second tallest be placed to satisfy
  //      clue condition, see if that deduction is possible

  // Go over all cells
  //    Place and deduct values
  //      How many can you see from one side now
  //      If cell is the only one with value x in either row or col it must be the solution
  //      If we have x cells with the same x values in a row or col e.g. 3 cells with the same
  //      3, all 134, we can exclude these 3 values from all other cells in that row or column

  // Place Value in Cell
  // Remove value from all row and columns
  // Distance to clue

  // if clue
  // clue = 1, max

  // Traverse Row & Column
  // const traverseGrid = (grid) => {
  //   for (let row = 0; row < gridSize; row++) {
  //     for (let col = 0; col < gridSize; col++) {
  //       if (cellIsUnsolved(row, col) {

  //       })
  //     }
  //   }}
  // };

  // Check Row- & Column & Clues

  // When all deterministic approaches have been explored, save the board, save the tracked numbers, for potential future backtracking

  // Remove cell value (might be better to save the 100% deterministic solution and backtrack later, if the guess doesn't lead to any outcome)
  // const removeCellValue = (row, col, val) => {
  //   grid[row][col] = 0;
  //   usedInRow[row].delete(val);
  //   usedInColumn[col].delete(val);
  // };

  // Insert a full row or column
  // const fillRowOrColumn = (startRowCoord, startColCoord) => {
  //   for (let i = 0; i < gridSize; i++) {
  //     removeCellValue(i, colCoord, value);
  //     removeCellValue(rowCoord, i, value);
  //   }
  // };

  // In case we need to guess save the current board with the values we are sure are correct as a reference backup point we might need to come back to

  // count visible tower in a row/column
  // if clue is visible tower count plus 1, place the tallest remaining tower the
  // if i place x here can it be solved
  // with the towers currently visible from this clue, and the potential towers in the remaining cells can anything be deducted
  // count visible towers from this clue

  // if 1 fill 6 in first slot

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

  // would it be better to add all possible values in a cell and gradually remove them as they become invalid options or would it be better to only fill the values in a cell, once we are sure we need to use that specific value
}

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
