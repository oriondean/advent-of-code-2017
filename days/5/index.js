const input = require('./input');

let position = 0;
let steps = 0;

while (position > -1 && position < input.length) {
  const oldPosition = position;
  position += input[position];
  input[oldPosition] += input[oldPosition] > 2 ? -1 : 1;
  steps++;
}

console.log('steps', steps);
