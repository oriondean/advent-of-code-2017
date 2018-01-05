module.exports = {
  assignment: (operation, x, y) => (memory) => {
    const registry = Object.assign({}, memory.registry, { [x]: operation(memory, x, y) });
    return Object.assign({}, memory, { registry, index: memory.index + 1 });
  },
  jump: (condition, x, y) => memory => Object.assign(
    {},
    memory,
    { index: condition(x) ? memory.index + y : memory.index + 1 },
  ),
};
