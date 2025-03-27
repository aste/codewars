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
  const arrOfDigits = num.toString().split("").map(Number);
  let previousDigit;
  let result = -1;

  for (let i = arrOfDigits.length - 1; i >= 0; i--) {

    if (previousDigit > arrOfDigits[i]) {
      const leadingDigits = arrOfDigits.slice(0, i);
      let pivotDigit = arrOfDigits[i];
      let trailingDigits = arrOfDigits.slice(i + 1);
      let smallestLargerThanPivot = Math.min(...[...trailingDigits].filter((val) => val > pivotDigit));
      let newPivot = trailingDigits.splice(trailingDigits.indexOf(smallestLargerThanPivot), 1);

      leadingDigits.push(smallestLargerThanPivot);
      trailingDigits.push(pivotDigit);
      trailingDigits.sort((a, b) => a - b);

      result = Number(leadingDigits.concat(trailingDigits).join(""));
      break;
    }

    previousDigit = arrOfDigits[i];
  }
  return result;
}