function encodeRailFenceCipher(string, numberRails) {
  if (string === "") return "";
  const railsOfStrings = [];
  const stringTokens = string.split("");
  const switchInterval = numberRails - 1;
  let yCoordinate = 0;
  let yDirection = 1;

  for (let i = 0; i < numberRails; i++) railsOfStrings.push([]);

  for (let i = 0; i < stringTokens.length; i++) {
    if (i % switchInterval === 0 && i !== 0) yDirection *= -1;

    for (let j = 0; j < numberRails; j++) {
      if (j === yCoordinate) {
        railsOfStrings[j].push(stringTokens[i]);
      } else {
        railsOfStrings[j].push("*");
      }
    }

    yCoordinate += yDirection;
  }

  return railsOfStrings
    .flat()
    .filter((char) => char !== "*")
    .join("");
}

function decodeRailFenceCipher(string, numberRails) {
  if (string === "") return "";
  const railsOfStrings = [];
  const decipheredSequence = [];
  const stringTokens = string.split("");
  const switchInterval = numberRails - 1;
  let yCoordinate = 0;
  let yDirection = 1;

  for (let i = 0; i < numberRails; i++) railsOfStrings.push([]);

  for (let i = 0; i < stringTokens.length; i++) {
    if (i % switchInterval === 0 && i !== 0) yDirection *= -1;

    for (let j = 0; j < numberRails; j++) {
      if (j === yCoordinate) {
        railsOfStrings[j].push("*");
      } else {
        railsOfStrings[j].push("");
      }
    }

    yCoordinate += yDirection;
  }

  let strTokenIterator = 0;

  for (let i = 0; i < railsOfStrings.length; i++) {
    let currentRail = railsOfStrings[i];

    for (let j = 0; j < currentRail.length; j++) {
      if (currentRail[j] === "*") {
        decipheredSequence[j] = stringTokens[strTokenIterator];
        strTokenIterator += 1;
      }
    }
  }

  return decipheredSequence.join("");
}

function calRank() {
  let currentRank = 1085;
  let newRank = 1117;
  let currentProgress = 0.086;
  let newProgress = 0.135;
  let totalRankPoint

}

// DESCRIPTION:
// Create two functions to encode and then decode a string using the Rail Fence Cipher. This cipher is used to encode a string by placing each character successively in a diagonal along a set of "rails". First start off moving diagonally and down. When you reach the bottom, reverse yDirection and move diagonally and up until you reach the top rail. Continue until you reach the end of the string. Each "rail" is then read left to right to derive the encoded string.

// For example, the string "WEAREDISCOVEREDFLEEATONCE" could be represented in a three rail system as follows:

//W       E       C       R       L       T       E
//  E   R   D   S   O   E   E   F   E   A   O   C
//    A       I       V       D       E       N

// The encoded string would be:

// WECRLTEERDSOEEFEAOCAIVDEN

// Write a function/method that takes 2 arguments, a string and the number of rails, and returns the ENCODED string.

// Write a second function/method that takes 2 arguments, an encoded string and the number of rails, and returns the DECODED string.

// For both encoding and decoding, assume number of rails >= 2 and that passing an empty string will return an empty string.

// Note that the example above excludes the punctuation and spaces just for simplicity. There are, however, tests that include punctuation. Don't filter out punctuation as they are a part of the string.

// console.log('encodeRailFenceCipher("WEAREDISCOVEREDFLEEATONCE", 3);');
// console.log("Should give:");
// console.log("WECRLTEERDSOEEFEAOCAIVDEN");
// console.log("");
// console.log("It gives:");
// console.log(encodeRailFenceCipher("WEAREDISCOVEREDFLEEATONCE", 3));
// console.log("--------------------------------------------------------");

console.log('decodeRailFenceCipher("WECRLTEERDSOEEFEAOCAIVDEN", 3);');
console.log("Should give:");
console.log("WEAREDISCOVEREDFLEEATONCE");
console.log("");
console.log("It gives:");
decodeRailFenceCipher("WECRLTEERDSOEEFEAOCAIVDEN", 3);
console.log("--------------------------------------------------------");

// console.log('encodeRailFenceCipher("Hello, World!", 3);');
// console.log("Should give:");
// console.log("Hoo!el,Wrdl l");
// console.log("");
// console.log("It gives:");
// console.log(encodeRailFenceCipher("Hello, World!", 3));
// console.log("--------------------------------------------------------");
