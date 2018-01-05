const fs = require('fs');
const isPrime = require('./is-prime');
const findPrimes = require('./find-primes');

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

  // Part two - count composite (aka non-prime) numbers between 108,400 and 125,000 in jumps of 17
  const start = 108400;
  const end = 125400;
  const jump = 17;
  const jumps = Math.ceil((end - start) / jump);
  const sequence = [...Array(jumps + 1).keys()]
    .map(value => start + (value * jump));

  // Method One - isPrime check
  console.log('prime check method', sequence.filter(value => !isPrime(value)).length);

  // Method Two - Sieve of Eratosthenes
  const primes = findPrimes(end)
    .filter(value => value >= start)
    .reduce((memo, number) => Object.assign({}, memo, { [number]: true }), {});

  console.log('using sieve', sequence.filter(value => !primes[value]).length);
});
