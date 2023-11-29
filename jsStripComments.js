function solution(input, markers) {
  let arrOfInput = input.match(/\w+|[^\w]/g);
  let stripArr = [];

  for (let i = 0; i < arrOfInput.length; i++) {
    if (markers.includes(arrOfInput[i])) {
      if (stripArr[i - 1] === " ") {
        stripArr.pop();
      }
      do {
        i++;
      } while (arrOfInput[i] !== "\n" && i < arrOfInput.length);
    }
    stripArr.push(arrOfInput[i]);
  }

  return stripArr.join("").trim();
}