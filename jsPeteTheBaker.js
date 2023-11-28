let recipe = { flour: 500, sugar: 200, eggs: 1 };
let available = { flour: 1200, sugar: 1200, eggs: 5, milk: 200 };

function cakes(recipe, available) {
  let maxCakes = Infinity;

  for (const ingredient in recipe) {
    if (available[ingredient]) {
      let cakeNum = Math.floor(available[ingredient] / recipe[ingredient]);
      if (cakeNum < maxCakes) {
        maxCakes = cakeNum;
      }
    } else {
      maxCakes = 0;
      break;
    }
  }

  return maxCakes;
}
