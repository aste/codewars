function lastDigit(exponentArray) {
  function minimalEffectiveExponent(exp) {
    // * (see explanation)
    if (exp < 4) return exp;

    const expModulus = exp % 4;
    return expModulus === 0 || expModulus == 1 ? expModulus + 4 : expModulus;
  }

  function minimalEffectiveBase(base, exponent) {
    const baseStr = base.toString().split("");
    if (baseStr.length === 1 || baseStr.length === 2) return base;

    let minTestBase;

    for (let i = baseStr.length - 2; i >= 0; i--) {
      if (baseStr[i] !== "0") {
        minTestBase = baseStr.slice(i).join("");
        // **
        if (minTestBase ** exponent >= 100) break;
      }
    }

    return minTestBase;
  }

  let exponent = 1;
  let minimalExponent = 1;
  let minimalBase;

  for (let i = exponentArray.length - 1; i >= 0; i--) {
    const currentBase = exponentArray[i];

    minimalBase = minimalEffectiveBase(currentBase, minimalExponent);
    exponent = minimalBase ** minimalExponent;

    minimalExponent = minimalEffectiveExponent(exponent);
  }

  return exponent % 10;
}

// * All base numbers ending with 0 to 9 have a repeatable last digit pattern result when raised
// to a given exponent, a pattern that repeats cyclically when the exponent is increased by 4
//
// Table of last digit pattern when raised a base number is raised to the power of
//
//     exponents:     1 | 2 3 4 | 5
// -------------------------------------------------------------------------------
// base number 0:     0 | 0 0 0 | 0   last digits of base number when raised to exponent above
// base number 1:     1 | 1 1 1 | 1
// base number 2:     2 | 4 8 6 | 2
// base number 3:     3 | 9 7 1 | 3
// base number 4:     4 | 6 4 6 | 4
// base number 5:     5 | 5 5 5 | 5
// base number 6:     6 | 6 6 6 | 6
// base number 7:     7 | 9 3 1 | 7
// base number 8:     8 | 4 2 6 | 8
// base number 9:     9 | 1 9 1 | 9

// ** As long as the base number is 100 or above the result won't change when converted via
// minimalEffectiveExponent in the next iteration, as all digits in the hundreds and above
// yield the same result when used as an operand with the modulus operator % 4 
