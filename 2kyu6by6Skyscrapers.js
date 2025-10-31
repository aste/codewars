function solvePuzzle(clues) {
  const context = initializeContext(clues);
  const { grid, gridSize, gridIsSolved } = context;

  const PHASES = [
    PhaseClueDeduction,
    PhaseUniqueness,
    PhaseSingleValue,
    PhasePermutationConvergence,
  ];

  let iterations = 0;
  const maxIterations = gridSize ** 2 * 40;

  while (iterations < maxIterations && !gridIsSolved(grid)) {
    let changedThisSweep = false;

    for (const phase of PHASES) {
      const { changed, solved } = phase(grid, context);
      if (solved) return grid;
      if (changed) changedThisSweep = true;
    }

    if (!changedThisSweep) break;
    iterations++;
  }

  return grid;
}

function initializeContext(clues) {
  const gridSize = clues.length / 4;
  const gridRange = Array.from({ length: gridSize }, (_, i) => i + 1);
  const grid = Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize }, () => new Set(gridRange))
  );
  const context = {
    grid,
    gridSize,
    numberOfCells: gridSize ** 2,
    clues: {
      colStart: clues.slice(0, gridSize),
      colEnd: clues.slice(gridSize * 2, gridSize * 3).reverse(),
      rowStart: clues.slice(gridSize * 3, gridSize * 4).reverse(),
      rowEnd: clues.slice(gridSize, gridSize * 2),
    },
    gridPermutations: null,
    cellIsUnsolved(grid, row, col) {
      return grid[row][col] instanceof Set;
    },
    gridIsSolved(grid) {
      return grid.every((row) => row.every((cell) => typeof cell === "number"));
    },
    countVisibleTowers(sequence) {
      let maxTowerHeight = 0;
      let visibleTowers = 0;
      for (const height of sequence) {
        if (height > maxTowerHeight) {
          visibleTowers++;
          maxTowerHeight = height;
        }
      }
      return visibleTowers;
    },
  };

  return context;
}

// Solver Phases
function PhaseClueDeduction(grid, context) {
  const { gridSize, clues, gridIsSolved, cellIsUnsolved } = context;
  let changed = false;

  const deductValuesFromDistToClue = (row, col, clue, distanceToClue) => {
    if (cellIsUnsolved(grid, row, col) && clue === 1 && distanceToClue === 1) {
      for (const cellValue of grid[row][col]) {
        if (cellValue !== gridSize) {
          grid[row][col].delete(cellValue);
          changed = true;
        }
      }
    } else {
      const upperLimit = gridSize - (clue - distanceToClue);
      if (cellIsUnsolved(grid, row, col)) {
        for (const cellValue of grid[row][col]) {
          if (cellValue > upperLimit) {
            grid[row][col].delete(cellValue);
            changed = true;
          }
        }
      }
    }
  };

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (clues.colStart[col]) deductValuesFromDistToClue(row, col, clues.colStart[col], row + 1);
      if (clues.colEnd[col])
        deductValuesFromDistToClue(row, col, clues.colEnd[col], gridSize - row);
      if (clues.rowStart[row]) deductValuesFromDistToClue(row, col, clues.rowStart[row], col + 1);
      if (clues.rowEnd[row])
        deductValuesFromDistToClue(row, col, clues.rowEnd[row], gridSize - col);
    }
  }

  return { changed, solved: gridIsSolved(grid) };
}

function PhaseUniqueness(grid, context) {
  const { gridSize, gridIsSolved, cellIsUnsolved } = context;
  let changed = false;

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (!cellIsUnsolved(grid, row, col)) continue;

      const cellSet = grid[row][col];
      const sizeBefore = cellSet.size;

      const cumulativeColValues = new Set(); // values in same column (other rows)
      const cumulativeRowValues = new Set(); // values in same row (other cols)

      for (let i = 0; i < gridSize; i++) {
        if (i !== row) {
          const other = grid[i][col];
          if (other instanceof Set) for (const v of other) cumulativeColValues.add(v);
          else cumulativeColValues.add(other);
        }
        if (i !== col) {
          const other = grid[row][i];
          if (other instanceof Set) for (const v of other) cumulativeRowValues.add(v);
          else cumulativeRowValues.add(other);
        }
      }

      const uniquesInCol = [...cellSet].filter((v) => !cumulativeColValues.has(v));
      const uniquesInRow = [...cellSet].filter((v) => !cumulativeRowValues.has(v));

      const pick =
        uniquesInCol.length === 1
          ? uniquesInCol[0]
          : uniquesInRow.length === 1
          ? uniquesInRow[0]
          : null;

      if (pick != null) {
        if (!(cellSet.size === 1 && cellSet.has(pick))) {
          grid[row][col] = new Set([pick]);
          changed = true;
        }
      }
    }
  }
  return { changed, solved: gridIsSolved(grid) };
}

