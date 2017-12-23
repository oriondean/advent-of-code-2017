const parse = require('./parser');

describe('parser', () => {
  it('extracts target register', () => {
    expect(parse('b inc 5 if a > 1').registerKey).toBe('b');
    expect(parse('a inc 1 if b < 5').registerKey).toBe('a');
    expect(parse('c dec -10 if a >= 1').registerKey).toBe('c');
    expect(parse('d inc -20 if c == 10').registerKey).toBe('d');
  });

  describe('extracts operation', () => {
    it('extracts increment operator', () => {
      expect(parse('b inc 5 if a > 1').operation.operator).toEqual('inc');
    });

    it('extracts decrement operator', () => {
      expect(parse('b dec 8 if a > 1').operation.operator).toEqual('dec');
    });

    it('extracts value', () => {
      expect(parse('b inc 5 if a > 1').operation.value).toEqual(5);
      expect(parse('b dec 8 if a > 1').operation.value).toEqual(8);
    });

    it('handles increment operations', () => {
      expect(parse('b inc 5 if a > 1').operation.run(5)).toEqual(10);
    });

    it('handles decrement operations', () => {
      expect(parse('b dec 8 if a > 1').operation.run(10)).toEqual(2);
    });
  });

  describe('parses condition', () => {
    it('extracts condition register', () => {
      expect(parse('b inc 5 if a > 1').condition.registerKey).toBe('a');
      expect(parse('a inc 1 if b < 5').condition.registerKey).toBe('b');
      expect(parse('c dec -10 if a >= 1').condition.registerKey).toBe('a');
      expect(parse('d inc -20 if c == 10').condition.registerKey).toBe('c');
    });

    it('extracts condition operator', () => {
      expect(parse('b inc 5 if a > 1').condition.operator).toBe('>');
      expect(parse('a inc 1 if b < 5').condition.operator).toBe('<');
      expect(parse('c dec -10 if a >= 1').condition.operator).toBe('>=');
      expect(parse('d inc -20 if c == 10').condition.operator).toBe('==');
    });

    it('extracts condition operator value', () => {
      expect(parse('b inc 5 if a > 1').condition.value).toBe(1);
      expect(parse('a inc 1 if b < -5').condition.value).toBe(-5);
      expect(parse('c dec -10 if a >= 1').condition.value).toBe(1);
      expect(parse('d inc -20 if c == 10').condition.value).toBe(10);
    });


    describe('condition check', () => {
      it('handles greater than operator', () => {
        const { condition } = parse('b inc 5 if a > 1');
        expect(condition.check({ a: 0 })).toBe(false);
        expect(condition.check({ a: 1 })).toBe(false);
        expect(condition.check({ a: 2 })).toBe(true);
      });

      it('handles less than operator', () => {
        const { condition } = parse('a inc 1 if b < -5');

        expect(condition.check({ b: -4 })).toBe(false);
        expect(condition.check({ b: -5 })).toBe(false);
        expect(condition.check({ b: -6 })).toBe(true);
      });

      it('handles greater than or equals operator', () => {
        const { condition } = parse('c dec -10 if a >= 1');

        expect(condition.check({ a: 0 })).toBe(false);
        expect(condition.check({ a: 1 })).toBe(true);
        expect(condition.check({ a: 2 })).toBe(true);
      });

      it('handles less than or equals operator', () => {
        const { condition } = parse('c dec -10 if f <= 14');

        expect(condition.check({ f: 13 })).toBe(true);
        expect(condition.check({ f: 14 })).toBe(true);
        expect(condition.check({ f: 15 })).toBe(false);
      });

      it('handles equal to operator', () => {
        const { condition } = parse('d inc -20 if c == 10');

        expect(condition.check({ c: 9 })).toBe(false);
        expect(condition.check({ c: 10 })).toBe(true);
        expect(condition.check({ c: 11 })).toBe(false);
      });

      it('handles not equal to operator', () => {
        const { condition } = parse('d inc -20 if c != 10');

        expect(condition.check({ c: 9 })).toBe(true);
        expect(condition.check({ c: 10 })).toBe(false);
        expect(condition.check({ c: 11 })).toBe(true);
      });
    });
  });
});
