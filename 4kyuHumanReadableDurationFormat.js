function formatDuration(inputSec) {
  const durationsInSec = [31536000, 86400, 3600, 60, 1];
  const durationNames = ["year", "day", "hour", "minute", "second"];
  
  let remainingSec = inputSec;
  let durationString = "";

  if (inputSec === 0) {
    return "now";
  }

  for (let i = 0; i < durationsInSec.length; i++) {
    if (durationsInSec[i] <= remainingSec) {
      let totalUnits = Math.floor(remainingSec / durationsInSec[i]);
      let pluralMorpheme = totalUnits > 1 ? "s" : "";
      let serialSign = "";

      remainingSec = remainingSec - totalUnits * durationsInSec[i];

      if (durationString.length === 0) {
        serialSign = "";
      } else if (i === durationsInSec.length - 1 || remainingSec === 0) {
        serialSign = " and ";
      } else {
        serialSign = ", ";
      }
      durationString += `${serialSign}${totalUnits} ${durationNames[i]}${pluralMorpheme}`;
    }
  }

  return durationString;
}
