function fib(n) {
  const negativeFib = n < 0;
  const signBit = negativeFib && n % 2 === 0 ? BigInt(-1) : BigInt(1);
  const nAbsolute = Math.abs(n);

  function fibHelper(n) {
    if (n === 0) return [BigInt(0), BigInt(1)];

    const [a, b] = fibHelper(Math.floor(n / 2));
    const c = a * (BigInt(2) * b - a);
    const d = a * a + b * b;

    if (n % 2 === 0) {
      return [c, d];
    } else {
      return [d, c + d];
    }
  }

  const [result, _] = fibHelper(nAbsolute);
  return signBit * result;
}

// function fib(n) {
//   const negativeFib = n < 0 ? true : false;
//   const signBit = negativeFib && n % 2 === 0 ? BigInt(-1) : BigInt(1);
//   const nAbsolute = Math.abs(n);

//   let a = BigInt(0);
//   let b = BigInt(1);
//   let c = BigInt(1);

//   if (n === 0) return 0n;
//   if (nAbsolute === 1 || nAbsolute === 2) return signBit * c;

//   for (let i = 2; i <= nAbsolute; i++) {
//     c = a + b;
//     a = b;
//     b = c;
//   }

//   return signBit * c;
// }

// Recursive
// const fibonacci = (n) => {
//   if (n <= 1) {
//       return n
//   }
//   else {
//       return fibonacci(n-1) + fibonacci(n-2)
//   }
// }

// The year is 1214. One night, Pope Innocent III awakens to find the the archangel Gabriel floating before him. Gabriel thunders to the pope:

// Gather all of the learned men in Pisa, especially Leonardo Fibonacci. In order for the crusades in the holy lands to be successful, these men must calculate the millionth number in Fibonacci's recurrence. Fail to do this, and your armies will never reclaim the holy land. It is His will.

// The angel then vanishes in an explosion of white light.

// Pope Innocent III sits in his bed in awe. How much is a million? he thinks to himself. He never was very good at math.

// He tries writing the number down, but because everyone in Europe is still using Roman numerals at this moment in history, he cannot represent this number. If he only knew about the invention of zero, it might make this sort of thing easier.

// He decides to go back to bed. He consoles himself, The Lord would never challenge me thus; this must have been some deceit by the devil. A pretty horrendous nightmare, to be sure.

// Pope Innocent III's armies would go on to conquer Constantinople (now Istanbul), but they would never reclaim the holy land as he desired.

// In this kata you will have to calculate fib(n) where:

// fib(0) := 0
// fib(1) := 1
// fib(n + 2) := fib(n + 1) + fib(n)
// Write an algorithm that can handle n up to 2000000.

// Your algorithm must output the exact integer answer, to full precision. Also, it must correctly handle negative numbers as input.

// HINT I: Can you rearrange the equation fib(n + 2) = fib(n + 1) + fib(n) to find fib(n) if you already know fib(n + 1) and fib(n + 2)? Use this to reason what value fib has to have for negative values.

// HINT II: See https://web.archive.org/web/20220614001843/https://mitpress.mit.edu/sites/default/files/sicp/full-text/book/book-Z-H-11.html#%_sec_1.2.4

// const {assert} = require("chai");
// describe("The Millionth Fibonacci",()=>{
//   describe("example tests",()=>{
//     it("fib 0",()=>assert.strictEqual( fib(0), 0n ));
//     it("fib 1",()=>assert.strictEqual( fib(1), 1n ));
//     it("fib 2",()=>assert.strictEqual( fib(2), 1n ));
//     it("fib 3",()=>assert.strictEqual( fib(3), 2n ));
//     it("fib 4",()=>assert.strictEqual( fib(4), 3n ));
//     it("fib 5",()=>assert.strictEqual( fib(5), 5n ));
//     it("fib -6",()=>assert.strictEqual( fib(-6), -8n ));
//   });
// });

console.log("fib 0");
console.log(`Should give ${0n}`);
console.log(fib(0));
console.log("");

console.log("fib 1");
console.log(`Should give ${1n}`);
console.log(fib(1));
console.log("");

console.log("fib 2");
console.log(`Should give ${1n}`);
console.log(fib(2));
console.log("");

console.log("fib 3");
console.log(`Should give ${2n}`);
console.log(fib(3));
console.log("");

console.log("fib 4");
console.log(`Should give ${3n}`);
console.log(fib(4));
console.log("");

console.log("fib 5");
console.log(`Should give ${5n}`);
console.log(fib(5));
console.log("");

console.log("fib -6");
console.log(`Should give ${-8n}`);
console.log(fib(-6));
console.log("");

console.log("----------------------------------------------------------------");
