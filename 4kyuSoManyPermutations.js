function permutations(string) {
  if (string.length === 0) return [""];
  if (string.length === 1) return [string];

  const uniquePermutations = new Set();

  for (let i = 0; i < string.length; i++) {
    const currentLetter = string[i];
    const remainingLetters = string.slice(0, i) + string.slice(i + 1);
    const remainingLettersPermuted = permutations(remainingLetters);

    for (let permutedString of remainingLettersPermuted) {
      allPermutations.push(currentLetter + permutedString);
      uniquePermutations.add(currentLetter + permutedString);
    }
  }

  return Array.from(uniquePermutations);
}
