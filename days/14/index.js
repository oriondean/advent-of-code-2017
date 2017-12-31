const hasher = require('../10');

const hex2bin = hex => parseInt(hex, 16).toString(2).padStart(4, '0');

const length = [...Array(256).keys()];
const seed = 'uugsqrei';

const usedSpaces = length.slice(0, 128)
  .map(index => `${seed}-${index}`)
  .map(input => hasher.hash(length, input))
  .map(hash => hash.split('').map(hex2bin).join(''))
  .map(bin => bin.replace(/0/g, '').length)
  .reduce((sum, usedCount) => sum + usedCount, 0);

console.log('empty spaces', usedSpaces);
