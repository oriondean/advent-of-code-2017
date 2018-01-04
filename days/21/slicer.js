const partition = (image, x, y, size) => {
  const pieces = [...Array(size).keys()];
  return pieces.map(row => pieces.map(col => image[row + x][col + y]));
};

module.exports = (image, size) => {
  const pieces = image.length / size;

  return [...Array(pieces ** 2).keys()]
    .map(i => partition(image, Math.floor(i / pieces) * size, (i % pieces) * size, size));
};
