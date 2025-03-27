// Description:
// Create a function that takes a positive integer and returns the next bigger number that can be formed by rearranging its digits. For example:

//   12 ==> 21
//  513 ==> 531
// 2017 ==> 2071
// If the digits can't be rearranged to form a bigger number, return -1 (or nil in Swift, None in Rust):

//   9 ==> -1
// 111 ==> -1
// 531 ==> -1

function nextLargerNum(num) {
  const arrayOfNumDigits = num.toString().split("");
  const maxNum = Number(arrayOfNumDigits.sort((a, b) => b - a).join(""));

  if ((num = maxNum)) {
    return -1;
  } else {
    
    for (let i = arrayOfNumDigits.length - 1; i < 0; i--) {
        arrayOfNumDigits
    }
  }
}
