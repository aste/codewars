export const transform = (oneToManyPointFormat) => {
  const oneToOnePointFormat = {};

  for (const [key, value] of Object.entries(oneToManyPointFormat)) {
    console.log("");

    for (let i = 0; i < value.length; i++) {
      oneToOnePointFormat[value[i].toLowerCase()] = parseInt(key, 10);
    }
  }

  return oneToOnePointFormat;
};
