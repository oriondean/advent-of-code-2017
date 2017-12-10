const parseLengths = lengths => (
  lengths.split('')
    .map(length => length.charCodeAt(0))
    .concat([17, 31, 73, 47, 23])
);

const toHex = (number) => {
  const result = number.toString(16);
  return result.length === 1 ? `0${result}` : result;
};

const toDenseHash = hash => (
  hash.reduce((memo, value, i) => {
    const index = Math.floor(i / 16);
    // eslint-disable-next-line no-param-reassign
    memo[index] = typeof memo[index] === 'undefined' ? value : memo[index] ^ value;
    return memo;
  }, [])
);

const toHexHash = hash => hash.map(toHex).join('');

const singleRound = (list, lengths, initialPosition = 0, initialSkipSize = 0) => (
  lengths.reduce((memo, length) => {
    let output = memo.output.slice(0);
    const { position } = memo;

    if (length > output.length) return memo; // lengths longer than list size are invalid

    const selectionEnd = (memo.position + length) % output.length;

    if (position < selectionEnd) {
      const toReverse = output.slice(position, selectionEnd)
        .reverse();

      output = output.slice(0, position)
        .concat(toReverse)
        .concat(output.slice(selectionEnd, output.length));
    } else if (length > 0) {
      const toReverse = output.slice(position, output.length)
        .concat(output.slice(0, selectionEnd))
        .reverse();

      // overflow of [n] --> take [n] items from back of reversed list
      // add in non-selected digits and then rest of reversed list
      output = toReverse.slice(toReverse.length - selectionEnd)
        .concat(output.slice(selectionEnd, position))
        .concat(toReverse.slice(0, toReverse.length - selectionEnd));
    }

    return {
      output,
      position: (memo.position + length + memo.skipSize) % output.length,
      skipSize: memo.skipSize + 1,
      result: output[0] * output[1],
    };
  }, {
    output: list.slice(0),
    position: initialPosition,
    skipSize: initialSkipSize,
    result: 0,
  })
);

module.exports = {
  hash: (list, lengths, initialPosition = 0, initialSkipSize = 0, parse = true) => {
    const parsedLengths = parse ? parseLengths(lengths) : lengths;
    let position = initialPosition;
    let skipSize = initialSkipSize;
    let output = list;

    for (let i = 0; i < 64; i++) {
      const result = singleRound(output, parsedLengths, position, skipSize);
      position = result.position; // eslint-disable-line prefer-destructuring
      skipSize = result.skipSize; // eslint-disable-line prefer-destructuring
      output = result.output; // eslint-disable-line prefer-destructuring
    }

    return toHexHash(toDenseHash(output));
  },
  singleRound,
};
