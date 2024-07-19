const pigIt = (str) => {
  let pigStr = str
    .split(" ")
    .map((el) => {
      if (/^[^.,!?;:'"(){}\[\]<>-]*$/.test(el)) {
        return el.slice(1) + el.slice(0, 1) + "ay";
      } else {
        return el;
      }
    })
    .join(" ");
  return pigStr;
};

console.log(pigIt("Pig latin is cool"), "igPay atinlay siay oolcay !");
console.log(pigIt("This is my string"), "hisTay siay ymay tringsay !");
