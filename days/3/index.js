class Grid {
  constructor(count) {
    this.count = count;
    this.size = this.count ** 2;
    this.dimension = Math.ceil(Math.sqrt(this.size));
    this.grid = [...Array(this.dimension)].map(() => null)
      .map(() => [...Array(this.dimension)].map(() => null));

    this.build();
  }

  build() {
    let count = 0;
    let [row, col] = this.getMiddle(); // start in the middle

    const directions = [() => col++, () => row--, () => col--, () => row++]; // right up left down
    const steps = [...Array((this.count * 2) - 1)]
      .map((v, i) => ({ distance: Math.ceil((i + 1) / 2), move: directions[i % 4] }));

    this.grid[row][col] = 1; // seed initial value

    while (count < this.size) {
      for (let move = 0; move < steps[0].distance; move++) {
        steps[0].move();
        this.grid[row][col] = this.getValue(row, col);
        count++;
      }
      steps.shift();
    }
  }

  getValue(row, col) {
    const get = (r, c) => (this.grid[r] && this.grid[r][c]) || 0;

    return [row - 1, row, row + 1].reduce((memo, r) => (
      memo + get(r, col - 1) + get(r, col) + get(r, col + 1)
    ), 0);
  }

  find(value) {
    for (let row = 0; row < this.dimension; row++) {
      for (let col = 0; col < this.dimension; col++) {
        if (this.grid[row][col] === value) {
          return [row, col];
        }
      }
    }

    return [-1, -1];
  }

  distance(a, b) {
    const [x0, y0] = this.find(a);
    const [x1, y1] = this.find(b);
    return Math.abs(x1 - x0) + Math.abs(y1 - y0);
  }

  getMiddle() {
    const x = Math.floor(this.dimension / 2);
    return [x, this.dimension % 2 === 0 ? x - 1 : x];
  }

  toString() {
    let rows = '';

    for (let row = 0; row < this.dimension; row++) {
      let cols = '';
      for (let col = 0; col < this.dimension; col++) {
        cols += `\t${this.grid[row][col]}`;
      }
      rows += `\n${cols}`;
    }

    return rows;
  }
}

const input = 9; // 368078 (sqrt --> 606.694)
const grid = new Grid(input);
const target = grid.find(40);

console.log(grid.toString());
console.log('dimension', grid.dimension);
console.log('middle', grid.getMiddle());
console.log('target', target);
console.log('distance', grid.distance(1, 368078));
