const input = require('./input');
const parse = require('./parser');

let peakValue = 0;

const output = input.reduce((register, toParse) => {
  const { condition, operation, registerKey } = parse(toParse);

  // eslint-disable-next-line no-param-reassign
  if (register[registerKey] === undefined) register[registerKey] = 0;
  // eslint-disable-next-line no-param-reassign
  if (register[condition.registerKey] === undefined) register[condition.registerKey] = 0;

  if (condition.check(register)) {
    const result = operation.run(register[registerKey]);

    if (result > peakValue) {
      peakValue = result;
    }

    return Object.assign({}, register, { [registerKey]: result });
  }

  return register;
}, {});

console.log('peak value', peakValue);
console.log('highest register', Object.values(output).sort((a, b) => b - a)[0]);
