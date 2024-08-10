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