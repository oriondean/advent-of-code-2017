const step = require('./steps');

describe('steps', () => {
  describe('north', () => {
    it('leaves x coordinate unchanged', () => {
      expect(step.n({ x: 3, y: 2 }).x).toBe(3);
      expect(step.n({ x: 3, y: 1 }).x).toBe(3);
      expect(step.n({ x: 3, y: 0 }).x).toBe(3);
      expect(step.n({ x: 3, y: -1 }).x).toBe(3);
    });

    it('decrements y coordinate each time', () => {
      expect(step.n({ x: 3, y: 2 }).y).toBe(1);
      expect(step.n({ x: 3, y: 1 }).y).toBe(0);
      expect(step.n({ x: 3, y: 0 }).y).toBe(-1);
      expect(step.n({ x: 3, y: -1 }).y).toBe(-2);
    });
  });

  describe('south', () => {
    it('leaves x coordinate unchanged', () => {
      expect(step.s({ x: 3, y: 2 }).x).toBe(3);
      expect(step.s({ x: 3, y: 1 }).x).toBe(3);
      expect(step.s({ x: 3, y: 0 }).x).toBe(3);
      expect(step.s({ x: 3, y: -1 }).x).toBe(3);
    });

    it('increments y coordinate each time', () => {
      expect(step.s({ x: 3, y: -1 }).y).toBe(0);
      expect(step.s({ x: 3, y: 0 }).y).toBe(1);
      expect(step.s({ x: 3, y: 1 }).y).toBe(2);
      expect(step.s({ x: 3, y: 2 }).y).toBe(3);
    });
  });

  describe('north west', () => {
    it('decrements x coordinate each time', () => {
      expect(step.nw({ x: 7, y: 4 }).x).toBe(6);
      expect(step.nw({ x: 6, y: 4 }).x).toBe(5);
      expect(step.nw({ x: 5, y: 3 }).x).toBe(4);
      expect(step.nw({ x: 4, y: 3 }).x).toBe(3);
      expect(step.nw({ x: 3, y: 2 }).x).toBe(2);
      expect(step.nw({ x: 2, y: 2 }).x).toBe(1);
      expect(step.nw({ x: 1, y: 1 }).x).toBe(0);
    });

    it('decrements y coordinate every other time', () => {
      expect(step.nw({ x: 7, y: 4 }).y).toBe(4);
      expect(step.nw({ x: 6, y: 4 }).y).toBe(3);
      expect(step.nw({ x: 5, y: 3 }).y).toBe(3);
      expect(step.nw({ x: 4, y: 3 }).y).toBe(2);
      expect(step.nw({ x: 3, y: 2 }).y).toBe(2);
      expect(step.nw({ x: 2, y: 2 }).y).toBe(1);
      expect(step.nw({ x: 1, y: 1 }).y).toBe(1);
    });
  });

  describe('north east', () => {
    it('increments x coordinate each time', () => {
      expect(step.ne({ x: 1, y: 5 }).x).toBe(2);
      expect(step.ne({ x: 2, y: 5 }).x).toBe(3);
      expect(step.ne({ x: 3, y: 4 }).x).toBe(4);
      expect(step.ne({ x: 4, y: 4 }).x).toBe(5);
      expect(step.ne({ x: 5, y: 3 }).x).toBe(6);
      expect(step.ne({ x: 6, y: 3 }).x).toBe(7);
      expect(step.ne({ x: 7, y: 2 }).x).toBe(8);
    });

    it('decrements y coordinate every other time', () => {
      expect(step.ne({ x: 1, y: 5 }).y).toBe(5);
      expect(step.ne({ x: 2, y: 5 }).y).toBe(4);
      expect(step.ne({ x: 3, y: 4 }).y).toBe(4);
      expect(step.ne({ x: 4, y: 4 }).y).toBe(3);
      expect(step.ne({ x: 5, y: 3 }).y).toBe(3);
      expect(step.ne({ x: 6, y: 3 }).y).toBe(2);
      expect(step.ne({ x: 7, y: 2 }).y).toBe(2);
    });
  });

  describe('south west', () => {
    it('decrements x coordinate each time', () => {
      expect(step.sw({ x: 7, y: 0 }).x).toBe(6);
      expect(step.sw({ x: 6, y: 1 }).x).toBe(5);
      expect(step.sw({ x: 5, y: 1 }).x).toBe(4);
      expect(step.sw({ x: 4, y: 2 }).x).toBe(3);
      expect(step.sw({ x: 3, y: 2 }).x).toBe(2);
      expect(step.sw({ x: 2, y: 3 }).x).toBe(1);
      expect(step.sw({ x: 1, y: 3 }).x).toBe(0);
      expect(step.sw({ x: 0, y: 4 }).x).toBe(-1);
    });

    it('increments y coordinate every other time', () => {
      expect(step.sw({ x: 7, y: 0 }).y).toBe(1);
      expect(step.sw({ x: 6, y: 1 }).y).toBe(1);
      expect(step.sw({ x: 5, y: 1 }).y).toBe(2);
      expect(step.sw({ x: 4, y: 2 }).y).toBe(2);
      expect(step.sw({ x: 3, y: 2 }).y).toBe(3);
      expect(step.sw({ x: 2, y: 3 }).y).toBe(3);
      expect(step.sw({ x: 1, y: 3 }).y).toBe(4);
      expect(step.sw({ x: 0, y: 4 }).y).toBe(4);
    });
  });

  describe('south east', () => {
    it('increments x coordinate each time', () => {
      expect(step.se({ x: 0, y: 0 }).x).toBe(1);
      expect(step.se({ x: 1, y: 0 }).x).toBe(2);
      expect(step.se({ x: 2, y: 1 }).x).toBe(3);
      expect(step.se({ x: 3, y: 1 }).x).toBe(4);
      expect(step.se({ x: 4, y: 2 }).x).toBe(5);
      expect(step.se({ x: 5, y: 2 }).x).toBe(6);
      expect(step.se({ x: 6, y: 3 }).x).toBe(7);
      expect(step.se({ x: 7, y: 3 }).x).toBe(8);
    });

    it('increments y coordinate every other time', () => {
      expect(step.se({ x: 0, y: 0 }).y).toBe(0);
      expect(step.se({ x: 1, y: 0 }).y).toBe(1);
      expect(step.se({ x: 2, y: 1 }).y).toBe(1);
      expect(step.se({ x: 3, y: 1 }).y).toBe(2);
      expect(step.se({ x: 4, y: 2 }).y).toBe(2);
      expect(step.se({ x: 5, y: 2 }).y).toBe(3);
      expect(step.se({ x: 6, y: 3 }).y).toBe(3);
      expect(step.se({ x: 7, y: 3 }).y).toBe(4);
    });
  });
});
