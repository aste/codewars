//   DESCRIPTION:
//   In this kata we want to convert a string into an integer. The strings simply represent the numbers in words.

const numbers = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90,
  hundred: 100,
  thousand: 1000,
  million: 1000000,
};

function parseInt(string) {
  let strOfAllNumbers = string
    .split(/ |-/)
    .map((word) => numbers[word])
    .filter(Boolean);

  let total = 0;
  let lastVal = 0;
  let tempCalVal = 0;

  for (let i = 0; i < strOfAllNumbers.length; i++) {
    let currentVal = strOfAllNumbers[i];

    if (lastVal > currentVal || tempCalVal === 0) {
      tempCalVal = tempCalVal + currentVal;
    } else {
      tempCalVal = tempCalVal * currentVal;
    }

    if (currentVal === 1000000 || currentVal === 1000 || i === strOfAllNumbers.length - 1) {
      total += tempCalVal;
      tempCalVal = 0;
    }

    lastVal = currentVal;
  }

  return total;
}

let testStr = "three million eight hundred eighty-five thousand eight hundred and fourteen";

parseInt(testStr);

//   Additional Notes:
//   The minimum number is "zero" (inclusively)
//   The magnitudeimum number, which must be supported is 1 million (inclusively)
//   The "and" in e.g. "one hundred and twenty-four" is optional, in some cases it's present and in others it's not
//   All tested numbers are valid, you don't need to validate them

// Test cases:
console.log(`${parseInt("one")}`);
console.log("1");
console.log("");
console.log(`${parseInt("twenty")}`);
console.log("20");
console.log("");
console.log(`${parseInt("two hundred forty-six")}`);
console.log("246");
console.log("");
console.log(`${parseInt("seven hundred eighty-three thousand nine hundred and nineteen")}`);
console.log("783919");
console.log("");
console.log(
  `${parseInt("three million eight hundred eighty-five thousand eight hundred and fourteen")}`
);
console.log("3885814");
console.log("");
