function solution(list) {
  let solutionArr = [];
  let indices = [];

  function pushSegmentToSolutionArr() {
    if (indices.length >= 3) {
      solutionArr.push(`${list[indices[0]]}-${list[indices[indices.length - 1]]}`);
    } else {
      indices.forEach((index) => solutionArr.push(list[index]));
    }
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i] === list[i - 1] + 1 || i === 0) {
      indices.push(i);
    } else {
      pushSegmentToSolutionArr();
      indices = [i];
    }
  }

  pushSegmentToSolutionArr();

  return solutionArr.join(",");
}