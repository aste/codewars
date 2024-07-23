function formatDuration(inputSec) {
  const durationsInSec = [31536000, 86400, 3600, 60, 1];
  const durationNames = ["year", "day", "hour", "minute", "second"];
  let remainingSec = inputSec;
  let durationString = "";

  for (let i = 0; i < durationsInSec.length; i++) {
    if (durationsInSec[i] <= remainingSec) {
      console.log(remainingSec);
      let totalUnits = Math.floor(remainingSec / durationsInSec[i]);
      let multiple = totalUnits > 1 ? "s" : "";
      let postFix = "";
      remainingSec = remainingSec - totalUnits * durationsInSec[i];
      if (i === durationsInSec.length - 2 && remainingSec != 0) {
        postFix = " and ";
      } else if (i <= durationsInSec.length - 2 && remainingSec != 0) {
        postFix = ", ";
      }
      durationString += `${totalUnits} ${durationNames[i]}${multiple}${postFix}`;
      console.log(remainingSec);
      console.log(durationString);
      console.log("");
    }
  }

  return durationString;
}

console.log(formatDuration(1));
console.log("1 second");
console.log("");
console.log(formatDuration(62));
console.log("1 minute and 2 seconds");
console.log("");
console.log(formatDuration(120));
console.log("2 minutes");
console.log("");
console.log(formatDuration(3600));
console.log("1 hour");
console.log("");
console.log(formatDuration(3662));
console.log("1 hour, 1 minute and 2 seconds");
console.log("");
console.log(formatDuration(5527800));
console.log("63 days, 23 hours and 30 minutes");
console.log("");
