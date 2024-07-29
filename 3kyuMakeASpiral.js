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

  const checkField = ([x, y], [dx, dy], factor) => (grid[x + dx * factor, y + dy * factor]) === 1
  const moveField = ([x, y], [dx, dy]) => [x + dx, y + dy];

  let count = 1;

  while (count <= n * n) {

    


    const [x, y] = curField;
    grid[x][y] = 1;

    let nextField = moveField(curField, directions[curDir]);
    let [nx, ny] = nextField;

    // Check if the next cell is out of bounds or already filled
    if (nx < 0 || ny < 0 || nx >= n || ny >= n || grid[nx][ny] === 1) {
      curDir = (curDir + 1) % 4;
      nextField = moveField(curField, directions[curDir]);
    }

    curField = nextField;
    count++;
  }

  return grid;
}

console.log(spiralize(6));

// DESCRIPTION:
// Your task, is to create a NxN spiral with a given size.

// For example, spiral with size 5 should look like this:

// 00000
// ....0
// 000.0
// 0...0
// 00000
// and with the size 10:

// 0000000000
// .........0
// 00000000.0
// 0......0.0
// 0.0000.0.0
// 0.0..0.0.0
// 0.0....0.0
// 0.000000.0
// 0........0
// 0000000000
// Return value should contain array of arrays, of 0 and 1, with the first row being composed of 1s. For example for given size 5 result should be:

// [[1,1,1,1,1],[0,0,0,0,1],[1,1,1,0,1],[1,0,0,0,1],[1,1,1,1,1]]
// Because of the edge-cases for tiny spirals, the size will be at least 5.

// General rule-of-a-thumb is, that the snake made with '1' cannot touch to itself.
