const fs = require('fs');

const parseItem = (item) => {
  const [id, weight, ...children] = item.split(' ');

  return {
    id,
    weight: Number(weight.slice(1, -1)), // remove brackets
    children: children.slice(1).map(child => child.replace(',', '')),
  };
};

const parse = (data) => {
  const items = data.split('\r\n')
    .map(parseItem);

  // create id --> item map purely for efficiency
  const itemsMap = items.reduce((memo, item) => Object.assign(memo, { [item.id]: item }), {});

  // add parent <--> child two-way link
  return items.map((item) => {
    if (item.children.length) {
      const children = item.children.map(child => Object.assign(itemsMap[child], { parent: item }));
      return Object.assign(item, { children });
    }

    return Object.assign(item);
  });
};

const getRoot = item => (item.parent && getRoot(item.parent)) || item;

const traverse = (item, callback, tier = 0) => {
  if (item.children.length) {
    // depth first pre-order traversal
    const children = item.children.map(child => traverse(child, callback, tier + 1));
    callback(item, children, tier);
    return item;
  }

  callback(item, [], tier);
  return item;
};

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  if (err) console.error('error reading input file', err);

  const items = parse(data);
  const root = getRoot(items.find(item => !item.children.length));

  // traverse tree cumulatively summing weights
  traverse(root, (item, children) => {
    // eslint-disable-next-line no-param-reassign
    item.cumulativeWeight = children.length ?
      children.reduce((memo, child) => memo + child.cumulativeWeight, item.weight) : item.weight;
  });

  let toBalance = null;

  // traverse tree to correct unbalanced weight
  traverse(root, (item, children) => {
    if (children.length > 1 && !toBalance &&
      children.some((child, i, [other]) => child.cumulativeWeight !== other.cumulativeWeight)) {
      if (children.length === 2) {
        [toBalance] = item.children;
        const balanceAmount = (children[0].cumulativeWeight - children[1].cumulativeWeight);

        console.log(`balance ${item.children[0].id} by altering weight by ${balanceAmount}`);
        // children[0].weight += (children[0].cumulativeWeight - children[1].cumulativeWeight);
      } else {
        // sort and then find unbalanced child
        const sorted = children.sort((a, b) => b.cumulativeWeight - a.cumulativeWeight);
        const isFirstItemBalanced = sorted[0].cumulativeWeight === sorted[1].cumulativeWeight;
        toBalance = isFirstItemBalanced ? sorted.slice(sorted.length - 1) : sorted[0];
        const balanceAmount = sorted[1].cumulativeWeight - toBalance.cumulativeWeight;

        console.log(`balance ${toBalance.id} by altering weight by ${balanceAmount}`);
        // toBalance.weight += sorted[1].cumulativeWeight - toBalance.cumulativeWeight;
      }
    }
  });
});
