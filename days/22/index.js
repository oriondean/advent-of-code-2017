const fs = require('fs');

const increment = (index, length) => (index + 1) % length;
const decrement = (index, length) => (index + (length - 1)) % length;
const negate = (index, length) => (index + 2) % length;

const directions = [
  { name: 'up', move: ([row, col]) => [row - 1, col] },
  { name: 'right', move: ([row, col]) => [row, col + 1] },
  { name: 'down', move: ([row, col]) => [row + 1, col] },
  { name: 'left', move: ([row, col]) => [row, col - 1] },
];

const states = [
  { name: 'clean', changeDirection: decrement },
  { name: 'weakened', changeDirection: index => index },
  { name: 'infected', changeDirection: increment },
  { name: 'flagged', changeDirection: negate },
];

const parse = grid => grid
  .map(row => row.split(''))
  .reduce((nodes, row, rowIndex) => (
    Object.assign({}, nodes, row.reduce((rowMemo, col, colIndex) => {
      if (col === '#') {
        return Object.assign({}, rowMemo, { [`${rowIndex},${colIndex}`]: 2 });
      }
      return rowMemo;
    }, {}))
  ), {});

const isInfected = index => states[index].name === 'infected';
const findNode = (nodes, pos) => nodes[pos.join(',')] || 0;

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  if (err) console.error('error reading input file', err);

  const grid = data.split('\r\n');
  const [startRow, startCol] = [Math.floor(grid.length / 2), Math.floor(grid[0].length / 2)];

  const initialMemo = {
    nodes: parse(grid, startRow, startCol),
    position: [startRow, startCol],
    infectedCount: 0,
    directionIndex: 0,
  };

  const output = [...Array(1e7).keys()]
    .reduce((memo) => {
      const { directionIndex, nodes, position } = memo;

      const node = findNode(nodes, position);
      const newDirectionIndex = states[node].changeDirection(directionIndex, directions.length);
      const newStateIndex = increment(node, states.length);

      // Break immutability for performance reasons, object assign too slow for very large objects.
      // e.g. Object.assign({}, nodes, { [position.join(',')]: newStateIndex })
      nodes[position.join(',')] = newStateIndex;

      return {
        position: directions[newDirectionIndex].move(memo.position),
        nodes,
        infectedCount: isInfected(newStateIndex) ? memo.infectedCount + 1 : memo.infectedCount,
        directionIndex: newDirectionIndex,
      };
    }, initialMemo);

  console.log('times infected', output.infectedCount);
});
