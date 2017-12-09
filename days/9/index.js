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
      if (isEscaped) {
        isEscaped = false;
        return;
      }

      if (character === SPECIAL_CHARACTERS.ESCAPE) {
        isEscaped = true;
        return;
      }

      if (character === SPECIAL_CHARACTERS.GARBAGE_CLOSE && isInGarbage) {
        isInGarbage = false;
        return;
      }

      if (character === SPECIAL_CHARACTERS.GARBAGE_OPEN && !isInGarbage) {
        isInGarbage = true;
        return;
      }

      if (isInGarbage) {
        garbageCount += 1;
        return;
      }

      if (character === SPECIAL_CHARACTERS.GROUP_OPEN) {
        groupStack.push(character);
      }

      if (character === SPECIAL_CHARACTERS.GROUP_CLOSE) {
        groupScore += groupStack.length;
        groupStack.pop();
      }
    });

  return {
    groupScore,
    garbageCount,
  };
};
