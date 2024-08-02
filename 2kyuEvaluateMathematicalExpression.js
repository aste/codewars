const calc = function (expression) {
  let tokens = expression.split("");
  let validExpression = true;
  let i = 0;

  if (tokens.includes(" ")) {
    let signsDetected = 0;
    let blankSpacesDetected = 0;
    let blankSpacesCanBeDetected = false;

    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i] === "-" || tokens[i] === "+") {
        signsDetected += 1;
        blankSpacesCanBeDetected = true;
      }
      if (tokens[i] === " " && blankSpacesCanBeDetected) {
        blankSpacesDetected += 1;
      }
      if (!isNaN(tokens[i]) && tokens[i].trim() !== "") {
        if (signsDetected >= 2 && blankSpacesDetected >= 2 && tokens[i - 1] === " ") {
          validExpression = false;
          break;
        } else {
          signsDetected = 0;
          blankSpacesDetected = 0;
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
      let j = i - 1;

      while (
        j >= 0 &&
        (!isNaN(tokens[j]) ||
          tokens[j] === "." ||
          (tokens[j] === "-" && (j === 0 || isNaN(tokens[j - 1]))))
      ) {
        j--;
      }
      let firstOperand = parseFloat(tokens.slice(j + 1, i).join(""));

      let k = i + 1;
      let isNegative = false;
      if (tokens[k] === "-") {
        isNegative = true;
        k++;
        while (tokens[k] === "-") {
          isNegative = !isNegative;
          k++;
        }
      }
      while (k < tokens.length && (!isNaN(tokens[k]) || tokens[k] === ".")) {
        k++;
      }
      let secondOperand = parseFloat(tokens.slice(i + 1 + (isNegative ? 1 : 0), k).join(""));
      if (isNegative) {
        secondOperand = -secondOperand;
      }

      let result;
      if (operator === "*") {
        result = firstOperand * secondOperand;
      } else if (operator === "/") {
        result = firstOperand / secondOperand;
      }

      tokens.splice(j + 1, k - j - 1, result.toString());
      i = j + 1;
    } else {
      i++;
    }
  }

  let result = 0;
  let currentNumber = "";
  let currentOperator = "+";
  i = 0;

  while (i < tokens.length) {
    if (!isNaN(tokens[i]) || tokens[i] === ".") {
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

    i++;
  }

  if (currentNumber) {
    if (currentOperator === "+") result += parseFloat(currentNumber);
    else if (currentOperator === "-") result -= parseFloat(currentNumber);
  }

  return validExpression ? result : "Invalid";
};

// Based on http://en.wikipedia.org/wiki/Recursive_descent_parser

function calc(expr) {
  // Initialize the expression to parse by removing whitespace and splitting into characters
  var expressionToParse = expr.replace(/\s+/g, "").split("");

  // Peek at the next character in the expression without consuming it
  function peek() {
    // Implement peek logic
  }

  // Get the next character in the expression and consume it
  function get() {
    // Implement get logic
  }

  // Parse and return a number from the expression
  function number() {
    // Implement number parsing logic
  }

  // Parse and return a factor (number, parenthesis expression, or negation)
  function factor() {
    // Implement factor parsing logic
  }

  // Parse and return a term (factors connected by multiplication or division)
  function term() {
    // Implement term parsing logic
  }

  // Parse and return an expression (terms connected by addition or subtraction)
  function expression() {
    // Implement expression parsing logic
  }

  // Start parsing and return the result
  return expression();
}
