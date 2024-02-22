function mix(s1, s2) {
  const s1LowercaseOnly = s1.replace(/[^a-z]/g, "");
  const s2LowercaseOnly = s2.replace(/[^a-z]/g, "");
  const letterCount = {};

  s1LowercaseOnly.split("").forEach((el) => (letterCount[el] = (letterCount[el] || 0) + 1));
  s2LowercaseOnly.split("").forEach((el) => (letterCount[el] = (letterCount[el] || 0) - 1));

  console.log(letterCount);
}

let s1 = "A aaaa bb c";
let s2 = "& aaa bbb c d";

mix(s1, s2);
