const input = require('./input');
const { singleRound } = require('./index');

describe('knot singleRound', () => {
  it('works with first step of provided example', () => {
    // (0 1 2) 3 4 --> 0 1 2 pull out selection
    // (2 1 0) 3 4 --> 2 1 0 reverse selection
    // 2 1 0 3 4 --> place selection
    expect(singleRound([0, 1, 2, 3, 4], [3]).output).toEqual([2, 1, 0, 3, 4]);
    expect(singleRound([0, 1, 2, 3, 4], [3]).position).toBe(3);
    expect(singleRound([0, 1, 2, 3, 4], [3]).skipSize).toBe(1);
    expect(singleRound([0, 1, 2, 3, 4], [3]).result).toBe(2);
  });

  it('works with second step of provided example', () => {
    // 2 1) 0 (3 4 --> 3 4 2 1 pull out selection
    // 1 2) 0 (4 3 --> 1 2 4 3 reverse selection
    // 4 3) 0 (1 2 --> place selection
    expect(singleRound([2, 1, 0, 3, 4], [4], 3, 1).output).toEqual([4, 3, 0, 1, 2]);
    expect(singleRound([2, 1, 0, 3, 4], [4], 3, 1).position).toBe(3);
    expect(singleRound([2, 1, 0, 3, 4], [4], 3, 1).skipSize).toBe(2);
    expect(singleRound([2, 1, 0, 3, 4], [4], 3, 1).result).toBe(12);
  });

  it('works with third step of provided example', () => {
    // 4 3 0 (1) 2 --> 1 pull out selection
    // 4 3 0 (1) 2 --> 1 reverse selection
    // 4 3 0 (1) 2 --> 1 place selection
    expect(singleRound([4, 3, 0, 1, 2], [1], 3, 2).output).toEqual([4, 3, 0, 1, 2]);
    expect(singleRound([4, 3, 0, 1, 2], [1], 3, 2).position).toBe(1);
    expect(singleRound([4, 3, 0, 1, 2], [1], 3, 2).skipSize).toBe(3);
    expect(singleRound([4, 3, 0, 1, 2], [1], 3, 2).result).toBe(12);
  });

  it('works with fourth step of provided example', () => {
    // 4) (3 0 1 2 --> 3 0 1 2 4 pull out selection
    // 4) (2 1 0 3 --> 4 2 1 0 3 reverse selection
    // 3) (4 2 1 0 --> place selection
    expect(singleRound([4, 3, 0, 1, 2], [5], 1, 3).output).toEqual([3, 4, 2, 1, 0]);
    expect(singleRound([4, 3, 0, 1, 2], [5], 1, 3).position).toBe(4);
    expect(singleRound([4, 3, 0, 1, 2], [5], 1, 3).skipSize).toBe(4);
    expect(singleRound([4, 3, 0, 1, 2], [5], 1, 3).result).toBe(12);
  });

  it('works with entire provided example', () => {
    expect(singleRound([0, 1, 2, 3, 4], [3, 4, 1, 5]).output).toEqual([3, 4, 2, 1, 0]);
    expect(singleRound([0, 1, 2, 3, 4], [3, 4, 1, 5]).position).toBe(4);
    expect(singleRound([0, 1, 2, 3, 4], [3, 4, 1, 5]).skipSize).toBe(4);
    expect(singleRound([0, 1, 2, 3, 4], [3, 4, 1, 5]).result).toBe(12);
  });

  it('meets advent of code requirements', () => {
    expect(singleRound(input.list, input.lengths).output[0]).toBe(92);
    expect(singleRound(input.list, input.lengths).output[1]).toBe(218);
    expect(singleRound(input.list, input.lengths).position).toBe(15);
    expect(singleRound(input.list, input.lengths).skipSize).toBe(input.lengths.length);
    expect(singleRound(input.list, input.lengths).result).toBe(20056);
  });

  it('works with identical position beyond 1 part one', () => {
    // 7 8) (2 4 1 --> 2 4 1 7 8 pull out selection
    // 8 7) (1 4 2 --> 8 7 1 4 2 reverse selection
    // 4 2) (8 7 1 --> 4 2 8 7 1 place selection
    expect(singleRound([7, 8, 2, 4, 1], [5], 2, 0).output).toEqual([4, 2, 8, 7, 1]);
    expect(singleRound([7, 8, 2, 4, 1], [5], 2, 0).position).toBe(2);
    expect(singleRound([7, 8, 2, 4, 1], [5], 2, 0).skipSize).toBe(1);
    expect(singleRound([7, 8, 2, 4, 1], [5], 2, 0).result).toBe(8);
  });

  it('works with identical position beyond 1 part two', () => {
    // 7) 8 (2 4 1 --> 2 4 1 7 pull out selection
    // 7) 8 (1 4 2 --> 7 1 4 2 reverse selection
    // 2) 8 (7 1 4 --> place selection
    expect(singleRound([7, 8, 2, 4, 1], [4], 2, 0).output).toEqual([2, 8, 7, 1, 4]);
    expect(singleRound([7, 8, 2, 4, 1], [4], 2, 0).position).toBe(1);
    expect(singleRound([7, 8, 2, 4, 1], [4], 2, 0).skipSize).toBe(1);
    expect(singleRound([7, 8, 2, 4, 1], [4], 2, 0).result).toBe(16);
  });

  it('works with first step of input', () => {
    expect(singleRound(input.list, input.lengths.slice(0, 1)).output[0]).toBe(82);
    expect(singleRound(input.list, input.lengths.slice(0, 1)).output[1]).toBe(81);
    expect(singleRound(input.list, input.lengths.slice(0, 1)).output[81]).toBe(1);
    expect(singleRound(input.list, input.lengths.slice(0, 1)).output[82]).toBe(0);
    expect(singleRound(input.list, input.lengths.slice(0, 1)).output[83]).toBe(83);
    expect(singleRound(input.list, input.lengths.slice(0, 1)).output[84]).toBe(84);
    expect(singleRound(input.list, input.lengths.slice(0, 1)).position).toBe(83);
    expect(singleRound(input.list, input.lengths.slice(0, 1)).skipSize).toBe(1);
    expect(singleRound(input.list, input.lengths.slice(0, 1)).result).toBe(82 * 81);
  });

  it('works with zero length', () => {
    // 1 2 3 4 5 --> ??? pull out selection
    expect(singleRound([1, 2, 3, 4, 5], [0]).output).toEqual([1, 2, 3, 4, 5]);
    expect(singleRound([1, 2, 3, 4, 5], [0]).position).toBe(0);
    expect(singleRound([1, 2, 3, 4, 5], [0]).skipSize).toBe(1);
    expect(singleRound([1, 2, 3, 4, 5], [0]).result).toBe(2);
  });
});
