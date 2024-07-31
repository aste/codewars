const calc = function (expression) {
  console.log(`expression:`);
  console.log(expression);
  let arrOfParenthesis = expression.split(/(?=\()|(?<=\))/);
  console.log(`arrOfParenthesis:`);
  console.log(arrOfParenthesis);
  //   let arrOfExpParts = expression.split(/([+\-()])/);
  //   console.log(`arrOfExpParts:`);
  //   console.log(arrOfExpParts);
  //   let splitOperatorDetected = false;
  //   let splitExpStart = 0;
  //   let splitExpEnd = arrExp.length - 1;

  //   for (let i = 0; i < arrExp.length - 1; i++) {

  //   }
  // evaluate `expression` and return result
};

console.log(calc("1+1"));
console.log(2);
console.log("");
console.log(calc("1 - 1"));
console.log(0);
console.log("");
console.log(calc("1* 1"));
console.log(1);
console.log("");
console.log(calc("1 /1"));
console.log(1);
console.log("");
console.log(calc("-123"));
console.log(-123);
console.log("");
console.log(calc("123"));
console.log(123);
console.log("");
console.log(calc("2 /2+3 * 4.75- -6"));
console.log(21.25);
console.log("");
console.log(calc("12* 123"));
console.log(1476);
console.log("");
console.log(calc("2 / (2 + 3) * 4.33 - -6"));
console.log(7.732);

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