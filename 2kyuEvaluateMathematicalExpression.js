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
    let firstOperand;

    for (let i = 0; i < tokens.length; i++) {}
  }

  multiply;

  console.log(`tokens:`);
  console.log(tokens.join(""));
  console.log(`-(-1)): ${-(-1)}`);

  //   let arrOfParenthesis = expression.split(/(?=\()|(?<=\))/);
  //   console.log(`arrOfParenthesis:`);
  //   console.log(arrOfParenthesis);
  //   let arrOfExpParts = expression.split(/([+\-()])/);
  //   console.log(`arrOfExpParts:`);
  //   console.log(arrOfExpParts);
  //   let splitOperatorDetected = false;
  //   let splitExpStart = 0;
  //   let splitExpEnd = arrExp.length - 1;

  //   for (let i = 0; i < arrExp.length - 1; i++) {

  //   }
  // evaluate `expression` and return result
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
