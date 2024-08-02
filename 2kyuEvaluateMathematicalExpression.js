const calc = function (expression) {
  console.log(`Expression is: ${expression}`);
  let tokens = expression.split("");
  let validExpression = true;
  let i = 0;

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

  while (i < tokens.length) {
    if (tokens[i] === "*" || tokens[i] === "/") {
      let operator = tokens[i];
      console.log(`operator: ${operator}`);
      let j = i - 1;
      while (
        j >= 0 &&
        (!isNaN(tokens[j]) ||
          tokens[j] === "." ||
          (tokens[j] === "-" && (j === 0 || isNaN(tokens[j - 1]))))
      )
        j--;
      let firstOperand = parseFloat(tokens.slice(j + 1, i).join(""));
      console.log(`firstOperand: ${firstOperand}`);

      let k = i + 1;
      while (
        k < tokens.length &&
        (!isNaN(tokens[k]) || tokens[k] === "." || (tokens[k] === "-" && k === i + 1))
      )
        k++;
      let secondOperand = parseFloat(tokens.slice(i + 1, k).join(""));
      console.log(`secondOperand: ${secondOperand}`);

      let result;
      if (operator === "*") result = firstOperand * secondOperand;
      else if (operator === "/") result = firstOperand / secondOperand;

      console.log(`result: ${result}`);
      console.log(``);
      tokens.splice(j + 1, k - j - 1, result.toString());
      i = j + 1;
    } else {
      i++;
    }
  }

  console.log(``);
  console.log(`tokens: ${tokens}`);

  let result = 0;
  let currentNumber = "";
  let currentOperator = "+";
  i = 0;

  while (i < tokens.length) {
    // if (i === 0 && tokens[i] === "-") currentOperator = "-";
    if (!isNaN(tokens[i]) || tokens[i] === ".") {
      // || (tokens[i] === "-" && (i === 0 || isNaN(tokens[i - 1])))
      currentNumber += tokens[i];
    } else {
      if (currentNumber) {
        if (currentOperator === "+") result += parseFloat(currentNumber);
        else if (currentOperator === "-") result -= parseFloat(currentNumber);
      }

      currentNumber = "";
      currentOperator = tokens[i];

      while (tokens[i + 1] === "-" || tokens[i + 1] === "+") {
        if (currentOperator === "-" && tokens[i + 1] === "-") {
          currentOperator = "+";
        } else if (currentOperator === "+" && tokens[i + 1] === "-") {
          currentOperator = "-";
        }
        i++;
      }
    }

    console.log(`Current number: ${currentNumber}`);
    console.log(`currentOperator ${currentOperator}`);
    console.log(`Updated result: ${result}`);
    i++;
  }

  if (currentNumber) {
    if (currentOperator === "+") result += parseFloat(currentNumber);
    else if (currentOperator === "-") result -= parseFloat(currentNumber);
  }

  console.log(`Current number: ${currentNumber}`);
  console.log(`currentOperator ${currentOperator}`);
  console.log(`Updated result: ${result}`);
  console.log(`validExpression: ${validExpression}`);

  return validExpression ? result : "Invalid";
};

console.log('calc("1+1")');
console.log(`Should return: ${2}`);
console.log(`It returns: ${calc("1+1")}`);
console.log("-----------------------------------------------------------------------");
console.log('calc("1 - 1")');
console.log(`Should return: ${0}`);
console.log(`It returns: ${calc("1 - 1")}`);
console.log("-----------------------------------------------------------------------");
console.log('calc("1* 1")');
console.log(`Should return: ${1}`);
console.log(`It returns: ${calc("1* 1")}`);
console.log("-----------------------------------------------------------------------");
console.log('calc("1 /1")');
console.log(`Should return: ${1}`);
console.log(`It returns: ${calc("1 /1")}`);
console.log("-----------------------------------------------------------------------");
console.log('calc("-123")');
console.log(`Should return: ${-123}`);
console.log(`It returns: ${calc("-123")}`);
console.log("-----------------------------------------------------------------------");
console.log('calc("123")');
console.log(`Should return: ${123}`);
console.log(`It returns: ${calc("123")}`);
console.log("-----------------------------------------------------------------------");
console.log('calc("2 /2+3 * 4.75- -6")');
console.log(`Should return: ${21.25}`);
console.log(`It returns: ${calc("2 /2+3 * 4.75- -6")}`);
console.log("-----------------------------------------------------------------------");
console.log('calc("12* 123")');
console.log(`Should return: ${1476}`);
console.log(`It returns: ${calc("12* 123")}`);
console.log("-----------------------------------------------------------------------");
console.log('calc("2 / (2 + 3) * 4.33 - -6")');
console.log(`Should return: ${7.732}`);
console.log(`It returns: ${calc("2 / (2 + 3) * 4.33 - -6")}`);
console.log("-----------------------------------------------------------------------");
console.log('calc("2 / (8 + (3 * 4)) * 29.33 - -6")');
console.log(`Should return: ${8.933}`);
console.log(`It returns: ${calc("2 / (8 + (3 * 4)) * 29.33 - -6")}`);
console.log("-----------------------------------------------------------------------");
console.log('calc("2 / (2 + (3 * 4)) * 4.33 - -6")');
console.log(`Should return: ${6.62}`);
console.log(`It returns: ${calc("2 / (2 + (3 * 4)) * 4.33 - -6")}`);
console.log("-----------------------------------------------------------------------");
console.log('calc("2 / (2 + (3 * 4)) * 4.33 - - 6")');
console.log(`Should return: ${"Invalid"}`);
console.log(`It returns: ${calc("2 / (2 + (3 * 4)) * 4.33 - - 6")}`);
console.log("-----------------------------------------------------------------------");
console.log('calc("12* 123/-(-5 + 2)")');
console.log(`Should return: ${"492"}`);
console.log(`It returns: ${calc("12* 123/-(-5 + 2)")}`);
console.log("-----------------------------------------------------------------------");

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
