const isEven = value => value % 2 === 0;

// north: y--, east: x++, south: y++, west: x--
module.exports = {
  nw: ({ x, y }) => ({ x: x - 1, y: isEven(x) ? y - 1 : y }),
  n: ({ x, y }) => ({ x, y: y - 1 }),
  ne: ({ x, y }) => ({ x: x + 1, y: isEven(x) ? y - 1 : y }),
  sw: ({ x, y }) => ({ x: x - 1, y: isEven(x) ? y : y + 1 }),
  s: ({ x, y }) => ({ x, y: y + 1 }),
  se: ({ x, y }) => ({ x: x + 1, y: isEven(x) ? y : y + 1 }),
};
