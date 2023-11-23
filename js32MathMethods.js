function roundIt(n) {
  const digits = String(n).split(".");

  if (digits[0].length < digits[1].length) {
    return Math.ceil(n);
  } else if (digits[0].length > digits[1].length) {
    return Math.floor(n);
  } else {
    return Math.round(n);
  }
}

console.log(roundIt(3.45), 4);
console.log(roundIt(34.5), 34);
console.log(roundIt(34.56), 35);
