const MORSE_CODE = {
  ".-": "A",
  "-...": "B",
  "-.-.": "C",
  "-..": "D",
  ".": "E",
  "..-.": "F",
  "--.": "G",
  "....": "H",
  "..": "I",
  ".---": "J",
  "-.-": "K",
  ".-..": "L",
  "--": "M",
  "-.": "N",
  "---": "O",
  ".--.": "P",
  "--.-": "Q",
  ".-.": "R",
  "...": "S",
  "-": "T",
  "..-": "U",
  "...-": "V",
  ".--": "W",
  "-..-": "X",
  "-.--": "Y",
  "--..": "Z",
  "-----": "0",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
  ".-.-.-": ".",
  "--..--": ",",
  "..--..": "?",
  ".----.": "'",
  "-.-.--": "!",
  "-..-.": "/",
  "-.--.": "(",
  "-.--.-": ")",
  ".-...": "&",
  "---...": ":",
  "-.-.-.": ";",
  "-...-": "=",
  ".-.-.": "+",
  "-....-": "-",
  "..--.-": "_",
  ".-..-.": '"',
  "...-..-": "$",
  ".--.-.": "@",
};

const decodeBits = function (bits) {
  // Accept 0's and 1's, return morse code in dots, dashes and wordBreaks
  bits = bits.replace(/^0+|0+$/g, "");

  const baseLength = bits
    .match(/0+|1+/g)
    .sort((a, b) => a.length - b.length)
    .filter(Boolean)[0].length;

  const wordBreak = new RegExp("0".repeat(baseLength * 7), "g");
  const charBreak = new RegExp("0".repeat(baseLength * 3), "g");
  const dash = new RegExp("1".repeat(baseLength * 3), "g");
  const dot = new RegExp("1".repeat(baseLength), "g");
  const signBreak = new RegExp("0".repeat(baseLength), "g");

  return bits
    .replace(wordBreak, "  ")
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
        .map((char) => MORSE_CODE[char])
        .join("")
    )
    .join(" ");
};
