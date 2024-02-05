function determinant(m) {
  // return the determinant of the n x n matrix passed in
  if (m.length < 2) {
    return m[0][0];
  } else if (m.length === 2) {
    return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  } else {
    let determinantResult;

    for (let i = 0; i < m.length; i++) {
      const sign = i % 2 ? -1 : 1;
      const reducedMatrix = m.slice(1).map((row) => row.filter((_, rowIndex) => rowIndex !== i));
      console.log(reducedMatrix);
      determinantResult = sign * m[0][i] * determinant(reducedMatrix);
    }

    return determinantResult;
  }
}

let m1 = [
  [4, 6],
  [3, 8],
];
let m5 = [
  [2, 4, 2],
  [3, 1, 1],
  [1, 2, 0],
];
let m8 = [
  [3, -9, -4, -7, 9],
  [7, 0, 5, 6, 5],
  [-1, -4, -9, -5, 1],
  [1, 2, -4, 6, 6],
  [-5, 0, 5, -9, -7],
];

console.log("1, Should return 1");
console.log(determinant([[1]]), 1);
console.log("");

console.log("14, Should return 4*8 - 3*6, i.e. 14");
console.log(determinant(m1));
console.log("");

console.log("10, Should return the determinant of [[2,4,2],[3,1,1],[1,2,0]], i.e. 10");
console.log(determinant(m5));
console.log("");

console.log("10, Should return the determinant of [[2,4,2],[3,1,1],[1,2,0]], i.e. 10");
console.log(determinant(m8));
console.log("");
