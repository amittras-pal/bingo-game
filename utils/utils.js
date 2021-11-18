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
  ["B", "I", "N", "G", "O"].forEach((letter, index) => {
    const shuffled = shuffleArray(boardColumns[index]);
    boardValues[letter] =
      letter === "N" ? shuffled.slice(0, 4) : shuffled.slice(0, 5);
  });
  boardValues.N = [
    ...boardValues.N.slice(0, 2),
    "S",
    ...boardValues.N.slice(2, 4),
  ];
  Object.entries(boardValues).forEach(([letter, numbers]) => {
    boardState[letter] = numbers.map((val) => ({
      value: val,
      selected: val === "S" ? true : false,
    }));
  });
  return boardState;
}

function getNextNumber(array) {
  return { next: shuffleArray(array).pop(), remaining: array };
}

module.exports = {
  createBoard,
  getNextNumber,
  shuffleArray,
};
