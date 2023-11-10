function countSmileys(arr) {
  const regexSmiley = /(:|;)(-|~)?(\)|D)/g;

  return arr.filter((element) => element.match(regexSmiley)).length;
}
