const fs = require('fs');

const parse = require('./parse');

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  if (err) console.error('error reading input file', err);

  const instructions = data.split('\r\n')
    .map(parse);

  const registry = [...Array(8).keys()]
    .reduce((memo, index) => Object.assign({}, memo, { [String.fromCharCode(97 + index)]: 0 }), {});

  let program = { id: 0, registry, index: 0 };
  while (program.index < instructions.length) {
    const instruction = instructions[program.index];
    program = instruction(program, program.queue);
  }

  console.log(program.registry);
});
