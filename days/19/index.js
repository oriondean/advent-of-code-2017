const fs = require('fs');

const up = ([row, col]) => [row - 1, col];
const right = ([row, col]) => [row, col + 1];
const down = ([row, col]) => [row + 1, col];
const left = ([row, col]) => [row, col - 1];

const isEmpty = char => char === ' ' || char === undefined;

const changeDirection = (grid, move, row, col) => {
  if (move === up || move === down) {
    const [newRow, newCol] = right([row, col]);
    return !grid[newRow] || isEmpty(grid[newRow][newCol]) ? left : right;
  }

  const [newRow, newCol] = up([row, col]);
  return !grid[newRow] || isEmpty(grid[newRow][newCol]) ? down : up;
};

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  if (err) console.error('error reading input file', err);

  const grid = data.split('\r\n')
    .map(row => row.split(''));
  const charsSeen = [];

  let stepsTaken = 0;
  let move = down;
  let [row, col] = [0, grid[0].findIndex(char => char === '|')];

  while (charsSeen[charsSeen.length - 1] !== ' ') {
    [row, col] = move([row, col]);

    const char = grid[row][col];

    if (char === '+') {
      move = changeDirection(grid, move, row, col);
    } else if (char !== '|' && char !== '-') {
      charsSeen.push(char);
    }

    stepsTaken++;
  }

  console.log(`characters seen: ${charsSeen.join('')}`);
  console.log(`steps taken: ${stepsTaken}`);
});

