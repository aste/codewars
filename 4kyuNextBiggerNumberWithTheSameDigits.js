// Description:
// Create a function that takes a positive integer and returns the next bigger number that can be formed by rearranging its digits. For example:

//   12 ==> 21
//  513 ==> 531
// 2017 ==> 2071
// If the digits can't be rearranged to form a bigger number, return -1 (or nil in Swift, None in Rust):

//   9 ==> -1
// 111 ==> -1
// 531 ==> -1

function nextBigger(num) {
  let result = -1;
  if (
    num ===
    Number(
      num
        .toString()
        .split("")
        .sort((a, b) => b - a)
        .join("")
    )
  ) {
    return result;
  }
  const arrOfDigits = num.toString().split("").map(Number);
  let nextRightDigit;

  for (let i = arrOfDigits.length - 1; i >= 0; i--) {
    if (nextRightDigit > arrOfDigits[i]) {
      const leadingDigits = [...arrOfDigits].slice(0, i);
      let pivotDigit = arrOfDigits[i];
      let trailingDigits = [...arrOfDigits].slice(i + 1);
      let smallestLargerThanPivot = Math.min(
        ...[...trailingDigits].filter((val) => val > pivotDigit)
      );
      let indexOfSmallestLarger = trailingDigits.indexOf(smallestLargerThanPivot);
      let newTrailingDigits = trailingDigits
        .filter((_, idx) => idx !== indexOfSmallestLarger)
        .concat(pivotDigit)
        .sort((a, b) => a - b);

      result = Number(leadingDigits.concat(smallestLargerThanPivot, newTrailDigits).join(""));
      break;
    }

    nextRightDigit = arrOfDigits[i];
  }
  return result;
}

function nextBigger(num) {
  const digits = num.toString().split("").map(Number);
  if (digits.join("") === [...digits].sort((a, b) => b - a).join("")) return -1;

  for (let i = digits.length - 2; i >= 0; i--) {
    const pivot = digits[i];
    const trailingDigits = digits.slice(i + 1);

    const larger = trailingDigits.filter((digit) => digit > pivot);
    if (larger.length === 0) continue;

    const swapCandidate = Math.min(...larger);
    const swapIndex = trailingDigits.indexOf(swapCandidate);

    const newTrailingDigits = [...trailingDigits];
    newTrailingDigits.splice(swapIndex, 1);
    newTrailingDigits.push(pivot);
    newTrailingDigits.sort((a, b) => a - b);

    const resultDigits = digits.slice(0, i).concat(swapCandidate, newTrailingDigits);
    return Number(resultDigits.join(""));
  }

  return -1;
}
