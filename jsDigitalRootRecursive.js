function digitalRoot(n) {
  const accReducer = (accumulator, currentVal) => accumulator + parseInt(currentVal)
  return n < 10 ? n : digitalRoot(n.toString().split("").reduce(accReducer, 0));
}
