const input = require('./input');

const hasDuplicates = pass => (
  pass.split(' ')
    .some((word, index, array) => array
      .slice(index + 1)
      .find(other => other === word))
);

const hasAnagrams = pass => (
  pass.split(' ')
    .some((word, index, array) => array
      .slice(index + 1)
      .some(other => word.split('').sort().join('') === other.split('').sort().join('')))
);

const isValid = pass => !hasDuplicates(pass) && !hasAnagrams(pass);

console.log(input.reduce((count, pass) => count + isValid(pass), 0));
