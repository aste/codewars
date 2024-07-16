function hand(holeCards, communityCards) {
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

  const fullFlushHand = (sortedHandArrOfObj) => {
    const potentialFlushArr = [...sortedHandArrOfObj];
    if (potentialFlushArr.length === 0) {
      return [];
    }
    const suitCount = {};
    let flushSuit;

    potentialFlushArr.forEach((card) => {
      suitCount[card.suit] ? suitCount[card.suit]++ : (suitCount[card.suit] = 1);
    });

    for (const [key, value] of Object.entries(suitCount)) {
      if (value >= 5) {
        flushSuit = key;
      }
    }

    if (potentialFlushArr.length < 5) {
      potentialFlushArr = [];
    }

    return potentialFlushArr.filter((card) => card.suit === flushSuit);
  };

  const highestStraightHand = (sortedHandArrOfObj) => {
    const potentialStraightArr = [...sortedHandArrOfObj];
    if (potentialStraightArr.length === 0) {
      return [];
    }
    let straightArr = [];
    let prevCardRank = potentialStraightArr[0].rank + 1;

    for (let i = 0; i < potentialStraightArr.length; i++) {
      if (potentialStraightArr[i].rank === prevCardRank - 1) {
        straightArr.push(potentialStraightArr[i]);
        prevCardRank = potentialStraightArr[i].rank;
        if (straightArr.length === 5) {
          break;
        }
      } else if (potentialStraightArr[i] === prevCardRank) {
        continue;
      } else {
        straightArr = [];
        prevCardRank = potentialStraightArr[i].rank;
      }
    }

    if (straightArr.length < 5) {
      straightArr = [];
    }

    return straightArr;
  };

  const bestComboHand = (sortedHandArrOfObj) => {
    const bestComboArr = [...sortedHandArrOfObj];
    if (bestComboArr.length === 0) {
      return;
    }

    const rankFrequency = bestComboArr.reduce((acc, card) => {
      acc[card.rank] = (acc[card.rank] || 0) + 1;
      return acc;
    }, {});

    bestComboArr.sort((a, b) => {
      if (rankFrequency[b.rank] !== rankFrequency[a.rank]) {
        return rankFrequency[b.rank] - rankFrequency[a.rank];
      }

      return b.rank - a.rank;
    });

    return bestComboArr.slice(0, 5);
  };

  const reformatWinRankArr = (winningArr) => {
    const reformatWinningArr = winningArr.map((card) => {
      if (card === 14) {
        return "A";
      } else if (card === 13) {
        return "K";
      } else if (card === 12) {
        return "Q";
      } else if (card === 11) {
        return "J";
      } else {
        return card.toString();
      }
    });
    return reformatWinningArr;
  };

  const fullHandArr = holeCards.concat(communityCards);
  const currentHandSortedArrOfObj = remapRankToSortedValues(fullHandArr);

  // Straight-Flush
  const flushArr = fullFlushHand(currentHandSortedArrOfObj);
  const straightFlushArr = highestStraightHand(flushArr);

  if (straightFlushArr.length === 5) {
    return {
      type: "straight-flush",
      ranks: reformatWinRankArr(straightFlushArr.map((card) => card.rank)),
    };
  }

  const bestHandArr = bestComboHand(currentHandSortedArrOfObj);
  // Four-of-a-kind
  if (
    bestHandArr[0].rank === bestHandArr[1].rank &&
    bestHandArr[1].rank === bestHandArr[2].rank &&
    bestHandArr[2].rank === bestHandArr[3].rank
  ) {
    return {
      type: "four-of-a-kind",
      ranks: reformatWinRankArr([bestHandArr[0].rank, bestHandArr[4].rank]),
    };
  }

  // Full house
  if (
    bestHandArr[0].rank === bestHandArr[1].rank &&
    bestHandArr[1].rank === bestHandArr[2].rank &&
    bestHandArr[3].rank === bestHandArr[4].rank
  ) {
    return {
      type: "full house",
      ranks: reformatWinRankArr([bestHandArr[0].rank, bestHandArr[4].rank]),
    };
  }

  // Flush
  if (flushArr.length >= 5) {
    return {
      type: "flush",
      ranks: reformatWinRankArr(flushArr.map((card) => card.rank).slice(0, 5)),
    };
  }

  // Straight
  const straightHand = highestStraightHand(currentHandSortedArrOfObj);

  if (straightHand.length === 5) {
    return {
      type: "straight",
      ranks: reformatWinRankArr(straightHand.map((card) => card.rank)),
    };
  }

  // Three-of-a-kind
  if (bestHandArr[0].rank === bestHandArr[1].rank && bestHandArr[1].rank === bestHandArr[2].rank) {
    return {
      type: "three-of-a-kind",
      ranks: reformatWinRankArr([bestHandArr[0].rank, bestHandArr[3].rank, bestHandArr[4].rank]),
    };
  }
  // Two pair
  if (bestHandArr[0].rank === bestHandArr[1].rank && bestHandArr[2].rank === bestHandArr[3].rank) {
    return {
      type: "two pair",
      ranks: reformatWinRankArr([bestHandArr[0].rank, bestHandArr[2].rank, bestHandArr[4].rank]),
    };
  }
  // Pair
  if (bestHandArr[0].rank === bestHandArr[1].rank) {
    return {
      type: "pair",
      ranks: reformatWinRankArr([
        bestHandArr[0].rank,
        bestHandArr[1].rank,
        bestHandArr[2].rank,
        bestHandArr[3].rank,
        bestHandArr[4].rank,
      ]),
    };
  }

  // Nothing
  return {
    type: "nothing",
    ranks: reformatWinRankArr([
      bestHandArr[0].rank,
      bestHandArr[1].rank,
      bestHandArr[2].rank,
      bestHandArr[3].rank,
      bestHandArr[4].rank,
    ]),
  };
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
