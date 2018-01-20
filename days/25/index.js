const states = require('./states');

const iterations = [...Array(12629077).keys()];
const initialState = { cursor: 0, tape: {}, state: 'A' };

const output = iterations.reduce((memo) => {
  const { cursor, state, value } = states[memo.state](memo);

  // eslint-disable-next-line no-param-reassign
  memo.tape[memo.cursor] = value;

  return { cursor, tape: memo.tape, state };
}, initialState);

const checksum = Object.values(output.tape)
  .filter(value => value === 1)
  .length;

console.log('checksum', checksum);
