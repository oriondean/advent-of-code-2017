const operations = require('../shared/operations');

const parseArg = value => (Number.isNaN(parseInt(value, 10)) ? value : parseInt(value, 10));

module.exports = (toParse) => {
  const [command, arg1, arg2] = toParse.split(' ');
  return operations[command](parseArg(arg1), parseArg(arg2));
};
