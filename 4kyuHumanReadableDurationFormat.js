function formatDuration(inputSec) {
  if (inputSec === 0) {
    return "now";
  }

  const durationsInSec = [31536000, 86400, 3600, 60, 1];
  const durationNames = ["year", "day", "hour", "minute", "second"];

  let remainingSec = inputSec;
  const strParts = [];

  for (let i = 0; i < durationsInSec.length; i++) {
    const totalUnits = Math.floor(remainingSec / durationsInSec[i]);
    if (totalUnits > 0) {
      remainingSec -= totalUnits * durationsInSec[i];
      const pluralMorpheme = totalUnits > 1 ? "s" : "";
      strParts.push(`${totalUnits} ${durationNames[i]}${pluralMorpheme}`);
    }
  }

  const lastPart = strParts.pop();
  if (strParts.length === 0) {
    return lastPart;
  }

  return strParts.join(", ") + " and " + lastPart;
}