function PhaseSingleValue(grid, context) {
  const { gridSize, gridIsSolved, cellIsUnsolved } = context;
  let changed = false;

  function deductValueFromSolutionSpace(row, col, val) {
    if (cellIsUnsolved(grid, row, col) && grid[row][col].size > 1 && grid[row][col].has(val)) {
      grid[row][col].delete(val);
      changed = true;
    }
  }

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (cellIsUnsolved(grid, row, col) && grid[row][col].size === 1) {
        const cellValue = grid[row][col].values().next().value;
        grid[row][col] = cellValue;
        changed = true;

        for (let i = 0; i < gridSize; i++) {
          deductValueFromSolutionSpace(i, col, cellValue);
          deductValueFromSolutionSpace(row, i, cellValue);
        }
      }
    }
  }

  return { changed, solved: gridIsSolved(grid) };
}

function deductCandidateFromPermutations(grid, gridPermutations, gridSize) {
  const { rowPerms, colPerms } = gridPermutations;
  let changed = false;

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
        changed = true;
      }
    }
  }

  return changed;
}

function PhasePermutationConvergence(grid, context) {
  const { gridSize, gridIsSolved } = context;
  let changedOverall = false;
  let changed = true;

  while (changed) {
    changed = false;

    const { rowPerms, colPerms } = generateRemainingGridPermutations(grid, context);
    context.gridPermutations = { rowPerms, colPerms };

    const changedThisRound = deductCandidateFromPermutations(
      grid,
      { rowPerms, colPerms },
      gridSize
    );

    if (changedThisRound) {
      changedOverall = true;
      changed = true;
    }
  }

  return { changed: changedOverall, solved: gridIsSolved(grid) };
}

function generateRemainingGridPermutations(grid, context) {
  const { gridSize, clues, countVisibleTowers } = context;
  const rowPerms = [];
  const colPerms = [];

  for (let row = 0; row < gridSize; row++) {
    const candidateList = grid[row].map((cell) => (typeof cell === "number" ? [cell] : [...cell]));

    rowPerms[row] = generatePermutationsFromCandidates(
      candidateList,
      clues.rowStart[row],
      clues.rowEnd[row],
      countVisibleTowers
    );
  }

  for (let col = 0; col < gridSize; col++) {
    const candidateList = [];
    for (let row = 0; row < gridSize; row++) {
      const cell = grid[row][col];
      candidateList.push(typeof cell === "number" ? [cell] : [...cell]);
    }

    colPerms[col] = generatePermutationsFromCandidates(
      candidateList,
      clues.colStart[col],
      clues.colEnd[col],
      countVisibleTowers
    );
  }

  return { rowPerms, colPerms };
}

function generatePermutationsFromCandidates(
  candidateList,
  startClue = false,
  endClue = false,
  countVisibleTowers
) {
  const result = [];
  const used = new Set();

  function backtrack(cellSequence = []) {
    const i = cellSequence.length;
    if (i === candidateList.length) {
      if (startClue && countVisibleTowers(cellSequence) !== startClue) return;
      if (endClue && countVisibleTowers([...cellSequence].reverse()) !== endClue) return;
      result.push([...cellSequence]);
      return;
    }

    if (startClue) {
      const visibleTowers = countVisibleTowers(cellSequence);
      const remainingCells = candidateList.length - i;
      if (visibleTowers > startClue || visibleTowers + remainingCells < startClue) return;
    }

    if (endClue) {
      const visibleTowers = countVisibleTowers([...cellSequence].reverse());
      const remainingCells = candidateList.length - i;
      if (visibleTowers + remainingCells < endClue) return;
    }

    for (const val of candidateList[i]) {
      if (used.has(val)) continue;
      used.add(val);
      cellSequence.push(val);
      backtrack(cellSequence);
      cellSequence.pop();
      used.delete(val);
    }
  }

  backtrack();
  return result;
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

console.log(expected3);
console.log(solvePuzzle(clue3));
// console.log("");

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
