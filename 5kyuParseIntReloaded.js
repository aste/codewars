const num = {
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
};

const mag = {
  hundred: 100,
  thousand: 1000,
  million: 1000000,
  billion: 1000000000,
  trillion: 1000000000000,
  quadrillion: 1000000000000000,
  quintillion: 1000000000000000000,
  sextillion: 1000000000000000000000,
  septillion: 1000000000000000000000000,
  octillion: 1000000000000000000000000000,
  nonillion: 1000000000000000000000000000000,
  decillion: 1000000000000000000000000000000000,
  undecillion: 1000000000000000000000000000000000000,
  duodecillion: 1000000000000000000000000000000000000000,
  tredecillion: 1000000000000000000000000000000000000000000,
  quattuordecillion: 1000000000000000000000000000000000000000000000,
  quindecillion: 1000000000000000000000000000000000000000000000000,
  sexdecillion: 1000000000000000000000000000000000000000000000000000,
  septendecillion: 1000000000000000000000000000000000000000000000000000000,
  octodecillion: 1000000000000000000000000000000000000000000000000000000000,
  novemdecillion: 1000000000000000000000000000000000000000000000000000000000000,
  vigintillion: 1000000000000000000000000000000000000000000000000000000000000000,
};

function parseInt(string) {
  return string.split(/ |-/).reduce((acc, curVal) => {
    if (num[curVal]) acc += num[curVal];
    if (mag[curVal]) acc += mag[curVal] * (acc % mag[curVal]) - (acc % mag[curVal]);
    return acc;
  }, 0);
}
