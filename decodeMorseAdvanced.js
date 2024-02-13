const decodeMorse = function (morseCode) {
  return morseCode
    .trim()
    .split("  ")
    .map((word) =>
      word
        .split(" ")
        .map((letter) => MORSE_CODE[letter])
        .join("")
    )
    .join(" ");
};

// morseCodes(".--")

const decodeBits = function (bits) {
  // ToDo: Accept 0's and 1's, return dots, dashes and spaces
  return bits.replace("111", "-").replace("000", " ").replace("1", ".").replace("0", "");
};

const decodeMorse = function (morseCode) {
  // ToDo: Accept dots, dashes and spaces, return human-readable message
  return morseCode.replace(".", MORSE_CODE["."]).replace("-", MORSE_CODE["-"]).replace(" ", "");
};

console.log(
  decodeBits(
    "1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011"
  )
);

// console.log(
//   decodeMorse(
//     decodeBits(
//       "1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011"
//     )
//   )
// );

console.log(
  decodeMorse(
    decodeBits(
      "1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011"
    )
  )
);
console.log("HEY JUDE");
