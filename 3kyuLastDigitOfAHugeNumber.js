function lastDigit(exponentArray) {
  console.log(exponentArray);
  // *
  function minEffectiveExponent(exp) {
    console.log(`--- input exponent to minEffectiveExponent: ${exp}`);
    const expModulus = exp % 4;
    console.log(`--- expModulus: ${expModulus}`);

    if (exp < 4) {
      console.log(`--- output is exp: ${exp}`);
      return exp;
    } else if (expModulus === 0) {
      console.log(
        `--- output exponent of minEffectiveExponent is expModulus + 4: ${expModulus + 4}`
      );
      // return expModulus + 4;
      return 4;
    } else {
      console.log(`--- output exponent of minEffectiveExponent is expModulus: ${expModulus}`);
      return expModulus;
    }
  }

  function minEffectiveBase(num) {
    const numStr = num.toString().split("");
    if (numStr.length === 1 || numStr.length === 2) return num;
    let index;

    for (let i = numStr.length - 3; i > 0; i--) {
      if (numStr[i] !== "0") {
        index = i;
        break;
      }
    }

    console.log(`minEffectiveBase is: ${Number(numStr.slice(index).join(""))}`)

    return Number(numStr.slice(index).join(""));
  }

  // let lastDigitOfBaseRaised = 1;
  let accumulativeExponent = 1;

  for (let i = exponentArray.length - 1; i >= 0; i--) {
    console.log(`before operations:`);
    console.log(`i: ${i}`);
    console.log(`current base: ${exponentArray[i]}`);
    console.log(`current exponent: ${accumulativeExponent}`);

    const minimalBase = minEffectiveBase(exponentArray[i]);
    const minimalExponent = minEffectiveExponent(accumulativeExponent);
    console.log(`minimalBase: ${minimalBase}`);
    console.log(`minimalExponent: ${minimalExponent}`);

    // const fullTestExponent = exponentArray[i] ** (accumulativeExponent);

    accumulativeExponent = minimalBase ** minimalExponent;
    console.log(``);
    console.log(`accumulativeExponent after: ${accumulativeExponent}`);

    accumulativeExponent = minEffectiveExponent(accumulativeExponent);
    console.log(``);
    console.log(`minimal accumulativeExponent: ${accumulativeExponent}`);
    console.log(``);
    console.log(``);
  }

  return accumulativeExponent % 10;
}

// * All base numbers that ends with 0 to 9 have a repeatable last digit pattern result when
// raised to a given power/exponent, a pattern that repeats when the exponent is increased by 4
// Table of last digit pattern when raised a base number is raised to the power of
//     exponent: 1 | 2 3 4 | 5
// ------------------------------------
//  base number: 0 | 0 0 0 | 0  last digit of base when raised to exponent above
//               1 | 1 1 1 | 1
//               2 | 4 8 6 | 2
//               3 | 9 7 1 | 3
//               4 | 6 4 6 | 4
//               5 | 5 5 5 | 5
//               6 | 6 6 6 | 6
//               7 | 9 3 1 | 7
//               8 | 4 2 6 | 8
//               9 | 1 9 1 | 9

// For a given list [x1, x2, x3, ..., xn] compute the last (decimal) digit of x1 ^ (x2 ^ (x3 ^ (... ^ xn))).

// E. g., with the input [3, 4, 2], your code should return 1 because 3 ^ (4 ^ 2) = 3 ^ 16 = 43046721.

// Beware: powers grow incredibly fast. For example, 9 ^ (9 ^ 9) has more than 369 millions of digits. lastDigit has to deal with such numbers efficiently.

// Corner cases: we assume that 0 ^ 0 = 1 and that lastDigit of an empty list equals to 1.

// This kata generalizes Last digit of a large number; you may find useful to solve it beforehand.

console.log(lastDigit([7, 6, 21]));
console.log(1);
console.log("------------");

console.log(lastDigit([12, 30, 21]));
console.log(4);
console.log("------------");

console.log(lastDigit([425033, 580003, 71895, 737718, 22162]));
console.log(7);
console.log("------------");

console.log(lastDigit([2, 2, 2, 0]));
console.log(4);
console.log("------------");

console.log(lastDigit([]));
console.log(1);
console.log("------------");

console.log(lastDigit([0, 0]));
console.log(1);
console.log("------------");

console.log(lastDigit([0, 0, 0]));
console.log(0);
console.log("------------");

console.log(lastDigit([1, 2]));
console.log(1);
console.log("------------");

console.log(lastDigit([3, 4, 5]));
console.log(1);
console.log("------------");

console.log(lastDigit([3, 4, 2]));
console.log(1);
console.log("------------");

console.log(lastDigit([4, 3, 6]));
console.log(4);
console.log("------------");

console.log(lastDigit([7, 6, 21]));
console.log(1);
console.log("------------");

console.log(lastDigit([12, 30, 21]));
console.log(6);
console.log("------------");

console.log(lastDigit([2, 2, 2, 0]));
console.log(4);
console.log("------------");

console.log(lastDigit([937640, 767456, 981242]));
console.log(0);
console.log("------------");

console.log(lastDigit([123232, 694022, 140249]));
console.log(6);
console.log("------------");

console.log(lastDigit([499942, 898102, 846073]));
console.log(6);
