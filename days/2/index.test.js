const input = require('./input');
const { difference, evenlyDivisible } = require('./index');

describe('checksum calculator', () => {
  describe('difference mode', () => {
    it('works for single provided test case', () => {
      const example = [
        [5, 1, 9, 5],
        [7, 5, 3],
        [2, 4, 6, 8],
      ];

      expect(difference(example)).toBe(18);
    });

    it('meets advent of code requirements', () => {
      expect(difference(input)).toBe(44216);
    });
  });

  describe('evenly divisible mode', () => {
    it('works for single provided test case', () => {
      const example = [
        [5, 9, 2, 8],
        [9, 4, 7, 3],
        [3, 8, 6, 5],
      ];

      expect(evenlyDivisible(example)).toBe(9);
    });

    it('meets advent of code requirements', () => {
      expect(evenlyDivisible(input)).toBe(320);
    });
  });
});
