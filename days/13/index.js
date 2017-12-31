const fs = require('fs');

const parse = data => data.split('\r\n')
  .map(toParse => ({
    depth: Number(toParse.split(': ')[0]),
    range: Number(toParse.split(': ')[1]),
  }));

const getHighestDepth = layers => layers.reduce((memo, layer) => (
  layer.depth > layers[0].depth ? layer.depth : layers[0].depth
), layers[0].depth);

const isCaught = (delay, range) => (delay % ((2 * range) - 2)) === 0;

const calculateSeverity = (delay, layers) => layers
  .filter(layer => isCaught(layer.depth, layer.range))
  .reduce((severity, { depth, range }) => severity + (depth * range), 0);

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  if (err) console.error('error reading input file', err);

  const layers = parse(data);
  const highestDepth = getHighestDepth(layers);
  const output = calculateSeverity(0, layers);

  let delay = 0;
  let isTripCaught = true;
  while (isTripCaught) {
    delay++;
    // eslint-disable-next-line no-loop-func
    isTripCaught = layers.some(layer => isCaught(delay + layer.depth, layer.range));
  }

  console.log(`highest depth: ${highestDepth}`);
  console.log(`initial trip severity: ${output}`);
  console.log(`delay to zero severity trip: ${delay}`);
});
