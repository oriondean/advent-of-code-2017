const input = require('./input');
const { nextDigit, halfwayDigit } = require('./index');

describe('sum sequence', () => {
  describe('comparing next digit', () => {
    it('sums across all digits', () => {
      expect(nextDigit('1122')).toBe(3);
    });

    it('sums last digit with first if they match', () => {
      expect(nextDigit('1111')).toBe(4);
    });

    it('ignores non-matching digits', () => {
      expect(nextDigit('1234')).toBe(0);
    });

    it('sums mixture of matching and non-matching digits', () => {
      expect(nextDigit('91212129')).toBe(9);
    });

    it('meets the advent of code requirements', () => {
      expect(nextDigit(input)).toBe(1119);
    });
  });

  describe('comparing halfway digit', () => {
    it('sums across all digits', () => {
      expect(halfwayDigit('1212')).toBe(6);
    });

    it('ignores non-matching digits', () => {
      expect(halfwayDigit('1221')).toBe(0);
    });

    it('sums single match', () => {
      expect(halfwayDigit('123425')).toBe(4);
    });

    it('sums multiple matches', () => {
      expect(halfwayDigit('123123')).toBe(12);
    });

    it('sums mixture of matching and non-matching digits', () => {
      expect(halfwayDigit('12131415')).toBe(4);
    });

    it('meets the advent of code requirements', () => {
      expect(halfwayDigit(input)).toBe(1420);
    });
  });
});
