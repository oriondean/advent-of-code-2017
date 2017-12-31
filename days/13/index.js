const fs = require('fs');

const parse = data => data.split('\r\n')
  .map(toParse => ({
    depth: Number(toParse.split(': ')[0]),
    range: Number(toParse.split(': ')[1]),
  }));

const getHighestDepth = layers => layers.reduce((memo, layer) => (
  layer.depth > layers[0].depth ? layer.depth : layers[0].depth
), layers[0].depth);

const performTrip = (delay, layers) => layers
  .reduce((severity, { depth, range }) => {
    const isCaught = (delay + depth) % ((2 * range) - 2) === 0;
    return isCaught ? severity + (depth * range) : severity;
  }, 0);

fs.readFile('./input2.txt', 'utf-8', (err, data) => {
  if (err) console.error('error reading input file', err);

  const layers = parse(data);
  const highestDepth = getHighestDepth(layers);
  const output = performTrip(0, layers);

  console.log(`highest depth: ${highestDepth}`);
  console.log(`trip severity: ${output}`);
});
