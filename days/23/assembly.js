let b = 108400;
let d = 0;
let e = 0;
let isPrime = false;
let h = 0;

// 108,400 --> +17 --> 125,000
while (b !== 125400) {
  isPrime = true;
  d = 2; // does 2... * E = B at any point? then composite number!

  // increase d by 1 until it's B
  do {
    e = 2;

    // increase e by 1 until it's B
    do {
      if ((d * e) === b) {
        console.log('isPrime false1', d, e, b);
        isPrime = false; // if d, e are factors of B
      }
      e += 1;
    } while (e !== b);

    d += 1;
  } while (d !== b);

  if (!isPrime) {
    console.log('isPrime false2', d, e, b);
    h += 1; // if d, e fact
  }

  b += 17;
}

console.log('fin', h);
