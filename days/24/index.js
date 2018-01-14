const fs = require('fs');

const connect = bridge => bridge.components
  .filter(component => component.ports[0] === bridge.port || component.ports[1] === bridge.port)
  .map(component => ({
    components: bridge.components.filter(c => c.id !== component.id),
    port: (component.ports[0] === bridge.port && component.ports[1]) || component.ports[0],
    strength: bridge.strength + (component.ports[0] + component.ports[1]),
  }));


fs.readFile('./input.txt', 'utf-8', (err, data) => {
  if (err) console.error('error reading input file', err);

  const components = data.split('\r\n')
    .map((input, id) => ({ id, ports: input.split('/').map(Number) }));
  const maxStrengths = [];
  let bridges = [{ components, port: 0, strength: 0 }];

  while (bridges.length > 0) {
    bridges = bridges
      .map(connect)
      .reduce((array, toFlatten) => array.concat(toFlatten), []);

    maxStrengths.push(Math.max.apply(null, bridges.map(bridge => bridge.strength)));
  }

  console.log('strongest bridges', maxStrengths);
});
