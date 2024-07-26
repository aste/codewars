function sudoku(puzzle) {
  const fullBoard = puzzle;

  let step = 0;
  let allNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function getCurrentColumn(xCoord) {
    const column = [];
    fullBoard.forEach((row) => column.push(row[xCoord]));
    return column;
  }

  function getCurrentSubGrid(row, col) {
    const subGrid = [];
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        subGrid.push(fullBoard[startRow + r][startCol + c]);
      }
    }

    return subGrid;
  }

  function findFittingNumbers(row, column, subGrid) {
    let combinedSet = new Set(row.concat(column, subGrid));
    return allNumbers.filter((num) => !combinedSet.has(num));
  }

  while (fullBoard.flat().includes(0) && step < 10000) {
    step++;
    for (let row = 0; row < fullBoard.length; row++) {
      let currentRow = fullBoard[row];
      for (let col = 0; col < fullBoard[row].length; col++) {
        if ((fullBoard[row][col] === 0)) {
          let currentColumn = getCurrentColumn(col);
          let currentSubGrid = getCurrentSubGrid(row, col);
          let fittingNumbers = findFittingNumbers(currentRow, currentColumn, currentSubGrid);
          if (fittingNumbers.length === 1) {
            fullBoard[row][col] = fittingNumbers[0];
          }
        }
      }
    }
  }
  return fullBoard;
}

// Write a function that will solve a 9x9 Sudoku puzzle. The function will take one argument consisting of the 2D puzzle array, with the value 0 representing an unknown square.

// The Sudokus tested against your function will be "easy" (i.e. determinable; there will be no need to assume and test possibilities on unknowns) and can be solved with a brute-force approach.

// For Sudoku rules, see the Wikipedia article.

var puzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];


  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
]);

  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
]);
