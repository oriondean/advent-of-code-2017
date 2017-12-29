const toXOrigin = x => Math.abs(x);

const toYOrigin = (x, y) => {
  const absY = Math.abs(y);

  if (y === 0) {
    return 0;
  } else if (y < 0) {
    return x % 2 === 0 ? absY * 2 : (absY * 2) - 1;
  }

  return x % 2 === 0 ? (absY * 2) - 1 : absY * 2;
};

const toXYOrigin = (x, y) => {
  const absX = Math.abs(x);
  const absY = Math.abs(y);

  const stepsToXOrigin = toXOrigin(absX);
  const stepsToYOrigin = toYOrigin(absX, absY);

  if (stepsToXOrigin <= stepsToYOrigin) {
    const round = y < 0 ? Math.floor : Math.ceil;
    const yAtXOrigin = round(absY - (stepsToXOrigin / 2));
    return stepsToXOrigin + yAtXOrigin;
  }

  return stepsToYOrigin + (absX - stepsToYOrigin);
};

module.exports = {
  toXOrigin,
  toYOrigin,
  toXYOrigin,
};
