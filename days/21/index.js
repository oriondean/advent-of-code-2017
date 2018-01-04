const fs = require('fs');
const isMatch = require('./matcher');
const slice = require('./slicer');
const combine = require('./combiner');

const expand = string => string.split('/').map(row => row.split(''));

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
