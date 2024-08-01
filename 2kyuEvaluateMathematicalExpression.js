const calc = function (expression) {
  console.log(`expression:`);
  console.log(expression);
  let tokens = expression.split("");

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
          return "Invalid";
        }
      }
    }
    tokens = tokens.filter((token) => token !== " ");
  }

  if (tokens.includes("(")) {
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

  if (tokens.includes("*") || tokens.includes("/")) {
    let firstOperand = "";
    let operator = "";
    let secondOperand = "";
    let firstOperandStartIndex;
    let secondOperandEndIndex;

    for (let i = 0; i < tokens.length; i++) {
      if ((!isNaN(tokens[i]) || tokens[i] === ".") && !operator) {
        firstOperand += tokens[i];
        if (firstOperandStartIndex === undefined) {
          firstOperandStartIndex = i;
        }
      }
      if (tokens[i] === "*" || tokens[i] === "/") {
        operator = tokens[i];
      }
      if ((!isNaN(tokens[i]) || tokens[i] === ".") && operator) {
        secondOperand += tokens[i];
        secondOperandEndIndex = i;
      }
      if (
        (tokens[i] === "+" || tokens[i] === "-" || i === tokens.length - 1) &&
        firstOperand &&
        operator &&
        secondOperand
      ) {
        let subResult;

        if (operator === "*") {
          subResult = parseFloat(firstOperand) * parseFloat(secondOperand);
        } else if (operator === "/") {
          subResult = parseFloat(firstOperand) / parseFloat(secondOperand);
        }

        tokens.splice(
          firstOperandStartIndex,
          secondOperandEndIndex - firstOperandStartIndex + 1,
          subResult.toString()
        );

        i = firstOperandStartIndex;
        firstOperand = "";
        operator = "";
        secondOperand = "";
        firstOperandStartIndex = undefined;
        secondOperandEndIndex = undefined;
      }
    }
  }

  if (tokens.includes("+") || tokens.includes("-")) {
    let subResult = null;
    let operand = "";
    let operator = null;
    let startIndex;
    let endIndex;

    for (let i = 0; i < tokens.length; i++) {
      if (!isNaN(tokens[i]) || tokens[i] === ".") {
        operand += tokens[i];
        if (startIndex === undefined) {
          startIndex = i;
        }
        if (endIndex === undefined || i > endIndex) {
          endIndex = i;
        }
      }

      if (tokens[i] === "+" || tokens[i] === "-" || i === tokens.length - 1) {
        if (subResult === null) {
          subResult = parseFloat(operand);
        } else {
          if (operator === "+") {
            subResult += parseFloat(operand);
          } else if (operator === "-") {
            subResult -= parseFloat(operand);
          }
        }

        operator = tokens[i];
        operand = "";
        startIndex = i + 1;
      }

      if (i === tokens.length - 1 && operand) {
        if (operator === "+") {
          subResult += parseFloat(operand);
        } else if (operator === "-") {
          subResult -= parseFloat(operand);
        }

        endIndex = i;
      }

      
    }

    tokens.splice(0, endIndex + 1, subResult.toString());
  }


  return;
};

console.log(calc("2 / (2 + (3 * 4)) * 4.33 - -6"));
console.log(calc("2 / (2 + (3 * 4)) * 4.33 - - 6"));

// console.log(calc("1+1"));
// console.log(2);
// console.log("");
// console.log(calc("1 - 1"));
// console.log(0);
// console.log("");
// console.log(calc("1* 1"));
// console.log(1);
// console.log("");
// console.log(calc("1 /1"));
// console.log(1);
// console.log("");
// console.log(calc("-123"));
// console.log(-123);
// console.log("");
// console.log(calc("123"));
// console.log(123);
// console.log("");
// console.log(calc("2 /2+3 * 4.75- -6"));
// console.log(21.25);
// console.log("");
// console.log(calc("12* 123"));
// console.log(1476);
// console.log("");
// console.log(calc("2 / (2 + 3) * 4.33 - -6"));
// console.log(7.732);
// console.log("");

console.log(calc("2 / (2 + (3 * 4)) * 4.33 - -6"));
console.log(calc("2 / (2 + (3 * 4)) * 4.33 - - 6"));
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
