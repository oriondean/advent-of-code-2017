module.exports = {
  difference: input => (
    input.reduce((checksum, row) => {
      const { min, max } = row.reduce((memo, value) => ({
        min: value < memo.min ? value : memo.min,
        max: value > memo.max ? value : memo.max,
      }), { min: row[0], max: row[0] });
      return checksum + (max - min);
    }, 0)
  ),
  evenlyDivisible: input => (
    input.reduce((checksum, row) => (
      checksum + row.sort()
        .reduce((memo, diviser, index, array) => {
          const match = array
            .filter(value => diviser !== value)
            .find(dividend => (dividend / diviser === Math.round(dividend / diviser)));
          return match ? match / diviser : memo;
        }, 0)
    ), 0)
  ),
};
