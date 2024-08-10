function fib(n) {
  const negativeFib = n < 0;
  const signBit = negativeFib && n % 2 === 0 ? BigInt(-1) : BigInt(1);
  const nAbsolute = Math.abs(n);

  function fibHelper(n) {
    // Base case for n = 0 and n = 1: return F(0) = 0 and F(1) = 1
    if (n === 0) return [BigInt(0), BigInt(1)];

    // Recursively Calculate: F(k) and F(k+1)
    // where k = floor(n/2)
    const [a, b] = fibHelper(Math.floor(n / 2));

    // Calculate F(2k) using the formula: F(2k) = F(k) * [2 * F(k+1) - F(k)]
    const c = a * (BigInt(2) * b - a);

    // Calculate F(2k+1) using the formula: F(2k+1) = F(k+1)^2 + F(k)^2
    const d = a * a + b * b;

    // If n is even, return F(2k) and F(2k+1)
    // If n is odd, return F(2k+1) and F(2k+2)
    if (n % 2 === 0) {
      return [c, d];
    } else {
      return [d, c + d];
    }
  }

  // Ignore F(nAbsolute + 1) since it's not needed for the final result
  const [result, _] = fibHelper(nAbsolute);

  // Return the correctly signed Fibonacci number
  return signBit * result;
}
