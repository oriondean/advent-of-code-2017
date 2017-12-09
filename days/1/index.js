module.exports = (input, compareNextDigit) => (
  input.split('')
    .reduce((memo, value, i, a) => {
      const toCompare = compareNextDigit ? a[i + 1] || a[0] : a[Math.floor(a.length / 2)];
      return value === toCompare ? memo + Number(value) : memo;
    }, 0)
);

module.exports = {
  nextDigit: input =>
    input.split('')
      .reduce((memo, value, index, array) =>
        (value === (array[index + 1] || array[0]) ? memo + Number(value) : memo), 0),
  halfwayDigit: input =>
    input.split('')
      .reduce((memo, value, index, a) =>
        (value === a[((a.length / 2) + index) % a.length] ? memo + Number(value) : memo), 0),
};