module.exports = id => ({
  id,
  sound: null,
  recovered: null,
  registry: { p: id },
  queue: [],
  index: 0,
  sendCount: 0,
  isRunning: false,
  isCompleted: false,
});
