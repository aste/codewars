function whoIsWinner(piecesPositionList) {
  let winner = "Draw";
  const connectFourBoard = { A: [], B: [], C: [], D: [], E: [], F: [], G: [] };

  for (let i = 0; i < piecesPositionList.length; i++) {
    const currentMove = piecesPositionList[i].split("_");
    connectFourBoard[currentMove[0]].push(currentMove[1]);

    if (i < 6) continue;

    const currentBoard = Object.values(connectFourBoard);

    for (let i = 0; i < currentBoard.length; i++) {
      const curCol = currentBoard[i];

      if (curCol.length < 4) continue;

      for (let i = 0; i < curCol.length - 3; i++) {
        if (
          curCol[i] === curCol[i + 1] &&
          curCol[i + 1] === curCol[i + 2] &&
          curCol[i + 2] === curCol[i + 3]
        ) {
          winner = curCol[i];
          console.log(`Winner is ${winner} congratulation`);
          break;
        }
      }
    }
  }

  console.log(winner);

  return winner;
}

//   Connect Four
//   Take a look at wiki description of Connect Four game:

//   Wiki Connect Four

//   The grid is 6 row by 7 columns, those being named from A to G.

//   You will receive a list of strings showing the order of the pieces which dropped in columns:

piecesPositionList = [
  "A_Red",
  "B_Yellow",
  "A_Red",
  "B_Yellow",
  "A_Red",
  "B_Yellow",
  "G_Red",
  "B_Yellow",
];

whoIsWinner(piecesPositionList);
//   The list may contain up to 42 moves and shows the order the players are playing.

//   The first player who connects four items of the same color is the winner.

//   You should return "Yellow", "Red" or "Draw" accordingly.
