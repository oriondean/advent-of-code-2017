const fs = require('fs');
const isMatch = require('./matcher');

const expand = string => string.split('/').map(row => row.split(''));

const partition = (image, x, y, size) => {
  const pieces = [...Array(size).keys()];
  return pieces.map(row => pieces.map(col => image[row + x][col + y]));
};

const slice = (image, size) => {
  const pieces = image.length / size;

  return [...Array(pieces ** 2).keys()]
    .map(i => partition(image, Math.floor(i / pieces) * size, (i % pieces) * size, size));
};

const combine = (images, perRow) => {
  if (images.length === 1) {
    return images[0];
  }

  const newSize = images[0].length;

  return [...Array(newSize * perRow).keys()].map((index) => {
    const x = Math.floor(index / newSize) * perRow;
    const y = index % newSize;

    return [...Array(perRow).keys()].reduce((memo, i) => memo.concat(images[x + i][y]), []);
  });
};

const iterations = 18;

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  if (err) console.error('error reading input file', err);

  const rules = data.split('\r\n')
    .map(rule => rule.split(' => '));

  const output = [...Array(iterations).keys()]
    .reduce((image) => {
      if (image.length % 2 === 0 || image.length % 3 === 0) {
        const sliceSize = image.length % 2 ? 3 : 2;

        const expanded = slice(image, sliceSize)
          .map(toMatch => rules.find(rule => isMatch(toMatch, rule[0]))[1])
          .map(expand);

        return combine(expanded, image.length / sliceSize);
      }

      return image;
    }, expand('.#./..#/###'));

  const hashCount = output.reduce((memo, row) => memo + row.filter(char => char === '#').length, 0);
  console.log(hashCount);
});
