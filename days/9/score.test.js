const input = require('./input');
const calculateScore = require('./index');

describe('scorer', () => {
  it('handles single non-nested group', () => {
    expect(calculateScore('{}').groupScore).toBe(1);
  });

  it('handles single nested groups', () => {
    expect(calculateScore('{{{}}}').groupScore).toBe(6);
  });

  it('handles multiple nested groups', () => {
    expect(calculateScore('{{}, {}}').groupScore).toBe(5);
  });

  it('ignores garbage within single non-nested group', () => {
    expect(calculateScore('{<a>,<a>,<a>,<a>}').groupScore).toBe(1);
  });

  it('ignores garbage within single nested groups', () => {
    expect(calculateScore('{{<ab>},{<ab>},{<ab>},{<ab>}}').groupScore).toBe(9);
  });

  it('ignores garbage within multiple nested groups', () => {
    expect(calculateScore('{{<ab>{<ab>}},{<ab>},{<ab>},{<ab>}}').groupScore).toBe(12);
  });

  it('ignores characters prepended with escape character', () => {
    expect(calculateScore('{{<a!>},{<a!>},{<a!>},{<ab>}}').groupScore).toBe(3);
  });

  it('meets the advent of code requirements', () => {
    expect(calculateScore(input).groupScore).toBe(7616);
  });
});
