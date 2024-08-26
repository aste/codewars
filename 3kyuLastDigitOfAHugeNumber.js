function lastDigit(as) {}

// For a given list [x1, x2, x3, ..., xn] compute the last (decimal) digit of x1 ^ (x2 ^ (x3 ^ (... ^ xn))).

// E. g., with the input [3, 4, 2], your code should return 1 because 3 ^ (4 ^ 2) = 3 ^ 16 = 43046721.

// Beware: powers grow incredibly fast. For example, 9 ^ (9 ^ 9) has more than 369 millions of digits. lastDigit has to deal with such numbers efficiently.

// Corner cases: we assume that 0 ^ 0 = 1 and that lastDigit of an empty list equals to 1.

// This kata generalizes Last digit of a large number; you may find useful to solve it beforehand.

console.log(lastDigit([]));
console.log(1);
console.log("");
console.log(lastDigit([0, 0]));
console.log(1);
console.log("");
console.log(lastDigit([0, 0, 0]));
console.log(0);
console.log("");
console.log(lastDigit([1, 2]));
console.log(1);
console.log("");
console.log(lastDigit([3, 4, 5]));
console.log(1);
console.log("");
console.log(lastDigit([4, 3, 6]));
console.log(4);
console.log("");
console.log(lastDigit([7, 6, 21]));
console.log(1);
console.log("");
console.log(lastDigit([12, 30, 21]));
console.log(6);
console.log("");
console.log(lastDigit([2, 2, 2, 0]));
console.log(4);
console.log("");
console.log(lastDigit([937640, 767456, 981242]));
console.log(0);
console.log("");
console.log(lastDigit([123232, 694022, 140249]));
console.log(6);
console.log("");
console.log(lastDigit([499942, 898102, 846073]));
console.log(6);
