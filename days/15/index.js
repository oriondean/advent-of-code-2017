function* generate(initialValue, factor, modValue, multipleOf) {
  let previousValue = initialValue;

  while (true) {
    let nextValue = -1;

    while ((nextValue % multipleOf) !== 0) {
      nextValue = (previousValue * factor) % modValue;
      previousValue = nextValue;
    }

    yield nextValue.toString(2).slice(-16).padStart(16, '0');
  }
}

// part-one: change multipleOf to 1
const a = generate(591, 16807, 2147483647, 4);
const b = generate(393, 48271, 2147483647, 8);

const sampleSize = 5e6; // part-one: increase this to 40e6

let matchCount = 0;
for (let i = 0; i < sampleSize; i++) {
  if (a.next().value === b.next().value) {
    matchCount++;
  }
}

console.log(`matches after ${sampleSize} values: ${matchCount}`);
