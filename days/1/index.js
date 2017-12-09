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
