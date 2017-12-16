const input = require('./input');

const history = {
  [input.toString()]: 0,
};

let cycles = 1;

while (true) { // eslint-disable-line no-constant-condition
  let maxBlocks = Math.max.apply(null, input);
  let index = input.findIndex(value => value === maxBlocks);
  input[index] = 0;

  while (maxBlocks-- > 0) input[++index % input.length] += 1;

  if (history[input.toString()] !== undefined) {
    break;
  } else {
    history[input.toString()] = cycles++;
  }
}

console.log('cycles', cycles);
console.log('loop size', cycles - history[input.toString()]);
