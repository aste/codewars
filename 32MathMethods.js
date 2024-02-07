function roundIt(n) {
  let [a, b] = n.toString().split(".");
  return a.length > b.length ? Math.floor(n) : a.length === b.length ? Math.round(n) : Math.ceil(n);
}
