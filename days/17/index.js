const spinlock = (iterations, steps) => (
  [...Array(iterations).keys()]
    .reduce(({ position, buffer }, index) => {
      const newPosition = (position + steps + 1) % buffer.length;

      const newBuffer = buffer
        .slice(0, newPosition + 1)
        .concat([index + 1])
        .concat(buffer.slice(newPosition + 1));

      return {
        buffer: newBuffer,
        position: newPosition,
      };
    }, { buffer: [0], position: 0 })
);

const traceSpinlock = (iterations, steps) => (
  [...Array(iterations).keys()]
    .reduce(({ position, valueAfterZero }, index) => {
      const newPosition = (position + steps + 1) % (index + 1);

      return {
        position: newPosition,
        valueAfterZero: newPosition === 0 ? index + 1 : valueAfterZero,
      };
    }, { position: 0, valueAfterZero: -1 })
);


const partOne = spinlock(2017, 371);
console.log('value after last insertion', partOne.buffer[partOne.position + 2]);

const partTwo = traceSpinlock(50e6, 371);
console.log('value after zero', partTwo.valueAfterZero);
