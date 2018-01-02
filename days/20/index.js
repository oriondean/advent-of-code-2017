const fs = require('fs');

const parse = (toParse, index) => (
  toParse.split(', ')
    .map(properties => /(\w)=<([-\d]+),([-\d]+),([-\d]+)>/.exec(properties).slice(1))
    .reduce((memo, [property, x, y, z]) => (
      Object.assign({}, memo, { [property]: { x: Number(x), y: Number(y), z: Number(z) } })
    ), { id: index, distance: -1 })
);

const tick = (particle) => {
  const {
    p, v, a,
  } = particle;

  const newV = { x: v.x + a.x, y: v.y + a.y, z: v.z + a.z };
  const newP = { x: p.x + newV.x, y: p.y + newV.y, z: p.z + newV.z };

  return Object.assign({}, particle, {
    p: newP,
    v: newV,
    a,
    distance: Math.abs(newP.x) + Math.abs(newP.y) + Math.abs(newP.z),
  });
};

const isColliding = (a, b) =>
  a.id !== b.id && a.p.x === b.p.x && a.p.y === b.p.y && a.p.z === b.p.z;


fs.readFile('./input.txt', 'utf-8', (err, data) => {
  if (err) console.error('error reading input file', err);

  const particles = data.split('\r\n')
    .map(parse);

  const iterations = 50;

  const output = [...Array(iterations).keys()]
    .reduce(memo => (
      memo.map(tick)
        .filter((particle, index, array) => !array.some(other => isColliding(particle, other)))
    ), particles);

  // for part one - remove isColliding
  // console.log(`closest to origin: ${output.sort((a, b) => a.distance - b.distance)[0].id}`);
  console.log(`particles left: ${output.length}`);
});
