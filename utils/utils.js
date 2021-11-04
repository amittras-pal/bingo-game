const { boardColumns } = require("../constants/constants");

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  const boardValues = {};
  const boardState = {};
  // Create Values
  ["B", "I", "N", "G", "O"].forEach((letter, index) => {
    const shuffled = shuffleArray(boardColumns[index]);
    boardValues[letter] =
      letter === "N" ? shuffled.slice(0, 4) : shuffled.slice(0, 5);
  });
  // Add a free block in the "N" column.
  boardValues.N = [
    ...boardValues.N.slice(0, 2),
    "S",
    ...boardValues.N.slice(2, 4),
  ];
  // Create State Object.
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
