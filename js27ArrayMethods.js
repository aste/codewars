function countGrade(scores) {
  let gradesGiven = {
    S: 0,
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    X: 0,
  };

  gradesGiven.S += scores.filter((score) => score >= 100).length;
  gradesGiven.A += scores.filter((score) => score < 100 && score >= 90).length;
  gradesGiven.B += scores.filter((score) => score < 90 && score >= 80).length;
  gradesGiven.C += scores.filter((score) => score < 80 && score >= 60).length;
  gradesGiven.D += scores.filter((score) => score < 60 && score >= 0).length;
  gradesGiven.X += scores.filter((score) => score < 0).length;

  return gradesGiven
}
