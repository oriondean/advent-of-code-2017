const getValue = (memory, value) => (typeof value === 'string' ? memory.registry[value] : (value || 0));

const parseArg = value => (Number.isNaN(parseInt(value, 10)) ? value : parseInt(value, 10));

module.exports = (toParse) => {
  const [command, arg1, arg2] = toParse.split(' ');
  const x = parseArg(arg1);
  const y = parseArg(arg2);

  const assignmentOperation = operation => (memory) => {
    const registry = Object.assign({}, memory.registry, { [x]: operation(memory, x, y) });
    return Object.assign({}, memory, { registry, index: memory.index + 1 });
  };

  switch (command) {
    case 'set':
      return assignmentOperation((memory, a, b) => getValue(memory, b));
    case 'add':
      return assignmentOperation((memory, a, b) => getValue(memory, a) + getValue(memory, b));
    case 'mul':
      return assignmentOperation((memory, a, b) => getValue(memory, a) * getValue(memory, b));
    case 'mod':
      return assignmentOperation((memory, a, b) => getValue(memory, a) % getValue(memory, b));
    case 'snd':
      return (memory, otherQueue) => {
        otherQueue.push(getValue(memory, x));

        return Object.assign(
          {},
          memory,
          { sound: getValue(memory, x) },
          { sendCount: memory.sendCount + 1 },
          { index: memory.index + 1 },
        );
      };
    case 'rcv':
      return (memory) => {
        if (memory.queue.length > 0) {
          return Object.assign(
            {},
            memory,
            { registry: Object.assign({}, memory.registry, { [x]: memory.queue[0] }) },
            { queue: memory.queue.slice(1) },
            { recovered: getValue(memory, x) ? memory.sound : memory.recovered },
            { index: memory.index + 1 },
          );
        }

        return Object.assign(
          {},
          memory,
          { recovered: getValue(memory, x) ? memory.sound : memory.recovered },
          { index: memory.index },
          { isRunning: false },
        );
      };
    case 'jgz':
      return memory => Object.assign(
        {},
        memory,
        { index: getValue(memory, x) > 0 ? memory.index + getValue(memory, y) : memory.index + 1 },
      );
    default:
      throw new Error(`Unknown instruction: ${command}`);
  }
};
