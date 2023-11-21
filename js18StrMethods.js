function splitAndMerge(str, sep) {
  return str
    .split(" ")
    .map((word) => word.split("").join(sep))
    .join(" ");
}
