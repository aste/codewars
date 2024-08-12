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
