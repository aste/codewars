function countGrade(scores) {
  return {
    S: scores.filter((score) => score >= 100).length,
    A: scores.filter((score) => score < 100 && score >= 90).length,
    B: scores.filter((score) => score < 90 && score >= 80).length,
    C: scores.filter((score) => score < 80 && score >= 60).length,
    D: scores.filter((score) => score < 60 && score >= 0).length,
    X: scores.filter((score) => score < 0).length,
  };
}
