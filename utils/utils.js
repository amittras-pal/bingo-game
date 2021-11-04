const { boardColumns } = require("../constants/constants");

/**
 * Function to shuffle an array of integers.
 * Using "Fisher-Yates" Shuffle Algorithm.
 * http://en.wikipedia.org/wiki/Fisher-Yates_shuffle#The_modern_algorithm.
 * @param {Array} array
 * @returns an in place shuffled version of the array.
 */
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
  // Add a free block at the center of the "N" column.
  boardValues.N = [
    ...boardValues.N.slice(0, 2),
    "S",
    ...boardValues.N.slice(2, 4),
  ];
  // Create State Object for rendering on the screen and client side manipulations.
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
