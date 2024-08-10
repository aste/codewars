function triangle(row) {
  // Initialize an array to store the reduction steps derived from powers of 3
  const reductionSteps = [];

  // Loop to calculate powers of 3 and add 1 to each, up to the length of the row
  for (let exponent = 0; Math.pow(3, exponent) <= row.length; exponent++) {
    reductionSteps.unshift(Math.pow(3, exponent) + 1);
  }

  console.log("Reduction steps (reductionSteps):", reductionSteps);

  // Loop through each step size in reductionSteps, starting from the largest
  for (const stepSize of reductionSteps) {
    console.log(`\nProcessing with stepSize = ${stepSize}`); // Debugging: Show current step size being processed

    // Continue reducing the row while its length is greater than or equal to the current step size
    while (row.length >= stepSize) {
      console.log(`Current row length before reduction: ${row.length}`);
      console.log(`Current row before reduction: ${row}`); // Debugging: Show the current state of the row

      // Initialize a new array to hold the reduced version of the row
      let reducedRow = [];

      // Iterate through the row, reducing it by comparing elements stepSize - 1 apart
      for (let i = 0; i < row.length - stepSize + 1; i++) {
        if (row[i] === row[i + stepSize - 1]) {
          reducedRow.push(row[i]);
        } else {
          const remainingColorSet = new Set(["R", "G", "B"]);
          remainingColorSet.delete(row[i]); // Remove the first color
          remainingColorSet.delete(row[i + stepSize - 1]); // Remove the second color
          reducedRow.push([...remainingColorSet][0]); // Push the remaining color to reducedRow
        }
      }

      // Convert reducedRow back to a string and assign it to row for the next reduction step
      row = reducedRow.join("");
      console.log(`Row length after reduction: ${row.length}`);
      console.log(`Row after reduction: ${row}`);
    }
  }

  console.log(`\nFinal reduced row: ${row}`); // Debugging: Show the final reduced row before returning the result
  return row[0];
}

// function triangle(row) {
//   // Initialize an array to store the reduction steps derived from powers of 3
//   const reductionSteps = [];

//   // Loop to calculate powers of 3 and add 1 to each, up to the length of the row
//   for (let exponent = 0; Math.pow(3, exponent) <= row.length; exponent++) {
//     reductionSteps.unshift(Math.pow(3, exponent) + 1);
//   }

//   console.log("Reduction steps (reductionSteps):", reductionSteps);

//   // Loop through each step size in reductionSteps, starting from the largest
//   for (const stepSize of reductionSteps) {
//     console.log(`\nProcessing with stepSize = ${stepSize}`); // Debugging: Show current step size being processed

//     // Continue reducing the row while its length is greater than or equal to the current step size
//     while (row.length >= stepSize) {
//       console.log(`Current row length before reduction: ${row.length}`);
//       console.log(`Current row before reduction: ${row}`); // Debugging: Show the current state of the row

//       // Initialize a new array to hold the reduced version of the row
//       let reducedRow = [];

//       // Iterate through the row, reducing it by comparing elements stepSize - 1 apart
//       for (let i = 0; i < row.length - stepSize + 1; i++) {
//         if (row[i] === row[i + stepSize - 1]) {
//           reducedRow.push(row[i]);
//         } else {
//           const remainingColorSet = new Set(["R", "G", "B"]);
//           remainingColorSet.delete(row[i]); // Remove the first color
//           remainingColorSet.delete(row[i + stepSize - 1]); // Remove the second color
//           reducedRow.push([...remainingColorSet][0]); // Push the remaining color to reducedRow
//         }
//       }

//       // Convert reducedRow back to a string and assign it to row for the next reduction step
//       row = reducedRow.join("");
//       console.log(`Row length after reduction: ${row.length}`);
//       console.log(`Row after reduction: ${row}`);
//     }
//   }

//   console.log(`\nFinal reduced row: ${row}`); // Debugging: Show the final reduced row before returning the result
//   return row[0];
// }




console.log("triangle('B') should give:");
console.log("B");
console.log(`It gives: ${triangle("B")}`);
console.log("----------------------------------------");

console.log("triangle('GB') should give:");
console.log("R");
console.log(`It gives: ${triangle("GB")}`);
console.log("----------------------------------------");

console.log("triangle('RRR') should give:");
console.log("R");
console.log(`It gives: ${triangle("RRR")}`);
console.log("----------------------------------------");

console.log("triangle('RGBG') should give:");
console.log("B");
console.log(`It gives: ${triangle("RGBG")}`);
console.log("----------------------------------------");

console.log("triangle('RBRGBRB') should give:");
console.log("G");
console.log(`It gives: ${triangle("RBRGBRB")}`);
console.log("----------------------------------------");

console.log("triangle('RBRGBRBGGRRRBGBBBGG') should give:");
console.log("G");
console.log(`It gives: ${triangle("RBRGBRBGGRRRBGBBBGG")}`);
console.log("----------------------------------------");
