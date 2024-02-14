const decodeBits = function (bits) {
  // Accept 0's and 1's, return morse code in dots, dashes and spaces
  const baseLength = bits.replace(/^0+|0+$/g, '').match(/0+|1+/g).sort().filter(Boolean)[0].length;

  // const baseLength = bits.split("/0+|1+/").sort().filter(Boolean)[0].length;
  // const trimmedBits = bits.replace(/^0+|0+$/g, "");
  // const bitsArray = trimmedBits.split(/0+|1+/);
  // const baseLength = Math.min(...bitsArray.filter(Boolean).map((seq) => seq.length));

  const space = new RegExp("0".repeat(baseLength * 7), "g");
  const charBreak = new RegExp("0".repeat(baseLength * 3), "g");
  const dash = new RegExp("1".repeat(baseLength * 3), "g");
  const dot = new RegExp("1".repeat(baseLength), "g");
  const signBreak = new RegExp("0".repeat(baseLength), "g");

  return bits
    .replace(space, "  ")
    .replace(charBreak, " ")
    .replace(dash, "-")
    .replace(dot, ".")
    .replace(signBreak, "");
};

const decodeMorse = function (morseCode) {
  // Accept morse code, return human readable text
  return morseCode
    .split("  ")
    .map((word) =>
      word
        .split(" ")
        .map((letter) => MORSE_CODE[letter])
        .join("")
    )
    .join(" ");
};
