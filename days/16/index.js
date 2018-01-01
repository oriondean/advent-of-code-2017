const fs = require('fs');

const exchange = (toExchange, a, b) => {
  const array = toExchange.slice(0);
  const temp = array[a];
  array[a] = array[b];
  array[b] = temp;
  return array;
};

const partner = (array, a, b) => {
  const findIndex = target => array.findIndex(item => item === target);
  return exchange(array, findIndex(a), findIndex(b));
};

const spin = (array, amount) => array.slice(-amount).concat(array.slice(0, -amount));

const dance = (programs, moves) =>
  moves.reduce((state, move) => {
    if (move.startsWith('s')) {
      return spin(state, Number(move.slice(1)));
    } else if (move.startsWith('x')) {
      const args = move.slice(1).split('/').map(Number);
      return exchange(state, args[0], args[1]);
    }

    const args = move.slice(1).split('/').map(String);
    return partner(state, args[0], args[1]);
  }, programs);

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  if (err) console.error('error reading input file', err);

  const programs = [...Array(16).keys()]
    .map(i => String.fromCharCode(97 + i));
  const moves = data.split(',');

  let output = dance(programs, moves);
  let danceCount = 1;
  const history = [];

  // eslint-disable-next-line no-loop-func
  while (!history.find(old => old === output.join(''))) {
    history.push(output.join(''));
    output = dance(output, moves);
    danceCount++;
  }

  console.log(`dance repeats after ${danceCount - 1} iteration`);
  console.log(`1 billionth iteration: ${history[(1e9 % (danceCount - 1)) - 1]}`);
});
