const boardColumns = [1, 16, 31, 46, 61].map((first) =>
  Array.from({ length: 15 }, (_, i) => i + first)
);

module.exports = { boardColumns };
