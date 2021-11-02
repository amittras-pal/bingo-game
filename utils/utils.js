const { boardColumns } = require("../constants/constants");

function createBoard() {
  const board = {};
  ["B", "I", "N", "G", "O"].forEach((letter, index) => {
    const shuffleColumns = boardColumns[index].sort(() => 0.5 - Math.random());
    board[letter] =
      letter === "N" ? shuffleColumns.slice(0, 4) : shuffleColumns.slice(0, 5);
  });
  return board;
}

module.exports = { createBoard };
