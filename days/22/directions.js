module.exports = [
  { name: 'up', move: ([row, col]) => [row - 1, col] },
  { name: 'right', move: ([row, col]) => [row, col + 1] },
  { name: 'down', move: ([row, col]) => [row + 1, col] },
  { name: 'left', move: ([row, col]) => [row, col - 1] },
];
