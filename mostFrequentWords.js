function topThreeWords(text) {
  const wordCountObj = {};

  text
    .toLowerCase()
    .split(/[^\w']/g)
    .filter(n => (n && n != "'"))
    .forEach((word) => (wordCountObj[word] = (wordCountObj[word] || 0) + 1));

  const top3 = Object.entries(wordCountObj)
    .sort((a, b) => b[1] - a[1])
    .map((arrElement) => arrElement[0])
    .slice(0, 3);

  return top3;
}