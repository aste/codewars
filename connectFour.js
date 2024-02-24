function whoIsWinner(piecesPositionList) {
  let winner = "Draw";
  let foundWinner = false;
  const connectFourBoard = { A: [], B: [], C: [], D: [], E: [], F: [], G: [] };

  function findFourInARow(arr) {
    for (let i = 0; i <= arr.length - 4; i++) {
      if (
        arr[i] &&
        arr[i] === arr[i + 1] &&
        arr[i + 1] === arr[i + 2] &&
        arr[i + 2] === arr[i + 3]
      ) {
        winner = arr[i];
        foundWinner = true;
      }
    }
  }

  function checkForRowWin(currentBoard) {
    for (let row = 0; row < 6; row++) {
      let currentRow = [];
      for (const col of currentBoard) {
        currentRow.push(col[row] || null);
      }
      if (currentRow.length >= 4) findFourInARow(currentRow);
      if (foundWinner) break;
    }
  }

  // Place each piece one-by-one according to piecesPositionList
  for (let move = 0; move < piecesPositionList.length; move++) {
    const currentMove = piecesPositionList[move].split("_");

    connectFourBoard[currentMove[0]].push(currentMove[1]);

    if (move < 6) continue;

    const currentBoard = Object.values(connectFourBoard);
    const diagonalUpBoard = currentBoard.map((col) => [...col]);
    const diagonalDownBoard = currentBoard.map((col) => [...col]);

    // check for win in vertical direction
    for (let col = 0; col < currentBoard.length; col++) {
      const verticalColumn = currentBoard[col];

      if (verticalColumn.length >= 4) {
        findFourInARow(verticalColumn);
      }
      if (foundWinner) break;
    }

    if (foundWinner) break;

    // check for win in horizontal direction
    checkForRowWin(currentBoard);

    if (foundWinner) break;

    // Build diagonal boards
    for (let i = 0; i < currentBoard.length; i++) {
      let numberOfNullsToShift = i;

      for (let j = 0; j < numberOfNullsToShift; j++) {
        diagonalUpBoard[currentBoard.length - 1 - i].unshift(null);
        diagonalDownBoard[i].unshift(null);
      }

      diagonalUpBoard[i].splice(7);
      diagonalDownBoard[i].splice(7);
    }

    // check for win in diagonal up direction
    checkForRowWin(diagonalUpBoard);
    if (foundWinner) break;

    // check for win in diagonal up direction
    checkForRowWin(diagonalDownBoard);
    if (foundWinner) break;
  }

  return winner;
}
