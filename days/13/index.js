const fs = require('fs');

const parse = data => data.split('\r\n')
  .map(toParse => ({
    depth: Number(toParse.split(': ')[0]),
    range: Number(toParse.split(': ')[1]),
    isTraversingDownwards: true,
    position: 0,
  }));

const isAtEdgePosition = (isTraversingDownwards, position, range) => (
  isTraversingDownwards ? position >= range - 1 : position <= 0
);

const getNewPosition = (position, isEdgePosition, isTraversingDownwards) => (
  position + ((isTraversingDownwards ? 1 : -1) * (isEdgePosition ? -1 : 1))
);

const move = (layer) => {
  const { isTraversingDownwards, range } = layer;
  const isEdgePosition = isAtEdgePosition(isTraversingDownwards, layer.position, range);
  const position = getNewPosition(layer.position, isEdgePosition, isTraversingDownwards);
  const newDirection = isEdgePosition ? !isTraversingDownwards : isTraversingDownwards;

  return Object.assign({}, layer, { position, isTraversingDownwards: newDirection });
};

const getHighestDepth = layers => layers.reduce((memo, layer) => (
  layer.depth > layers[0].depth ? layer.depth : layers[0].depth
), layers[0].depth);

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  if (err) console.error('error reading input file', err);

  const firewallLayers = parse(data);
  const highestDepth = getHighestDepth(firewallLayers);

  const output = [...Array(highestDepth + 1).keys()]
    .reduce(({ severity, layers }, packetIndex) => {
      const collidingLayer = layers.find(layer => layer.depth === packetIndex && !layer.position);
      const severityDelta = collidingLayer ? (collidingLayer.depth * collidingLayer.range) : 0;

      return {
        severity: severity + severityDelta,
        layers: layers.map(move),
      };
    }, { layers: firewallLayers, severity: 0 });

  console.log('trip severity', output.severity);
});
