const input = require('./input');
const { hash } = require('./index');

describe('knot hash', () => {
  it('meets the advent of code requirements', () => {
    expect(hash(input.list, String(input.lengths)))
      .toBe('d9a7de4a809c56bf3a9465cb84392c8e');
  });
});
