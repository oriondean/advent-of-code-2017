// Sieve of Eratosthenes!
module.exports = (limit) => {
  const candidates = [...Array(limit).keys()]
    .slice(1)
    .map(value => value + 1);

  const factors = [...Array(parseInt(Math.sqrt(limit), 10)).keys()]
    .slice(1)
    .map(value => value + 1);

  return factors.reduce((remaining, factor) => (
    remaining.filter(value => value === factor || (value % factor) !== 0)
  ), candidates);
};
