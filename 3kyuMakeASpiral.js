function spiralize(n) {
  const grid = Array.from({ length: n }, () => Array.from({ length: n }, () => 0));
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let curField = [0, 0];
  let curDir = 0;
  let nextDir = 1;
  let straightSteps = 0;

  let count = 0;

  const checkField = ([dx, dy], factor, value) => {
    const x = curField[0] + dx * factor;
    const y = curField[1] + dy * factor;
    if (grid[x] !== undefined) {
      return grid[x][y] === value;
    } else {
      return grid[x] === value;
    }
    // console.log(`x: ${x}`);
    // console.log(`y: ${y}`);
    // if (grid[x] === undefined || grid[x][y] === undefined) {
    //   return false;
    // } else {
    // }
    // console.log(`grid[x][y]: ${grid[x][y]}`);
  };

  const moveCurField = ([dx, dy]) => {
    curField[0] += dx;
    curField[1] += dy;
  };

  while (count <= n * n) {
    grid[curField[0]][curField[1]] = 1;
    console.log(`---------------curField: ${curField}---------------`);
    console.log(`curField[0]: ${curField[0]}`);
    console.log(`curField[1]: ${curField[1]}`);
    console.log(`directions[curDir]: ${directions[curDir]}`);
    console.log(`checkField(directions[curDir], 2, 1): ${checkField(directions[curDir], 2, 1)}`);
    console.log(
      `checkField(directions[curDir], 1, undefined): ${checkField(
        directions[curDir],
        1,
        undefined
      )}`
    );
    console.log(`checkField(directions[nextDir], 3, 1): ${checkField(directions[nextDir], 3, 1)}`);
    console.log(`checkField(directions[nextDir], 3, 1): ${checkField(directions[nextDir], 3, 1)}`);

    if (checkField(directions[curDir], 2, 1) || checkField(directions[curDir], 1, undefined)) {
      console.log(`************* conditional 1 triggered ***************`);
      console.log(`checkField(directions[curDir], 2, 1): ${checkField(directions[curDir], 2, 1)}`);
      console.log(
        `checkField(directions[curDir], 1, undefined): ${checkField(
          directions[curDir],
          1,
          undefined
        )}`
      );
      if (checkField(directions[nextDir], 3, 1) || checkField(directions[nextDir], 2, 1)) {
        break;
      } else {
        curDir = (curDir + 1) % 4;

        nextDir = (nextDir + 1) % 4;
        straightSteps = 0;
      }
    }
    console.log(`[curDir]: ${[curDir]}`);
    console.log(`directions[curDir]: ${directions[curDir]}`);

    console.log(`curDir: ${curDir}`);
    console.log(`nextDir: ${nextDir}`);
    console.log(`curField: ${curField}`);
    // console.log(`grid: ${grid[5][5]}`);
    console.log(`directions[curDir]: ${directions[curDir]}`);
    console.log(`directions[nextDir]: ${directions[nextDir]}`);

    console.log(`grid:`);
    console.log(grid);
    console.log(`curField[0]: ${curField[0]}`);
    console.log(`curField[1]: ${curField[1]}`);

    moveCurField(directions[curDir]);
    count++;
  }

  console.log(grid);
  return grid;
}

console.log(spiralize(6));
// console.log(00000
//   ....0
//   000.0
//   0...0
//   00000
//   )
