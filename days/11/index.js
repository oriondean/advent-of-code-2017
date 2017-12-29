const fs = require('fs');

const steps = require('./steps');
const { toXYOrigin } = require('./distance');

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  if (err) console.error('error reading input file', err);

  const initialPosition = { x: 0, y: 0 };
  let farthestSteps = 0;

  const { x, y } = data.split(',')
    .reduce((coords, step) => {
      const newPosition = steps[step](coords);
      const stepsFromOrigin = toXYOrigin(newPosition.x, newPosition.y);

      if (stepsFromOrigin > farthestSteps) {
        farthestSteps = stepsFromOrigin;
      }

      return newPosition;
    }, initialPosition);

  console.log('final position', x, y);
  console.log('steps to origin', toXYOrigin(x, y));
  console.log('farthest steps from origin', farthestSteps);
});
