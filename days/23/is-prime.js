module.exports = (number) => {
  for (let i = 2; i <= parseInt(Math.sqrt(number), 10); i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return true;
};
