function splitAndMerge(string, separator) {
  let arrOfWords = string.split(" ");

  arrOfWords.forEach((word, index, arr) => (arr[index] = word.split("").join(separator)));

  return arrOfWords.join(" ");
}
