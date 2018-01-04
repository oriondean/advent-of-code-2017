module.exports = grid => grid
  .map(row => row.split(''))
  .reduce((nodes, row, rowIndex) => (
    Object.assign({}, nodes, row.reduce((rowMemo, col, colIndex) => {
      if (col === '#') {
        return Object.assign({}, rowMemo, { [`${rowIndex},${colIndex}`]: 2 });
      }
      return rowMemo;
    }, {}))
  ), {});
