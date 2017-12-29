const { toYOrigin } = require('./distance');

describe('distance', () => {
  describe('to y-origin', () => {
    it('works for positive x and positive y', () => {
      expect(toYOrigin(4, 0)).toBe(0);
      expect(toYOrigin(4, 1)).toBe(1);
      expect(toYOrigin(4, 2)).toBe(3);
      expect(toYOrigin(4, 3)).toBe(5);
      expect(toYOrigin(4, 4)).toBe(7);
      expect(toYOrigin(4, 5)).toBe(9);

      expect(toYOrigin(5, 0)).toBe(0);
      expect(toYOrigin(5, 1)).toBe(2);
      expect(toYOrigin(5, 2)).toBe(4);
      expect(toYOrigin(5, 3)).toBe(6);
      expect(toYOrigin(5, 4)).toBe(8);
      expect(toYOrigin(5, 5)).toBe(10);
    });

    it('works for positive x and negative y', () => {
      expect(toYOrigin(4, -1)).toBe(2);
      expect(toYOrigin(4, -2)).toBe(4);
      expect(toYOrigin(4, -3)).toBe(6);
      expect(toYOrigin(4, -4)).toBe(8);
      expect(toYOrigin(4, -5)).toBe(10);

      expect(toYOrigin(5, -1)).toBe(1);
      expect(toYOrigin(5, -2)).toBe(3);
      expect(toYOrigin(5, -3)).toBe(5);
      expect(toYOrigin(5, -4)).toBe(7);
      expect(toYOrigin(5, -5)).toBe(9);
    });

    it('works for negative x and positive y', () => {
      expect(toYOrigin(-4, 1)).toBe(1);
      expect(toYOrigin(-4, 2)).toBe(3);
      expect(toYOrigin(-4, 3)).toBe(5);
      expect(toYOrigin(-4, 4)).toBe(7);
      expect(toYOrigin(-4, 5)).toBe(9);

      expect(toYOrigin(-5, 1)).toBe(2);
      expect(toYOrigin(-5, 2)).toBe(4);
      expect(toYOrigin(-5, 3)).toBe(6);
      expect(toYOrigin(-5, 4)).toBe(8);
      expect(toYOrigin(-5, 5)).toBe(10);
    });

    it('works for negative x and negative y', () => {
      expect(toYOrigin(-4, -1)).toBe(2);
      expect(toYOrigin(-4, -2)).toBe(4);
      expect(toYOrigin(-4, -3)).toBe(6);
      expect(toYOrigin(-4, -4)).toBe(8);
      expect(toYOrigin(-4, -5)).toBe(10);

      expect(toYOrigin(-5, -1)).toBe(1);
      expect(toYOrigin(-5, -2)).toBe(3);
      expect(toYOrigin(-5, -3)).toBe(5);
      expect(toYOrigin(-5, -4)).toBe(7);
      expect(toYOrigin(-5, -5)).toBe(9);
    });
  });
});
