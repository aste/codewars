function spiralize(n) {
  const grid = Array.from({ length: n }, () => Array.from({ length: n }, () => 0));
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let timeToQuit = false;
  let curField = [0, 0];
  let curDir = 0;
  let nextDir = 1;

  const checkField = ([dx, dy], factor, value) => {
    const x = curField[0] + dx * factor;
    const y = curField[1] + dy * factor;
    if (grid[x] !== undefined) {
      return grid[x][y] === value;
    } else {
      return grid[x] === value;
    }
  };

  const moveCurField = ([dx, dy]) => {
    curField[0] += dx;
    curField[1] += dy;
  };

  while (true) {
    grid[curField[0]][curField[1]] = 1;

    if (timeToQuit) {
      break;
    }

    if (checkField(directions[curDir], 2, 1) || checkField(directions[curDir], 1, undefined)) {
      if (checkField(directions[nextDir], 2, 1)) {
        break;
      } else {
        if (checkField(directions[nextDir], 3, 1)) {
          timeToQuit = true;
        }
        curDir = (curDir + 1) % 4;
        nextDir = (nextDir + 1) % 4;
      }
    }

    moveCurField(directions[curDir]);
  }

  return grid;
}
