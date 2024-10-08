function solvePuzzle(clues) {
  if (clues.length % 4 !== 0) return;
  const gridSize = clues.length / 4;
  const cellValue = () => new Set(Array.from({ length: gridSize }, (_, i) => i + 1));

  
  const grid = Array(gridSize)
  .fill(null)
  .map(() => Array(gridSize).fill(null).map(cellValue));
  
  // Fill grid/fields with values
  function fillGrid(rowCoord, colCoord) {
    
  }

  // Map grid to clues (and maybe map clues to grid)

  // Check for a total in both ends of the clue array that is "Size" + 1 in total, locks a max 

  // Check for max/gridSize value and minimum value/1 in clue stats

  // Fill the 
  
  // Check if grid includes size - 1 of any number and place that number deterministically

  // Nested Loop


  
  // const rowClues = {};
  // const columnClues = {};
  // //   const clues1 = [0, 0, 0, 2, 2, 0, 0, 0, 0, 6, 3, 0, 0, 4, 0, 0, 0, 0, 4, 4, 0, 3, 0, 0];
  // //   const cluMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

  // //   const testClues1 = [
  // //     [0, 0, 0, 2, 2, 0],
  // //     [0, 0, 0, 6, 3, 0],
  // //     [0, 0, 0, 0, 4, 0],
  // //     [0, 0, 3, 0, 4, 4],
  // //   ];
  // console.log(`clues: ${clues}`);
  // function populateClues(cluesArr) {
  //   const quarterLen = cluesArr.length / 4;
  //   const colStartClueValues = cluesArr.slice(0, quarterLen);
  //   const colEndClueValues = cluesArr.slice(quarterLen * 2, quarterLen * 3).reverse();
  //   const rowStartClueValues = cluesArr.slice(quarterLen * 3, quarterLen * 4).reverse();
  //   const rowEndClueValues = cluesArr.slice(quarterLen, quarterLen * 2);

  //   for (let i = 0; i < quarterLen; i++) {
  //     columnClues[i] = [colStartClueValues[i], colEndClueValues[i]];
  //     rowClues[i] = [rowStartClueValues[i], rowEndClueValues[i]];
  //   }

  //   // console.log(`colStartClueValues: ${colStartClueValues}`);
  //   // console.log(`colEndClueValues: ${colEndClueValues}`);
  //   // console.log(`rowStartClueValues: ${rowStartClueValues}`);
  //   // console.log(`rowEndClueValues: ${rowEndClueValues}`);
  // }

  // populateClues(clues);
  // console.log(`rowClues:`);
  // console.log(rowClues);
  // console.log(`columnClues:`);
  // console.log(columnClues);
  // console.log(``);

  //   const testBlankWithClues1 = [
  //     [0, 0, 0, 2, 2, 0]
  //   0 [0, 0, 0, 5, 0, 0], 0
  //   0 [0, 0, 0, 0, 0, 0], 0
  //   3 [0, 0, 0, 0, 0, 0], 0
  //   0 [6, 5, 4, 3, 2, 1], 6
  //   4 [0, 0, 0, 6, 0, 0], 3
  //   4 [0, 0, 0, 0, 0, 0], 0
  //     [0, 0, 0, 0, 4, 0]
  //   ];

  //   const testResult1 = [
  //    [5, 6, 1, 4, 3, 2],
  //    [4, 1, 3, 2, 6, 5],
  //    [2, 3, 6, 1, 5, 4],
  //    [6, 5, 4, 3, 2, 1],
  //    [1, 2, 5, 6, 4, 3],
  //    [3, 4, 2, 5, 1, 6],
  //   ];

  //   const testClues2 = [
  //     [3, 2, 2, 3, 2, 1],
  //     [1, 2, 3, 3, 2, 2],
  //     [5, 1, 2, 2, 4, 3],
  //     [3, 2, 1, 2, 2, 4],
  //   ];

  //   const testBlankWithClues2 = [
  //     [3, 2, 2, 3, 2, 1]
  //   4 [0, 0, 0, 0, 0, 0], 1
  //   2 [0, 0, 0, 0, 0, 0], 2
  //   2 [0, 0, 0, 0, 0, 0], 3
  //   1 [0, 0, 0, 0, 0, 0], 3
  //   2 [0, 0, 0, 0, 0, 0], 2
  //   3 [0, 0, 0, 0, 0, 0], 2
  //     [3, 4, 2, 2, 1, 5]
  //   ];

  //   const testResult2 = [
  //     [2, 1, 4, 3, 5, 6],
  //     [1, 6, 3, 2, 4, 5],
  //     [4, 3, 6, 5, 1, 2],
  //     [6, 5, 2, 1, 3, 4],
  //     [5, 4, 1, 6, 2, 3],
  //     [3, 2, 5, 4, 6, 1],
  //   ];

  return 1;
}

