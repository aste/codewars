function determinant(m) {
  // return the determinant of the n x n matrix passed in
  if (m.length < 2) {
    return m[0][0];
  } else if (m.length === 2) {
    return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  } else {
    let determinantResult = 0

    for (let i = 0; i < m.length; i++) {
      const sign = i % 2 ? -1 : 1;
      const reducedMatrix = m.slice(1).map((row) => row.filter((_, rowIndex) => rowIndex !== i));
      console.log(reducedMatrix);
      determinantResult += sign * m[0][i] * determinant(reducedMatrix);
    }

    return determinantResult;
  }
}