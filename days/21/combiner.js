module.exports = (images, perRow) => {
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
