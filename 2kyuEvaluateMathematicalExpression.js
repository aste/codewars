const calc = function (expression) {
  let tokens = expression.split("");
  let validExpression = true;

  if (tokens.includes(" ")) {
    let plusMinusSignsDetected = 0;
    let blankSpacesDetected = 0;
    let blankSpacesCanBeDetected = false;

    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i] === "-" || tokens[i] === "+") {
        plusMinusSignsDetected += 1;
        blankSpacesCanBeDetected = true;
      }
      if (tokens[i] === " " && blankSpacesCanBeDetected) {
        blankSpacesDetected += 1;
      }
      if (!isNaN(tokens[i]) && tokens[i].trim() !== "") {
        if (plusMinusSignsDetected >= 2 && blankSpacesDetected >= 2 && tokens[i - 1] === " ") {
          validExpression = false;
          break;
        }
      }
    }
    tokens = tokens.filter((token) => token !== " ");
  }

  while (tokens.includes("(")) {
    let startOfParenthesisIndex = -1;
    let endOfParenthesisIndex;
    let nestedLevels = 0;

    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i] === "(") {
        if (startOfParenthesisIndex === -1) {
          startOfParenthesisIndex = i;
        } else {
          nestedLevels += 1;
        }
      }

      if (tokens[i] === ")") {
        if (nestedLevels === 0) {
          endOfParenthesisIndex = i;
          break;
        } else {
          nestedLevels -= 1;
        }
      }
    }

    if (startOfParenthesisIndex !== -1 && endOfParenthesisIndex !== undefined) {
      const subExpression = tokens
        .slice(startOfParenthesisIndex + 1, endOfParenthesisIndex)
        .join("");

      const subResult = calc(subExpression);

      tokens.splice(
        startOfParenthesisIndex,
        endOfParenthesisIndex - startOfParenthesisIndex + 1,
        subResult.toString()
      );
    }
  }

  let i = 0;
  while (i < tokens.length) {
    if (tokens[i] === "*" || tokens[i] === "/") {
      let operator = tokens[i];
      let j = i - 1;
      while (j >= 0 && (!isNaN(tokens[j]) || tokens[j] === ".")) j--;
      let firstOperand = parseFloat(tokens.slice(j + 1, i).join(""));

      let k = i + 1;
      while (k < tokens.length && (!isNaN(tokens[k]) || tokens[k] === ".")) k++;
      let secondOperand = parseFloat(tokens.slice(i + 1, k).join(""));

      let result;
      if (operator === "*") result = firstOperand * secondOperand;
      else if (operator === "/") result = firstOperand / secondOperand;

      tokens.splice(j + 1, k - j - 1, result.toString());
      i = j + 1;
    } else {
      i++;
    }
  }

  let result = 0;
  let currentNumber = "";
  let currentOperator = "+";

  for (let i = 0; i < tokens.length; i++) {
    if (!isNaN(tokens[i]) || tokens[i] === ".") {
      currentNumber += tokens[i];
    }

    if (isNaN(tokens[i]) || i === tokens.length - 1) {
      if (currentNumber) {
        if (currentOperator === "+") result += parseFloat(currentNumber);
        else if (currentOperator === "-") result -= parseFloat(currentNumber);
      }

      currentOperator = tokens[i];
      currentNumber = "";
    }
  }

  return validExpression ? result : "Invalid";
};

console.log('calc("1+1")');
console.log(`Should return: ${2}`);
console.log(`It returns: ${calc("1+1")}`);
console.log("");
console.log('calc("1 - 1")');
console.log(`Should return: ${0}`);
console.log(`It returns: ${calc("1 - 1")}`);
console.log("");
console.log('calc("1* 1")');
console.log(`Should return: ${1}`);
console.log(`It returns: ${calc("1* 1")}`);
console.log("");
console.log('calc("1 /1")');
console.log(`Should return: ${1}`);
console.log(`It returns: ${calc("1 /1")}`);
console.log("");
console.log('calc("-123")');
console.log(`Should return: ${-123}`);
console.log(`It returns: ${calc("-123")}`);
console.log("");
console.log('calc("123")');
console.log(`Should return: ${123}`);
console.log(`It returns: ${calc("123")}`);
console.log("");
console.log('calc("2 /2+3 * 4.75- -6")');
console.log(`Should return: ${21.25}`);
console.log(`It returns: ${calc("2 /2+3 * 4.75- -6")}`);
console.log("");
console.log('calc("12* 123")');
console.log(`Should return: ${1476}`);
console.log(`It returns: ${calc("12* 123")}`);
console.log("");
console.log('calc("2 / (2 + 3) * 4.33 - -6")');
console.log(`Should return: ${7.732}`);
console.log(`It returns: ${calc("2 / (2 + 3) * 4.33 - -6")}`);
console.log("");
console.log('calc("2 / (2 + (3 * 4)) * 4.33 - -6")');
console.log(`Should return: ${6.62}`);
console.log(`It returns: ${calc("2 / (2 + (3 * 4)) * 4.33 - -6")}`);
console.log("");
console.log('calc("2 / (2 + (3 * 4)) * 4.33 - - 6")');
console.log(`Should return: ${"Invalid"}`);
console.log(`It returns: ${calc("2 / (2 + (3 * 4)) * 4.33 - - 6")}`);
console.log("");

// You need to support multiple levels of nested parentheses, ex. (2 / (2 + 3.33) * 4) - -6

// Whitespace
// There may or may not be whitespace between numbers and operators.

// An addition to this rule is that the minus sign (-) used for negating numbers and parentheses will never be separated by whitespace. I.e all of the following are valid expressions.

// 1-1    // 0
// 1 -1   // 0
// 1- 1   // 0
// 1 - 1  // 0
// 1- -1  // 2
// 1 - -1 // 2
// 1--1   // 2

// 6 + -(4)   // 2
// 6 + -( -4) // 10
// And the following are invalid expressions

// 1 - - 1    // Invalid
// 1- - 1     // Invalid
// 6 + - (4)  // Invalid
// 6 + -(- 4) // Invalid
// Validation
// You do not need to worry about validation - you will only receive valid mathematical expressions following the above rules.

// Restricted APIs
// NOTE: Both eval and Function are disabled.
