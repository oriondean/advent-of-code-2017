const fs = require('fs');
const directions = require('./directions');
const states = require('./states');
const parse = require('./parser');

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
      const { directionIndex, nodes, infectedCount } = memo;

      const node = nodes[memo.position.join(',')] || 0;
      const newDirectionIndex = states[node].changeDirection(directionIndex, directions.length);
      const newStateIndex = (node + 1) % states.length;

      nodes[memo.position.join(',')] = newStateIndex; // break immutability for performance reasons

      return {
        position: directions[newDirectionIndex].move(memo.position),
        nodes,
        infectedCount: states[newStateIndex].name === 'infected' ? infectedCount + 1 : infectedCount,
        directionIndex: newDirectionIndex,
      };
    }, initialMemo);

  console.log('times infected', output.infectedCount);
});
