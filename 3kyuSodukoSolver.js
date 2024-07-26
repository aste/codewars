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