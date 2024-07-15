function hand(holeCards, communityCards) {
  const bestPossibleHand = { type: "nothing", ranks: [] };

  const fullHand = holeCards.concat(communityCards);

  const remapRankToSortedValues = (hand) => {
    const arrOfHandObjects = [];

    hand.forEach((handStr) => {
      let rankStr = handStr.slice(0, -1);
      let suitStr = handStr.slice(-1);

      let rank;
      if (rankStr === "A") {
        rank = 14;
      } else if (rankStr === "K") {
        rank = 13;
      } else if (rankStr === "Q") {
        rank = 12;
      } else if (rankStr === "J") {
        rank = 11;
      } else {
        rank = parseInt(rankStr);
      }

      const handObj = { rank: rank, suit: suitStr };

      arrOfHandObjects.push(handObj);
    });

    return arrOfHandObjects.sort((a, b) => b.rank - a.rank);
  };

  const currentHand = remapRankToSortedValues(fullHand);


  const fullFlushHand = (currentHand) => {
    const count = {};
  };

  const straightHand = () => {
    const count = {};
  };

  const rankCheck = () => {};

  let flush;
  let quads;
  let trips;
  let straight;
  let pair;

  // Straight-flush           (Straight && Flush)   + [Rank]

  // Four-of-a-kind           (Quads)               + [Rank]
  // Full house               (Trips & Pair)        + [Rank]

  // Flush                    (Flush)               + [Rank]

  // Straight                 (Straight)            + [Rank]
  // Three-of-a-kind          (Trips)               + [Rank]
  // Two pair                 (Pair & Pair)         + [Rank]
  // Pair                     (Pair)                + [Rank]
  // Nothing                  (Nothing)             + [Rank]

  return bestPossibleHand
  //   return { type: "nothing", ranks: [] };
}

// Hands in descending order of value

// Given hole cards and community cards, complete the function hand to return the type of hand (as written above, you can ignore case) and a list of ranks in decreasing order of significance, to use for comparison against other hands of the same type, of the best possible hand.

// console.log('{ type: "nothing", ranks: ["14", "13", "12", "11", "9"] }');
// console.log(hand(["13♠", "14♦"], ["11♣", "12♥", "9♥", "2♥", "3♦"]));
// console.log("");

console.log('{ type: "nothing", ranks: ["A", "K", "Q", "J", "9"] }');
console.log(hand(["K♠", "A♦"], ["J♣", "Q♥", "9♥", "2♥", "3♦"]));
console.log("");

console.log('{ type: "pair", ranks: ["Q", "K", "J", "9"] }');
console.log(hand(["K♠", "Q♦"], ["J♣", "Q♥", "9♥", "2♥", "3♦"]));
console.log("");

console.log('{ type: "two pair", ranks: ["K", "J", "9"] }');
console.log(hand(["K♠", "J♦"], ["J♣", "K♥", "9♥", "2♥", "3♦"]));
console.log("");

console.log('{ type: "three-of-a-kind", ranks: ["Q", "J", "9"] }');
console.log(hand(["4♠", "9♦"], ["J♣", "Q♥", "Q♠", "2♥", "Q♦"]));
console.log("");

console.log('{ type: "straight", ranks: ["K", "Q", "J", "10", "9"] }');
console.log(hand(["Q♠", "2♦"], ["J♣", "10♥", "9♥", "K♥", "3♦"]));
console.log("");

console.log('{ type: "flush", ranks: ["Q", "J", "10", "5", "3"] }');
console.log(hand(["A♠", "K♦"], ["J♥", "5♥", "10♥", "Q♥", "3♥"]));
console.log("");

console.log('{ type: "full house", ranks: ["A", "K"] }');
console.log(hand(["A♠", "A♦"], ["K♣", "K♥", "A♥", "Q♥", "3♦"]));
console.log("");

console.log('{ type: "four-of-a-kind", ranks: ["2", "3"] }');
console.log(hand(["2♠", "3♦"], ["2♣", "2♥", "3♠", "3♥", "2♦"]));
console.log("");

console.log('{ type: "straight-flush", ranks: ["J", "10", "9", "8", "7"] }');
console.log(hand(["8♠", "6♠"], ["7♠", "5♠", "9♠", "J♠", "10♠"]));
console.log("");
