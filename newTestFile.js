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


function triangle(row) {
    const colorMap = { R: 0, G: 1, B: 2 };
    const colorReverseMap = ["R", "G", "B"];
  
    // Convert the input string to an array of numbers (0, 1, 2 for R, G, B)
    let rowArray = row.split("").map((char) => colorMap[char]);
    console.log("Initial row as numbers:", rowArray);
  
    // Initialize an array to store the reduction steps derived from powers of 3
    const reductionSteps = [];
  
    for (let exponent = 0; Math.pow(3, exponent) <= rowArray.length; exponent++) {
      reductionSteps.unshift(Math.pow(3, exponent) + 1);
    }
  
    console.log("Reduction steps:", reductionSteps);
  
    // Loop through each step size in reductionSteps, starting from the largest
    for (const stepSize of reductionSteps) {
      console.log(`\nProcessing with stepSize = ${stepSize}`); // Show current step size being processed
  
      // Continue reducing the row while its length is greater than or equal to the current step size
      while (rowArray.length >= stepSize) {
        console.log("Current rowArray before reduction:", rowArray);
  
        const reducedRow = [];
  
        // Iterate through the rowArray, reducing it by comparing elements stepSize - 1 apart
        for (let i = 0; i < rowArray.length - stepSize + 1; i++) {
          if (rowArray[i] === rowArray[i + stepSize - 1]) {
            reducedRow.push(rowArray[i]);
          } else {
            reducedRow.push((rowArray[i] + rowArray[i + stepSize - 1]) % 3);
          }
        }
  
        rowArray = reducedRow;
        console.log("RowArray after reduction:", rowArray); // Show the row after this reduction
      }
    }
  
    const finalColor = colorReverseMap[rowArray[0]];
    console.log("Final reduced row:", rowArray);
    console.log("Final color:", finalColor);
  
    return finalColor;
  }