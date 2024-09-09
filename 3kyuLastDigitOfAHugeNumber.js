function lastDigit(exponentArray) {
  console.log(exponentArray);
  // *
  function minEffectiveExponent(exp) {
    // console.log(`--- input exponent to minEffectiveExponent: ${exp}`);
    const expModulus = exp % 4;
    // console.log(`--- expModulus: ${expModulus}`);

    if (exp < 4) {
      // console.log(`--- output is exp: ${exp}`);
      return exp;
    } else {
      // console.log(`--- output is expModulus + 4: ${expModulus + 4}`);
      // return expModulus === 0 ? expModulus + 4 : expModulus;
      return expModulus === 0 || expModulus == 1 ? expModulus + 4 : expModulus;
    }
  }

  function minEffectiveBase(base, exponent) {
    // console.log(`base ${base}`)
    // include the full base or the minimal base that holds at least two ciphers and where the result is at minimum 3 ciphers as any 3 cipher base number generate the same minimal effective exponent for the next cycle
    const baseStr = base.toString().split("");

    if (baseStr.length === 1 || baseStr.length === 2) return base;
    let minTestBase;

    for (let i = baseStr.length - 2; i >= 0; i--) {
      // console.log(`i: ${i}`)
      if (baseStr[i] !== "0") {
        minTestBase = baseStr.slice(i).join("");
        // console.log(`minTestBase: ${minTestBase}`)
        if (minTestBase ** exponent >= 100) {
          break;
        }
      }
    }
    // console.log(`*** minEffectiveBase output is minTestBase: ${minTestBase}`);

    return minTestBase;
  }

  // let lastDigitOfBaseRaised = 1;
  let exponent = 1;
  let minimalExponent = 1;
  let minimalBase;

  for (let i = exponentArray.length - 1; i >= 0; i--) {
    // console.log(`before operations:`);
    console.log(`i: ${i}`);
    const currentBase = exponentArray[i];
    console.log(`current base: ${currentBase}`);

    minimalBase = minEffectiveBase(currentBase, minimalExponent);
    console.log(`minimalBase: ${minimalBase}`);
    
    
    console.log(`minimalExponent: ${minimalBase}`);

    exponent = minimalBase ** minimalExponent;
    console.log(`exponent: ${exponent}`);
    
    minimalExponent = minEffectiveExponent(exponent);
    console.log(`minimalExponent: ${minimalExponent}`);
    console.log(``);
    
    // const minimalEffectiveExponent = minEffectiveExponent(minimalExponent)
    // console.log(`minimal effective Exponent: ${minimalExponent}`);

    // const currentMinEffectiveBase = minEffectiveBase(currentBase, minimalExponent)
    // console.log(`current minimal effectiveBase: ${currentMinEffectiveBase}`);

    // console.log(`current exponent: ${minimalExponent}`);

    // // let minimalExponent = minEffectiveExponent(minimalExponent);
    // minimalExponent = minEffectiveExponent(minimalBase ** minimalExponent);

    // minimalBase = minEffectiveBase(exponentArray[i], minimalExponent);
    // console.log(`minimalBase: ${minimalBase}`);
    // // console.log(`minimalExponent: ${minimalExponent}`);

    // // const fullTestExponent = exponentArray[i] ** (minimalExponent);

    // // console.log(``);
    // console.log(`minimalExponent after: ${minimalExponent}`);

    // minimalExponent = minEffectiveExponent(minimalExponent);
    // // console.log(``);
    // console.log(`minimal minimalExponent: ${minimalExponent}`);
    // // console.log(``);
    // console.log(``);
  }

  return exponent % 10;
}

// * All base numbers that ends with 0 to 9 have a repeatable last digit pattern result when
// raised to a given power/exponent, a pattern that repeats when the exponent is increased by 4
// Table of last digit pattern when raised a base number is raised to the power of
//
// exponents: 1 | 2 3 4 | 5
// -------------------------------------------------------------------------------
// base 0     0 | 0 0 0 | 0  last digits of base when raised to exponents above
// base 1     1 | 1 1 1 | 1
// base 2     2 | 4 8 6 | 2
// base 3     3 | 9 7 1 | 3
// base 4     4 | 6 4 6 | 4
// base 5     5 | 5 5 5 | 5
// base 6     6 | 6 6 6 | 6
// base 7     7 | 9 3 1 | 7
// base 8     8 | 4 2 6 | 8
// base 9     9 | 1 9 1 | 9

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
console.log("------------");

console.log(lastDigit([82242, 254719, 736371]));
console.log(8);
console.log("------------");
