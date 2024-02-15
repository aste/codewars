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
  console.log(`bits input is ${bits}`);
  // Accept 0's and 1's, return morse code in dots, dashes and wordBreaks
  bits = bits.replace(/^0+|0+$/g, "");
  console.log(`bits without zeros is ${bits}`);

  const baseLength = bits
    .match(/0+|1+/g)
    .sort((a, b) => a.length - b.length)
    .filter(Boolean)[0].length;

  console.log(`baselength is ${baseLength}`);

  const wordBreak = new RegExp("0".repeat(baseLength * 7), "g");
  const charBreak = new RegExp("0".repeat(baseLength * 3), "g");
  const dash = new RegExp("1".repeat(baseLength * 3), "g");
  const dot = new RegExp("1".repeat(baseLength), "g");
  const signBreak = new RegExp("0".repeat(baseLength), "g");

  const result = bits
    .replace(wordBreak, "  ")
    .replace(charBreak, " ")
    .replace(dash, "-")
    .replace(dot, ".")
    .replace(signBreak, "");

  console.log(`bits is ${bits}`);
  console.log(`result is ${result}`);

  return result;
};

const decodeMorse = function (morseCode) {
  // Accept morse code, return human readable text
  console.log(`morseCode input is ${morseCode}`);

  const result = morseCode
    .split("  ")
    .map((word) =>
      word
        .split(" ")
        .map((char) => MORSE_CODE[char])
        .join("")
    )
    .join(" ");

  console.log(`result is ${result}`);
  return result;
};

decodeMorse(
  decodeBits(
    "110011001100110000001100000011111100110011111100111111000000000000001100111111001111110011111100000011001100111111000000111111001100110000001100000000000000000000000000000000"
  )
);
console.log("HEY JUDE");
console.log("");

decodeMorse(decodeBits("10001"));
console.log("EE");
console.log("");

decodeMorse(decodeBits("11"));
console.log("E");
console.log("");
