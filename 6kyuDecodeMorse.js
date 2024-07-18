decodeMorse = function (morseCode) {
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
