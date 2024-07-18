function mix(s1, s2) {
  const s1LowercaseOnly = s1.replace(/[^a-z]/g, "");
  const s2LowercaseOnly = s2.replace(/[^a-z]/g, "");

  const s1Letters = {};
  const s2Letters = {};

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const mixResult = [];

  s1LowercaseOnly.split("").forEach((el) => (s1Letters[el] = (s1Letters[el] || "") + el));
  s2LowercaseOnly.split("").forEach((el) => (s2Letters[el] = (s2Letters[el] || "") + el));

  for (let char of alphabet) {
    if (s1Letters[char] && s2Letters[char]) {
      if (s1Letters[char].length === s2Letters[char].length) {
        mixResult.push(`3:${s2Letters[char]}`);
      } else if (s1Letters[char].length > s2Letters[char].length) {
        mixResult.push(`1:${s1Letters[char]}`);
      } else {
        mixResult.push(`2:${s2Letters[char]}`);
      }
    } else if (s1Letters[char]) {
      mixResult.push(`1:${s1Letters[char]}`);
    } else if (s2Letters[char]) {
      mixResult.push(`2:${s2Letters[char]}`);
    }
  }

  mixResult.sort((a, b) => b.length - a.length || a.localeCompare(b));

  return mixResult.filter((el) => el.length > 3).map(el => el.replace("3", '=')).join("/");
}