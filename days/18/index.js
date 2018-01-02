const fs = require('fs');

const parse = require('./parse');
const createProgram = require('./program');
const Coordinator = require('./coordinator');

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  if (err) console.error('error reading input file', err);

  const instructions = data.split('\r\n')
    .map(parse);

  const coordinator = new Coordinator(createProgram(0), createProgram(1));
  coordinator.execute(instructions);
});