const clue1 = [3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2, 4];
const expected1 = [
  [2, 1, 4, 3, 5, 6],
  [1, 6, 3, 2, 4, 5],
  [4, 3, 6, 5, 1, 2],
  [6, 5, 2, 1, 3, 4],
  [5, 4, 1, 6, 2, 3],
  [3, 2, 5, 4, 6, 1],
];

const clue2 = [0, 0, 0, 2, 2, 0, 0, 0, 0, 6, 3, 0, 0, 4, 0, 0, 0, 0, 4, 4, 0, 3, 0, 0];
const expected2 = [
  [5, 6, 1, 4, 3, 2],
  [4, 1, 3, 2, 6, 5],
  [2, 3, 6, 1, 5, 4],
  [6, 5, 4, 3, 2, 1],
  [1, 2, 5, 6, 4, 3],
  [3, 4, 2, 5, 1, 6],
];

const clue3 = [0, 3, 0, 5, 3, 4, 0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0];
const expected3 = [
  [5, 2, 6, 1, 4, 3],
  [6, 4, 3, 2, 5, 1],
  [3, 1, 5, 4, 6, 2],
  [2, 6, 1, 5, 3, 4],
  [4, 3, 2, 6, 1, 5],
  [1, 5, 4, 3, 2, 6],
];

// console.log(expected1);
// console.log(solvePuzzle(clue1));
solvePuzzle(clue1);
console.log("");

// console.log(expected2);
// console.log(solvePuzzle(clue2));
solvePuzzle(clue2);
console.log("");

// console.log(expected3);
// console.log(solvePuzzle(clue3));
solvePuzzle(clue3);
console.log("");

// Description:
// In a grid of 6 by 6 squares you want to place a skyscraper in each square with only some clues:

// The height of the skyscrapers is between 1 and 6
// No two skyscrapers in a row or column may have the same number of floors
// A clue is the number of skyscrapers that you can see in a row or column from the outside
// Higher skyscrapers block the view of lower skyscrapers located behind them

// Can you write a program that can solve each 6 by 6 puzzle?

// Example:

// To understand how the puzzle works, this is an example of a row with 2 clues. Seen from the left there are 6 buildings visible while seen from the right side only 1:

//  6	  	  	  	  	  	  	 1

// There is only one way in which the skyscrapers can be placed. From left-to-right all six buildings must be visible and no building may hide behind another building:

//  6	 1	 2	 3	 4	 5	 6	 1

// Example of a 6 by 6 puzzle with the solution:

//   	   	   	   	2	2

//  3
//   	  	  	  	  	  	  	 6
//  4	  	  	  	  	  	  	 3
//  4
//   	  	  	  	  	4

//   	  	  	  	 2	 2
//   	 5	 6	 1	 4	 3	 2
//   	 4	 1	 3	 2	 6	 5
//  3	 2	 3	 6	 1	 5	 4
//   	 6	 5	 4	 3	 2	 1	 6
//  4	 1	 2	 5	 6	 4	 3	 3
//  4	 3	 4	 2	 5	 1	 6
//   	  	  	  	  	4

// Task:

// Finish:
// function solvePuzzle(clues)
// Pass the clues in an array of 24 items. The clues are in the array around the clock. Index:
//   	 0	 1	 2	 3	 4	 5
//  23	  	  	  	  	  	  	 6
//  22	  	  	  	  	  	  	 7
//  21	  	  	  	  	  	  	 8
//  20	  	  	  	  	  	  	 9
//  19	  	  	  	  	  	  	 10
//  18	  	  	  	  	  	  	 11
//   	17	16	15	14	13	12
// If no clue is available, add value `0`
// Each puzzle has only one possible solution
// `SolvePuzzle()` returns matrix `int[][]`. The first indexer is for the row, the second indexer for the column. Python returns a 6-tuple of 6-tuples, Ruby a 6-Array of 6-Arrays.
