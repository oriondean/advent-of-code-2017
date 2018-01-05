const getValue = (memory, value) => (typeof value === 'string' ? memory.registry[value] : (value || 0));

const assignment = (operation, x, y) => (memory) => {
  const registry = Object.assign(
    {},
    memory.registry,
    { [x]: operation(getValue(memory, x), getValue(memory, y)) },
  );
  return Object.assign({}, memory, { registry, index: memory.index + 1 });
};

const jump = (condition, x, y) => memory => Object.assign(
  {},
  memory,
  {
    index: condition(getValue(memory, x)) ? memory.index + getValue(memory, y) : memory.index + 1,
  },
);

const snd = x => (memory, otherQueue) => {
  otherQueue.push(getValue(memory, x));

  return Object.assign(
    {},
    memory,
    { sound: getValue(memory, x) },
    { sendCount: memory.sendCount + 1 },
    { index: memory.index + 1 },
  );
};

const rcv = x => (memory) => {
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

module.exports = {
  set: (x, y) => assignment((a, b) => b, x, y),
  add: (x, y) => assignment((a, b) => a + b, x, y),
  sub: (x, y) => assignment((a, b) => a - b, x, y),
  mul: (x, y) => assignment((a, b) => a * b, x, y),
  mod: (x, y) => assignment((a, b) => a % b, x, y),
  jgz: (x, y) => jump(a => a > 0, x, y),
  jnz: (x, y) => jump(a => a !== 0, x, y),
  snd,
  rcv,
};
