const fs = require('fs');

const parse = input => input
  .split('\r\n')
  .map(program => ({
    id: Number(program.split(' <-> ')[0]),
    pipes: program.split(' <-> ')[1].split(', ').map(pipe => Number(pipe)),
  }));

const toMap = programs => programs
  .reduce((map, item) => Object.assign({}, map, { [item.id]: item.pipes }), {});

// warning - destructive to provided params!
const visit = (id, group, map) => map[id]
  .forEach((pipe) => {
    if (group.find(existingPipe => pipe === existingPipe) === undefined && pipe !== id) {
      group.push(pipe);
      visit(pipe, group, map);
    }
  });

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  if (err) console.error('error reading input file', err);

  const programs = parse(data);
  const programsMap = toMap(programs);

  const programGroups = programs
    .map((program) => {
      const group = [program.id];
      visit(program.id, group, programsMap);
      return group.sort(); // sort to allow string comparison
    });

  const uniqueProgramGroups = programGroups
    .filter((group, index, groups) => (
      groups
        .slice(index + 1) // exclude previously seen groups
        .find(otherGroup => String(group) === String(otherGroup)) === undefined
    ));

  console.log('unique program groups', uniqueProgramGroups.length);
});
