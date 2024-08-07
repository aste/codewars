function validateBattlefield(board) {
  let shipContact = false;
  let currentShipCoordinates = [];

  const requiredShips = {
    4: 1,
    3: 2,
    2: 3,
    1: 4,
  };
  const actualShips = {
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  function compareShips(shipObj1, shipObj2) {
    for (let key in shipObj1) {
      if (shipObj1[key] !== shipObj2[key]) {
        return false;
      }
    }
    return true;
  }

  function updateActualShip(xCoord, yCoord) {
    let shipLength = 1;
    board[xCoord][yCoord] = 2;
    currentShipCoordinates.push([xCoord, yCoord]);

    let xDirection = board[xCoord + 1][yCoord] === 1;
    let yDirection = board[xCoord][yCoord + 1] === 1;

    if (xDirection && yDirection) {
      shipContact = true;
      return;
    } else if (xDirection || yDirection) {
      let xDirStep = Number(xDirection);
      let yDirStep = Number(yDirection);
      let xDirIncrement = Number(xDirection);
      let yDirIncrement = Number(yDirection);

      while (board[xCoord + xDirStep][yCoord + yDirStep] === 1) {
        currentShipCoordinates.push([xCoord + xDirStep, yCoord + yDirStep]);
        board[xCoord + xDirStep][yCoord + yDirStep] = 2;
        xDirStep += xDirIncrement;
        yDirStep += yDirIncrement;
        shipLength++;
      }
    }

    actualShips[shipLength] += 1;
  }

  function checkContact(shipCoordArr) {
    shipCoordArr.forEach((shipCoord) => {
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          let newX = shipCoord[0] + x;
          let newY = shipCoord[1] + y;
          if (
            newX >= 0 &&
            newY >= 0 &&
            newX < board.length &&
            newY < board[0].length &&
            board[newX][newY] === 1
          ) {
            shipContact = true;
            if (shipContact) break;
          }
        }
        if (shipContact) break;
      }
    });
    currentShipCoordinates = [];
  }

  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[x].length; y++) {
      if (board[x][y] === 1) {
        updateActualShip(x, y);
        checkContact(currentShipCoordinates);
      }
      if (shipContact) break;
    }
    if (shipContact) break;
  }

  return compareShips(requiredShips, actualShips) && !shipContact;
}

// Description

// https://www.codewars.com/kata/52bb6539a4cf1b12d90005b7/train/javascript

// Write a method that takes a field for well-known board game "Battleship" as an argument and returns true if it has a valid disposition of ships, false otherwise. Argument is guaranteed to be 10*10 two-dimension array. Elements in the array are numbers, 0 if the cell is free and 1 if occupied by ship.

// Battleship (also Battleships or Sea Battle) is a guessing game for two players. Each player has a 10x10 grid containing several "ships" and objective is to destroy enemy's forces by targeting individual cells on his field. The ship occupies one or more cells in the grid. Size and number of ships may differ from version to version. In this kata we will use Soviet/Russian version of the game.

// Before the game begins, players set up the board and place the ships accordingly to the following rules:
// There must be single battleship (size of 4 cells), 2 cruisers (size 3), 3 destroyers (size 2) and 4 submarines (size 1). Any additional ships are not allowed, as well as missing ships.
// Each ship must be a straight line, except for submarines, which are just single cell.

// The ship cannot overlap or be in contact with any other ship, neither by edge nor by corner.

// This is all you need to solve this kata. If you're interested in more information about the game, visit this link.
