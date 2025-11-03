// Puzzle Solver & Context Generation
function solvePuzzle(clues) {
  const context = initializeContext(clues);
  const { grid, gridSize, gridIsSolved } = context;

  runDeterministicPhases(grid, context);

  if (!gridIsSolved(grid)) {
    const searchResult = permutationSearch(grid, context);
    if (searchResult) return searchResult;
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
    maxDeterministicIterations: 20,
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

// Deterministic Deduction Phases
const DETERMINISTIC_DEDUCTION_PHASES = [
  PhaseClueDeduction,
  PhaseUniqueness,
  PhaseSingleValue,
  PhasePermutationConvergence,
];

function runDeterministicPhases(grid, context) {
  const { gridSize, gridIsSolved } = context;
  let iterations = 0;
  const maxIterations = gridSize ** 2 * context.maxDeterministicIterations;

  while (iterations < maxIterations && !gridIsSolved(grid)) {
    let changedThisSweep = false;

    for (const phase of DETERMINISTIC_DEDUCTION_PHASES) {
      const { changed, solved } = phase(grid, context);
      if (solved) return true;
      if (changed) changedThisSweep = true;
    }

    if (!changedThisSweep) break;
    iterations++;
  }

  return gridIsSolved(grid);
}

// Use edge clues to eliminate impossible values based on distance from the clue
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
      const upperCellLimit = gridSize - (clue - distanceToClue);

      if (!cellIsUnsolved(grid, row, col)) return;

      for (const cellValue of [...grid[row][col]]) {
        if (cellValue > upperCellLimit) {
          grid[row][col].delete(cellValue);
          changed = true;
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

// Place values that appear only once in a row or column into their cell
function PhaseUniqueness(grid, context) {
  const { gridSize, gridIsSolved, cellIsUnsolved } = context;
  let changed = false;

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (!cellIsUnsolved(grid, row, col)) continue;

      const cellSet = grid[row][col];
      const sizeBefore = cellSet.size;

      const cumulativeColValues = new Set();
      const cumulativeRowValues = new Set();

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

// Collapse single-value cells and remove their value from the their row and column
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

// Generate all valid row/column permutations and remove candidates that never appear
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

// Backtracking Search
// Try permutations of the most constrained row/column, re-run deductions, backtrack if needed.
function deepCloneGrid(grid) {
  return grid.map((row) => row.map((cell) => (cell instanceof Set ? new Set(cell) : cell)));
}

function permutationSearch(grid, context) {
  const { gridSize, gridIsSolved } = context;

  const { rowPerms, colPerms } = generateRemainingGridPermutations(grid, context);
  context.gridPermutations = { rowPerms, colPerms };

  // Choose the most constrained row/col with fewest permutations
  let bestIsRow = null;
  let bestIndex = -1;
  let bestCount = Infinity;

  for (let r = 0; r < gridSize; r++) {
    const len = rowPerms[r].length;
    if (len > 1 && len < bestCount) {
      bestCount = len;
      bestIsRow = true;
      bestIndex = r;
    }
  }

  for (let c = 0; c < gridSize; c++) {
    const len = colPerms[c].length;
    if (len > 1 && len < bestCount) {
      bestCount = len;
      bestIsRow = false;
      bestIndex = c;
    }
  }

  // Try all permutations for the chosen row/column
  if (bestIsRow) {
    const r = bestIndex;
    for (const perm of rowPerms[r]) {
      const newGrid = deepCloneGrid(grid);
      let consistent = true;

      for (let c = 0; c < gridSize; c++) {
        const val = perm[c];
        const cell = newGrid[r][c];

        if (typeof cell === "number") {
          if (cell !== val) {
            consistent = false;
            break;
          }
        } else {
          if (!cell.has(val)) {
            consistent = false;
            break;
          }
          newGrid[r][c] = val;
        }
      }

      if (!consistent) continue;

      const solvedByDeductions = runDeterministicPhases(newGrid, context);
      if (solvedByDeductions) {
        return newGrid;
      }

      const result = permutationSearch(newGrid, context);
      if (result) return result;
    }
  } else {
    const c = bestIndex;
    for (const perm of colPerms[c]) {
      const newGrid = deepCloneGrid(grid);
      let consistent = true;

      for (let r = 0; r < gridSize; r++) {
        const val = perm[r];
        const cell = newGrid[r][c];

        if (typeof cell === "number") {
          if (cell !== val) {
            consistent = false;
            break;
          }
        } else {
          if (!cell.has(val)) {
            consistent = false;
            break;
          }
          newGrid[r][c] = val;
        }
      }

      if (!consistent) continue;

      const solvedByDeductions = runDeterministicPhases(newGrid, context);
      if (solvedByDeductions) {
        return newGrid;
      }

      const result = permutationSearch(newGrid, context);
      if (result) return result;
    }
  }

  return null;
}

const sevenBySevenMedVedClue = [
  3, 3, 2, 1, 2, 2, 3, 4, 3, 2, 4, 1, 4, 2, 2, 4, 1, 4, 5, 3, 2, 3, 1, 4, 2, 5, 2, 3,
];
const sevenBySevenMedVedResult = [
  [2, 1, 4, 7, 6, 5, 3],
  [6, 4, 7, 3, 5, 1, 2],
  [1, 2, 3, 6, 4, 7, 5],
  [5, 7, 6, 2, 3, 4, 1],
  [4, 3, 5, 1, 2, 6, 7],
  [7, 6, 2, 5, 1, 3, 4],
  [3, 5, 1, 4, 7, 2, 6],
];

console.log("sevenBySevenMedVedClue");
console.log(sevenBySevenMedVedClue);
console.log("Solver Solution for sevenBySevenMedVedClue");
console.log(solvePuzzle(sevenBySevenMedVedClue));
console.log("The Correct Testcase Solution:");
console.log([
  [2, 1, 4, 7, 6, 5, 3],
  [6, 4, 7, 3, 5, 1, 2],
  [1, 2, 3, 6, 4, 7, 5],
  [5, 7, 6, 2, 3, 4, 1],
  [4, 3, 5, 1, 2, 6, 7],
  [7, 6, 2, 5, 1, 3, 4],
  [3, 5, 1, 4, 7, 2, 6],
]);

const theOutputFromMySolver = [
  [
    new Set([1, 2]),
    new Set([1, 3]),
    new Set([1, 2, 3, 4, 5]),
    7,
    6,
    new Set([4, 5]),
    new Set([3, 4]),
  ],
  [6, 4, 7, new Set([1, 2, 3, 5]), new Set([1, 2, 5]), new Set([1, 2]), new Set([2, 3])],
  [new Set([1, 2]), new Set([2, 3]), new Set([3, 4]), 6, new Set([1, 2, 3, 4]), 7, 5],
  [5, 7, 6, new Set([1, 2, 3, 4]), new Set([1, 2, 3, 4]), new Set([1, 2, 4]), new Set([1, 2, 3])],
  [
    new Set([3, 4]),
    new Set([1, 2, 3]),
    new Set([3, 5]),
    new Set([1, 2, 3, 4, 5]),
    new Set([1, 2, 3, 4, 5]),
    6,
    7,
  ],
  [
    7,
    6,
    new Set([2, 3, 4]),
    new Set([1, 2, 3, 4, 5]),
    new Set([1, 2, 3, 4, 5]),
    new Set([3, 5]),
    new Set([1, 2, 3, 4]),
  ],
  [new Set([3, 4]), 5, new Set([1, 2]), new Set([1, 2, 3, 4]), 7, new Set([1, 2, 3]), 6],
];

const theOutputFromMySolverInArrayFormat = [
  [[1, 2], [1, 3], [1, 2, 3, 4, 5], 7, 6, [4, 5], [3, 4]],
  [6, 4, 7, [1, 2, 3, 5], [1, 2, 5], [1, 2], [2, 3]],
  [[1, 2], [2, 3], [3, 4], 6, [1, 2, 3, 4], 7, 5],
  [5, 7, 6, [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 4], [1, 2, 3]],
  [[3, 4], [1, 2, 3], [3, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], 6, 7],
  [7, 6, [2, 3, 4], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [3, 5], [1, 2, 3, 4]],
  [[3, 4], 5, [1, 2], [1, 2, 3, 4], 7, [1, 2, 3], 6],
];

const theActualResultFromTheTest = [
  [2, 1, 4, 7, 6, 5, 3],
  [6, 4, 7, 3, 5, 1, 2],
  [1, 2, 3, 6, 4, 7, 5],
  [5, 7, 6, 2, 3, 4, 1],
  [4, 3, 5, 1, 2, 6, 7],
  [7, 6, 2, 5, 1, 3, 4],
  [3, 5, 1, 4, 7, 2, 6],
];
