module.exports = [
  { name: 'clean', changeDirection: (index, length) => (index + (length - 1)) % length },
  { name: 'weakened', changeDirection: index => index },
  { name: 'infected', changeDirection: (index, length) => (index + 1) % length },
  { name: 'flagged', changeDirection: (index, length) => (index + 2) % length },
];
