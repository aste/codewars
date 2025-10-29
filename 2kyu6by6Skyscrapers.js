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
  let maxIterations = numberOfCells * 20;
  let gridHasChanged = false;
  const cellIsUnsolved = (row, col) => grid[row][col] instanceof Set;

  const deductValueFromSolutionSpace = (row, col, val) => {
    gridHasChanged = true;
    if (cellIsUnsolved(row, col) && grid[row][col].size > 1 && grid[row][col].has(val)) {
      grid[row][col].delete(val);
    }
  };

  const solveSingleValueCell = (row, col) => {
    if (cellIsUnsolved(row, col) && grid[row][col].size === 1) {
      const cellValue = grid[row][col].values().next().value;
      gridHasChanged = true;
      grid[row][col] = cellValue;
      numberOfSolvedCells++;

      for (let i = 0; i < gridSize; i++) {
        deductValueFromSolutionSpace(i, col, cellValue);
        deductValueFromSolutionSpace(row, i, cellValue);
      }
    }
  };

  const deductValuesFromDistToClue = (row, col, clue, distanceToClue) => {
    if (clue === 1 && distanceToClue === 1) {
      for (const cellValue of grid[row][col]) {
        if (cellValue !== gridSize) {
          gridHasChanged = true;
          grid[row][col].delete(cellValue);
        }
      }
    } else {
      const upperLimit = gridSize - (clue - distanceToClue);
      if (grid[row][col] instanceof Set) {
        for (const cellValue of grid[row][col]) {
          if (cellValue > upperLimit) {
            gridHasChanged = true;
            grid[row][col].delete(cellValue);
          }
        }
      }
    }
  };

  const initialValueDeductionFromClues = (row, col) => {
    if (colStartClue[col]) deductValuesFromDistToClue(row, col, colStartClue[col], row + 1);
    if (colEndClue[col]) deductValuesFromDistToClue(row, col, colEndClue[col], gridSize - row);
    if (rowStartClue[row]) deductValuesFromDistToClue(row, col, rowStartClue[row], col + 1);
    if (rowEndClue[row]) deductValuesFromDistToClue(row, col, rowEndClue[row], gridSize - col);
  };

  const deductFromUniqueness = (row, col) => {
    if (cellIsUnsolved(row, col)) {
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
      }

      const setRowDiff = new Set([...cellSet].filter((val) => !cumulativeRowValues.has(val)));
      const setColDiff = new Set([...cellSet].filter((val) => !cumulativeColValues.has(val)));

      if (setRowDiff.size === 1) grid[row][col] = new Set([setRowDiff.values().next().value]);
      if (setColDiff.size === 1) grid[row][col] = new Set([setColDiff.values().next().value]);
    }
  };

  const countVisibleTowers = (sequence) => {
    let maxHeight = 0;
    let visibleTowers = 0;

    for (const height of sequence) {
      if (height > maxHeight) {
        visibleTowers++;
        maxHeight = height;
      }
    }
    return visibleTowers;
  };

  function deductCandidateFromPermutations(grid, gridPermutations) {
    const { rowPerms, colPerms } = gridPermutations;

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (typeof grid[row][col] === "number") continue;

        const rowAllowed = new Set(rowPerms[row].map((p) => p[col]));
        const colAllowed = new Set(colPerms[col].map((p) => p[row]));
        const intersection = [...grid[row][col]].filter(
          (v) => rowAllowed.has(v) && colAllowed.has(v)
        );

        if (intersection.length < grid[row][col].size) {
          grid[row][col] = new Set(intersection);
          gridHasChanged = true;
        }
      }
    }
  }

  const crossConsistencyConvergence = (grid) => {
    let changed = true;
    let rowPerms = [],
      colPerms = [];

    while (changed) {
      changed = false;
      const newPerms = generateRemainingGridPermutations(grid);
      rowPerms = newPerms.rowPerms;
      colPerms = newPerms.colPerms;

      const before = JSON.stringify(grid);
      deductCandidateFromPermutations(grid, { rowPerms, colPerms });
      const after = JSON.stringify(grid);

      if (before !== after) changed = true;
    }
  };

  const generateRemainingGridPermutations = (grid) => {
    const rowPerms = [];
    const colPerms = [];

    for (let row = 0; row < gridSize; row++) {
      const candidateList = grid[row].map((cell) =>
        typeof cell === "number" ? [cell] : [...cell]
      );

      const perms = generatePermutationsFromCandidates(
        candidateList,
        rowStartClue[row],
        rowEndClue[row]
      );

      rowPerms[row] = perms;
    }

    for (let col = 0; col < gridSize; col++) {
      const candidateList = [];
      for (let row = 0; row < gridSize; row++) {
        const cell = grid[row][col];
        candidateList.push(typeof cell === "number" ? [cell] : [...cell]);
      }

      const perms = generatePermutationsFromCandidates(
        candidateList,
        colStartClue[col],
        colEndClue[col]
      );

      colPerms[col] = perms;
    }

    return { rowPerms, colPerms };
  };

  const generatePermutationsFromCandidates = (
    candidateList,
    startClue = false,
    endClue = false
  ) => {
    const result = [];
    const used = new Set();

    function backtrack(path = []) {
      const i = path.length;
      if (i === candidateList.length) {
        if (startClue && countVisibleTowers(path) !== startClue) return;
        if (endClue && countVisibleTowers([...path].reverse()) !== endClue) return;
        result.push([...path]);
        return;
      }

      if (startClue) {
        const visibleTowers = countVisibleTowers(path);
        const remainingCells = candidateList.length - i;
        if (visibleTowers > startClue || visibleTowers + remainingCells < startClue) return;
      }

      if (endClue) {
        const visibleTowers = countVisibleTowers([...path].reverse());
        const remainingCells = candidateList.length - i;
        if (visibleTowers + remainingCells < endClue) return;
      }

      for (const val of candidateList[i]) {
        if (used.has(val)) continue;
        used.add(val);
        path.push(val);
        backtrack(path);
        path.pop();
        used.delete(val);
      }
    }

    backtrack();
    return result;
  };

  let gridPermutations = false;

  // Traverse Grid until solved
  while (numberOfCellsTraversed < maxIterations && numberOfSolvedCells < numberOfCells) {
    gridHasChanged = false;
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        numberOfCellsTraversed++;
        if (cellIsUnsolved(row, col)) {
          // Only execute on first run
          if (numberOfCellsTraversed <= numberOfCells) {
            initialValueDeductionFromClues(row, col);
            solveSingleValueCell(row, col);
          }

          deductFromUniqueness(row, col);
          solveSingleValueCell(row, col);

          if (!gridHasChanged && gridPermutations) {
            // start deducting and pruning the permutations
            solveSingleValueCell(row, col);
          }
        } else {
          continue;
        }
      }
    }
    console.log("-----------------------------");
    console.log(`Grid after numberOfCellsTraversed: ${numberOfCellsTraversed}`);
    console.log(grid);
    console.log("-----------------------------");
    if (!gridHasChanged) {
      if (!gridPermutations) {
        gridPermutations = generateRemainingGridPermutations(grid);
        console.log("------------------- Row Permutations -------------------");
        console.log(gridPermutations.rowPerms);
        console.log("------------------- Col Permutations -------------------");
        console.log(gridPermutations.colPerms);
        gridHasChanged = true;
      } else {
        const changed = crossConsistencyConvergence(grid);
        gridHasChanged ||= changed;
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
//      if i look from this clue, how many towers can i see, how tall are they and can i deduct anything form this, see bottom row clue with clue 2 where i can deduct tower 5s placement
//      if i can see tallest tower, where should the second tallest be placed to satisfy
//      clue condition, see if that deduction is possible

// Go over all cells
//    Place and deduct values
//      count visible tower from a clue if one is given for that cell in either of the 4 directions

//      If we have x cells with the same x values in a row or col e.g. 3 cells with the same
//      3, all 134, we can exclude these 3 values from all other cells in that row or column

// if clue is visible tower count plus 1, place the tallest remaining tower the
// if i place x here can it be solved
// with the towers currently visible from this clue, and the potential towers in the remaining cells can anything be deducted
// count visible towers from this clue

// Count inwards from clues
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
