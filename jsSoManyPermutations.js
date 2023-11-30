function permutations(string) {
  if (string.length === 0) return [""];
  if (string.length === 1) return [string];

  const uniquePermutations = new Set();

  // Iterate over each character in the string
  for (let i = 0; i < string.length; i++) {
    // Current character from which to create permutations
    const currentLetter = string[i];

    // The remaining characters without the current character
    const remainingLetters = string.slice(0, i) + string.slice(i + 1);

    // Call the permutations function recursively on the remaining characters
    const remainingLettersPermuted = permutations(remainingLetters);

    // Iterate over all permutation returned from the recursive call
    for (let permutedString of remainingLettersPermuted) {
      // Add the current char as the first character of each permutation, 
      // then add to the permutation the Set to exclude non-unique values
      allPermutations.push(currentLetter + permutedString);
      uniquePermutations.add(currentLetter + permutedString);
    }
  }

  return Array.from(uniquePermutations);
}

console.log(permutations("abba"));
