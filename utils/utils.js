const { boardColumns } = require("../constants/constants");

function createBoard() {
  const boardValues = {};
  const boardState = {};
  // Create Values
  ["B", "I", "N", "G", "O"].forEach((letter, index) => {
    const shuffleColumns = boardColumns[index].sort(() => 0.5 - Math.random());
    boardValues[letter] =
      letter === "N" ? shuffleColumns.slice(0, 4) : shuffleColumns.slice(0, 5);
  });
  // Add a free block in the N column.
  boardValues.N = [
    ...boardValues.N.slice(0, 2),
    "S",
    ...boardValues.N.slice(2, 4),
  ];
  // Create State Objects.
  Object.entries(boardValues).forEach(([letter, numbers]) => {
    boardState[letter] = numbers.map((val) => ({
      value: val,
      selected: val === "S" ? true : false,
    }));
  });
  return boardState;
}

function getNextNumber(availableNumbers) {
  return { next: availableNumbers.pop(), remaining: availableNumbers };
}

module.exports = { createBoard, getNextNumber };
