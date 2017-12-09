// ordered by their priority
const SPECIAL_CHARACTERS = {
  ESCAPE: '!',
  GARBAGE_CLOSE: '>',
  GARBAGE_OPEN: '<',
  GROUP_OPEN: '{',
  GROUP_CLOSE: '}',
};

module.exports = (input) => {
  const groupStack = [];
  let isInGarbage = false;
  let isEscaped = false;

  let groupScore = 0;
  let garbageCount = 0;

  input.split('')
    .forEach((character) => {
      if (isEscaped) isEscaped = false;
      else if (character === SPECIAL_CHARACTERS.ESCAPE) isEscaped = true;
      else if (character === SPECIAL_CHARACTERS.GARBAGE_CLOSE && isInGarbage) isInGarbage = false;
      else if (character === SPECIAL_CHARACTERS.GARBAGE_OPEN && !isInGarbage) isInGarbage = true;
      else if (isInGarbage) garbageCount += 1;
      else if (character === SPECIAL_CHARACTERS.GROUP_OPEN) groupStack.push(character);
      else if (character === SPECIAL_CHARACTERS.GROUP_CLOSE) {
        groupScore += groupStack.length;
        groupStack.pop();
      }
    });

  return {
    groupScore,
    garbageCount,
  };
};
