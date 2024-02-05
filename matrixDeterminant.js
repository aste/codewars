function determinant(m) {
  // return the determinant of the n x n matrix passed in
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

console.log("1, Should return 1");
console.log(determinant([[1]]), 1);
console.log("");

console.log("14, Should return 4*8 - 3*6, i.e. 14");
console.log(determinant(m1));
console.log("");

console.log("10, Should return the determinant of [[2,4,2],[3,1,1],[1,2,0]], i.e. 10");
console.log(determinant(m5));
console.log("");
