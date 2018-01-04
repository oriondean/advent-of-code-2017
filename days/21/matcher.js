const invert = image => image.map((row, ri) => row.map((col, ci) => image[(ci)][ri]));
const flip = image => image.map(row => row.slice(0).reverse());
const rotate = image => flip(invert(image));

const condense = image => image
  .slice(1)
  .reduce((memo, row) => `${memo}/${row.join('')}`, image[0].join(''));

module.exports = (pattern, rule) =>
  condense(pattern) === rule ||
  condense(flip(pattern)) === rule ||
  condense(rotate(pattern)) === rule ||
  condense(flip(rotate(pattern))) === rule ||
  condense(rotate(rotate(pattern))) === rule ||
  condense(flip(rotate(rotate(pattern)))) === rule ||
  condense(rotate(rotate(rotate(pattern)))) === rule ||
  condense(flip(rotate(rotate(rotate(pattern))))) === rule;