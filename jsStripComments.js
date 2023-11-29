function solution(input, markers) {
  return input
    .split("\n")
    .map((line) => markers.reduce((line, marker) => line.split(marker)[0].trim(), line))
    .join("\n");
}
