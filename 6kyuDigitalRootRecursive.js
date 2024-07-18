function digitalRoot(n) {
  return n < 10 ? n : digitalRoot(n.toString().split("").reduce((acc, d) => acc + +d, 0))
}
