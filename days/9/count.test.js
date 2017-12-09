const input = require('./input');
const countGarbage = require('./index');

describe('counter', () => {
  it('handles empty garbage', () => {
    expect(countGarbage('<>').garbageCount).toBe(0);
  });

  it('handles no garbage', () => {
    expect(countGarbage('desolation row').garbageCount).toBe(0);
  });

  it('handles standard characters in garbage', () => {
    expect(countGarbage('<random characters>').garbageCount).toBe(17);
  });

  it('ignores nested garbage open characters', () => {
    expect(countGarbage('<<<<>').garbageCount).toBe(3);
  });

  it('ignores escape character', () => {
    expect(countGarbage('<{!>}>').garbageCount).toBe(2);
  });

  it('ignores sequential escape characterse', () => {
    expect(countGarbage('<!!!>>').garbageCount).toBe(0);
  });

  it('handles characters within garbage', () => {
    expect(countGarbage('<{o"i!a,<{i<a>').garbageCount).toBe(10);
  });

  it('meets the advent of code requirements', () => {
    expect(countGarbage(input).garbageCount).toBe(3838);
  });
});
