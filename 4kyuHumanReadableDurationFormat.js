function formatDuration(inputSec) {
  const durationsInSec = [31536000, 86400, 3600, 60, 1];
  const durationNames = ["year", "day", "hour", "minute", "second"];
  let remainingSec = inputSec;
  let durationString = "";
  if (inputSec === 0) {
    return "now";
  }

  for (let i = 0; i < durationsInSec.length; i++) {
    console.log(`i: ${i}`);
    console.log(`durationsInSec[i]: ${durationsInSec[i]}`);
    console.log(`remainingSec before: ${remainingSec} seconds`);

    if (durationsInSec[i] <= remainingSec) {
      let totalUnits = Math.floor(remainingSec / durationsInSec[i]);
      let pluralMorpheme = totalUnits > 1 ? "s" : "";
      remainingSec = remainingSec - totalUnits * durationsInSec[i];

      console.log(`Total units in this iteration: ${totalUnits} ${durationNames[i]}`);

      let serialSign = "";

      if (durationString.length === 0) {
        serialSign = "";
      } else if (i === durationsInSec.length - 1 || remainingSec === 0) {
        serialSign = " and ";
      } else {
        serialSign = ", ";
      }
      durationString += `${serialSign}${totalUnits} ${durationNames[i]}${pluralMorpheme}`;

      console.log(`${totalUnits} ${durationNames[i]}${pluralMorpheme}${serialSign}`);
      console.log(`remainingSec after: ${remainingSec}`);
      console.log(`durationString of this iteration: ${durationString}`);
      console.log("-------------------------------------------------------");
      console.log("");
    }
  }

  return durationString;
}

console.log("***********************************************");
console.log(formatDuration(1));
console.log("1 second");
console.log("***********************************************");
console.log("");
console.log("");
console.log("***********************************************");
console.log(formatDuration(62));
console.log("1 minute and 2 seconds");
console.log("***********************************************");
console.log("");
console.log("");
console.log("***********************************************");
console.log(formatDuration(120));
console.log("2 minutes");
console.log("***********************************************");
console.log("");
console.log("");
console.log("***********************************************");
console.log(formatDuration(3600));
console.log("1 hour");
console.log("***********************************************");
console.log("");
console.log("");
console.log("***********************************************");
console.log(formatDuration(3662));
console.log("1 hour, 1 minute and 2 seconds");
console.log("***********************************************");
console.log("");
console.log("");
console.log("***********************************************");
console.log(formatDuration(5527800));
console.log("63 days, 23 hours and 30 minutes");
console.log("***********************************************");
console.log("");
console.log("");
console.log(formatDuration(716413));
console.log("8 days, 7 hours and 13 seconds");
console.log("***********************************************");
console.log("");
console.log("");
