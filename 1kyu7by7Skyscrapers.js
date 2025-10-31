function solvePuzzle(clues) {
  console.log(clues);
  const context = initializeContext(clues);
  const { grid, gridSize, gridIsSolved } = context;

  const PHASES = [
    PhaseClueDeduction,
    PhaseUniqueness,
    PhaseSingleValue,
    PhasePermutationConvergence,
    PhasePermutationForcing,
    PhaseSingleValue,
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

function PhasePermutationForcing(grid, context) {
  const { gridSize, gridIsSolved } = context;
  let changed = false;

  const { rowPerms, colPerms } =
    context.gridPermutations ?? generateRemainingGridPermutations(grid, context);

  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (typeof grid[r][c] === "number") continue;

      const rowAgree = agreeAtPosition(rowPerms[r], c);

      const colAgree = agreeAtPosition(colPerms[c], r);

      const forced =
        rowAgree != null && colAgree != null
          ? rowAgree === colAgree
            ? rowAgree
            : null
          : rowAgree ?? colAgree;

      if (forced != null) {
        if (!(grid[r][c].size === 1 && grid[r][c].has(forced))) {
          grid[r][c] = new Set([forced]);
          changed = true;
        }
      }
    }
  }

  for (let r = 0; r < gridSize; r++) {
    const placesForVal = positionsByValue(rowPerms[r], gridSize);
    for (const [v, cols] of placesForVal) {
      if (cols.size === 1) {
        const c = cols.values().next().value;
        if (typeof grid[r][c] !== "number" || grid[r][c] !== v) {
          grid[r][c] = new Set([v]);
          changed = true;
        }
      }
    }
  }

  for (let c = 0; c < gridSize; c++) {
    const placesForVal = positionsByValue(colPerms[c], gridSize);
    for (const [v, rows] of placesForVal) {
      if (rows.size === 1) {
        const r = rows.values().next().value;
        if (typeof grid[r][c] !== "number" || grid[r][c] !== v) {
          grid[r][c] = new Set([v]);
          changed = true;
        }
      }
    }
  }

  function agreeAtPosition(perms, idx) {
    if (!perms || perms.length === 0) return null;
    let v = perms[0][idx];
    for (let i = 1; i < perms.length; i++) if (perms[i][idx] !== v) return null;
    return v;
  }

  function positionsByValue(perms, size) {
    const map = new Map(); // v -> Set(pos)
    if (!perms) return map;
    for (let pos = 0; pos < size; pos++) {
      const seen = new Map(); // value -> count at this pos (avoid duplicates within same perm set)
      for (const p of perms) {
        const v = p[pos];
        if (!seen.has(v)) {
          seen.set(v, 1);
          if (!map.has(v)) map.set(v, new Set());
          map.get(v).add(pos);
        }
      }
    }
    return map;
  }

  return { changed, solved: gridIsSolved(grid) };
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

console.log(sevenBySevenMedVedClue);
console.log(solvePuzzle(sevenBySevenMedVedResult));


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
