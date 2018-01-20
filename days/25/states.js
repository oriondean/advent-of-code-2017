const createState = (tapeValues, cursorValues, stateValues) =>
  ({ tape, cursor }) => ({
    value: tapeValues[tape[cursor] || 0],
    cursor: cursor + cursorValues[tape[cursor] || 0],
    state: stateValues[tape[cursor] || 0],
  });

module.exports = {
  A: createState([1, 0], [1, -1], ['B', 'B']),
  B: createState([0, 1], [1, -1], ['C', 'B']),
  C: createState([1, 0], [1, -1], ['D', 'A']),
  D: createState([1, 1], [-1, -1], ['E', 'F']),
  E: createState([1, 0], [-1, -1], ['A', 'D']),
  F: createState([1, 1], [1, -1], ['A', 'E']),
};
