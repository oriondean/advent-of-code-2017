const hasher = require('../10');

const hex2bin = hex => parseInt(hex, 16).toString(2).padStart(4, '0');

const length = [...Array(256).keys()];
const seed = 'uugsqrei';

const output = length
  .slice(0, 128)
  .map(index => `${seed}-${index}`)
  .map(input => hasher.hash(length, input))
  .map(hash => hash.split('').map(hex2bin).join(''));

const markRegion = (grid, col, row, id) => {
  if (grid[col] === undefined || grid[col][row] === undefined) {
    return;
  }

  const cellValue = grid[col][row];

  if (cellValue === '0') {
    grid[col][row] = 0; // eslint-disable-line no-param-reassign
  } else if (cellValue === '1') {
    grid[col][row] = id; // eslint-disable-line no-param-reassign

    markRegion(grid, col + 1, row, id);
    markRegion(grid, col - 1, row, id);

    markRegion(grid, col, row - 1, id);
    markRegion(grid, col, row + 1, id);
  }
};

const grid = output.map(row => row.split(''));

let region = 0;

// warning: destructive
grid.forEach((row, i) => row.forEach((col, j) => markRegion(grid, i, j, ++region)));

const uniqueRegions = grid.reduce((rowMemo, row, i) => {
  const uniqueValues = row.reduce((colMemo, col, j) => (
    Object.assign({}, colMemo, { [grid[i][j]]: true })
  ), {});

  return Object.assign({}, rowMemo, uniqueValues);
}, {});

console.log(
  'used spaces',
  output
    .map(bin => bin.replace(/0/g, '').length)
    .reduce((sum, usedCount) => sum + usedCount, 0),
);

console.log('unique regions', Object.keys(uniqueRegions).length - 1);
