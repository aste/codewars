function triangle(row) {
  // Initialize an array to store the reduction steps derived from powers of 3
  const reductionSteps = [];

  // Loop to calculate powers of 3 and add 1 to each, up to the length of the row
  for (let exponent = 0; Math.pow(3, exponent) <= row.length; exponent++) {
    reductionSteps.unshift(Math.pow(3, exponent) + 1);
  }

  // Loop through each step size in reductionSteps, starting from the largest
  for (const stepSize of reductionSteps) {
    // Continue reducing the row while its length is greater than or equal to the current step size
    while (row.length >= stepSize) {
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
    }
  }

  return row[0];
}


function triangle(row) {
  const colorMap = { R: 0, G: 1, B: 2 };
  const colorReverseMap = ["R", "G", "B"];

  let rowArray = row.split("").map((char) => colorMap[char]);

  const reductionSteps = [];

  for (let exponent = 0; Math.pow(3, exponent) <= rowArray.length; exponent++) {
    reductionSteps.unshift(Math.pow(3, exponent) + 1);
  }

  for (const stepSize of reductionSteps) {
    while (rowArray.length >= stepSize) {
      const reducedRow = [];

      for (let i = 0; i < rowArray.length - stepSize + 1; i++) {
        if (rowArray[i] === rowArray[i + stepSize - 1]) {
          reducedRow.push(rowArray[i]);
        } else {
          reducedRow.push((rowArray[i] + rowArray[i + stepSize - 1]) % 3);
        }
      }

      rowArray = reducedRow;
    }
  }

  return colorReverseMap[rowArray[0]];
}
