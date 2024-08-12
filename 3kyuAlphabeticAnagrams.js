function factorial(num) {
  if (num <= 1) return 1;
  return num * factorial(num - 1);
}

// Compute the alphabetical rank of the word among all possible permutations of its letters
function listPosition(word) {
  if (word.length === 1) return 1;
  const uniqueLetters = Array.from(new Set(word)).sort();
  const letterFrequencies = uniqueLetters.map((letter) => word.split(letter).length - 1);
  const totalPermutations =
    factorial(word.length) / letterFrequencies.reduce((acc, curVal) => acc * factorial(curVal), 1);

  // Compute how many permutations exist before any permutations that start with each unique letter
  let cumulativePermutationRanks = [0];
  for (let i = 0; i < letterFrequencies.length - 1; i++) {
    cumulativePermutationRanks.push((letterFrequencies[i] * totalPermutations) / word.length);
  }

  // Convert the individual permutation counts into cumulative counts
  for (let i = 1; i < cumulativePermutationRanks.length; i++) {
    cumulativePermutationRanks[i] += cumulativePermutationRanks[i - 1];
  }

  // Find the index of the first letter in 'word' in the sorted array of unique letters
  const firstLetterRankIndex = uniqueLetters.indexOf(word[0]);

  // Get the current letter's cumulative rank and recursively add the ranks of the remaining string
  return cumulativePermutationRanks[firstLetterRankIndex] + listPosition(word.slice(1));
}

// DESCRIPTION:
// Consider a "word" as any sequence of capital letters A-Z (not limited to just "dictionary words"). For any word with at least two different letters, there are other words composed of the same letters but in a different order (for instance, STATIONARILY/ANTIROYALIST, which happen to both be dictionary words; for our purposes "AAIILNORSTTY" is also a "word" composed of the same letters as these two).

// We can then assign a number to every word, based on where it falls in an alphabetically sorted list of all words made up of the same group of letters. One way to do this would be to generate the entire list of words and find the desired one, but this would be slow if the word is long.

// Given a word, return its number. Your function should be able to accept any word 25 letters or less in length (possibly with some letters repeated), and take no more than 500 milliseconds to run. To compare, when the solution code runs the 27 test cases in JS, it takes 101ms.

// For very large words, you'll run into number precision issues in JS (if the word's position is greater than 2^53). For the JS tests with large positions, there's some leeway (.000000001%). If you feel like you're getting it right for the smaller ranks, and only failing by rounding on the larger, submit a couple more times and see if it takes.

// Python, Java and Haskell have arbitrary integer precision, so you must be precise in those languages (unless someone corrects me).

// C# is using a long, which may not have the best precision, but the tests are locked so we can't change it.

// Sample words, with their rank:
// ABAB = 2
// AAAB = 1
// BAAA = 4
// QUESTION = 24572
// BOOKKEEPER = 10743

console.log("// ABAB = 2, it gives:");
console.log(listPosition("ABAB"));
console.log("");

console.log("// AAAB = 1, it gives:");
console.log(listPosition("AAAB"));
console.log("");

console.log("// BAAA = 4, it gives:");
console.log(listPosition("BAAA"));
console.log("");

console.log("// QUESTION = 24572, it gives:");
console.log(listPosition("QUESTION"));
console.log("");

console.log("// BOOKKEEPER = 10743, it gives:");
console.log(listPosition("BOOKKEEPER"));
console.log("");
