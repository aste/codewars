function whoIsWinner(piecesPositionList) {
  let winner = "Draw";
  let foundWinner = false;
  const connectFourBoard = { A: [], B: [], C: [], D: [], E: [], F: [], G: [] };

  function checkFourRepWin(arr) {
    for (let i = 0; i <= arr.length - 4; i++) {
      if (
        arr[i] &&
        arr[i] === arr[i + 1] &&
        arr[i + 1] === arr[i + 2] &&
        arr[i + 2] === arr[i + 3]
      ) {
        winner = arr[i];
        foundWinner = true;
        break;
      }
    }
  }

  function checkFourRowWin(currentBoard) {
    for (let row = 0; row < 6; row++) {
      let currentRow = [];
      for (const col of currentBoard) {
        currentRow.push(col[row] || null);
      }
      if (currentRow.length >= 4) checkFourRepWin(currentRow);
      if (foundWinner) break;
    }
  }

  // Place each piece one-by-one according to piecesPositionList
  for (let move = 0; move < piecesPositionList.length; move++) {
    const currentMove = piecesPositionList[move].split("_");

    connectFourBoard[currentMove[0]].push(currentMove[1]);

    if (move < 5) continue;

    // Build Current Board
    const currentBoard = Object.values(connectFourBoard);

    // check for win in vertical direction
    for (let col = 0; col < currentBoard.length; col++) {
      const verticalColumn = currentBoard[col];
      if (verticalColumn.length >= 4) checkFourRepWin(verticalColumn);
    }

    if (foundWinner) break;

    // check for win in horizontal direction
    checkFourRowWin(currentBoard);
    if (foundWinner) break;

    // Build Diagonal Boards
    const diagonalUpBoard = currentBoard.map((col) => [...col]);
    const diagonalDownBoard = currentBoard.map((col) => [...col]);

    for (let i = 0; i < currentBoard.length; i++) {
      let numberToShiftColumn = i;

      for (let j = 0; j < numberToShiftColumn; j++) {
        diagonalUpBoard[currentBoard.length - 1 - i].unshift(null);
        diagonalDownBoard[i].unshift(null);
      }
    }

    // check for win in diagonal up direction
    checkFourRowWin(diagonalUpBoard);
    if (foundWinner) break;

    // check for win in diagonal up direction
    checkFourRowWin(diagonalDownBoard);
    if (foundWinner) break;
  }

  return winner;
}
