const Game = require("../models/game");
const { getNextNumber } = require("../utils/utils");

async function findGameById(gameId, gameTitle, socket) {
  try {
    const game = await Game.findById(gameId);
    if (game) {
      socket.join(gameTitle);
      socket.emit("gameData", game);
    }
  } catch (error) {
    socket.emit("gameData", null);
  }
}

async function generateNumber(gameId, gameTitle, socket, io) {
  try {
    const game = await Game.findById(gameId);
    const { next, remaining } = getNextNumber(game.availableNumbers);
    const updatedGame = await Game.findByIdAndUpdate(
      gameId,
      { $push: { usedNumbers: next }, availableNumbers: remaining },
      { new: true, useFindAndModify: false }
    );
    // let everyone in the game know the next number
    io.to(gameTitle).emit("nextNum", next);
    // let conductor know the next number and also the used numbers
    socket.emit("updatedGameState", {
      usedNumbers: updatedGame.usedNumbers,
      next,
    });
  } catch (error) {}
}

async function startGame(gameId, gameTitle, socket, io) {
  try {
    const gameUpdate = await Game.findByIdAndUpdate(
      gameId,
      { $set: { started: Date.now() } },
      { new: true, useFindAndModify: false }
    );
    io.to(gameTitle).emit("gameStarted", gameTitle);
    socket.emit("gameStartedData", gameUpdate);
  } catch (error) {
    socket.emit("nextNumFailed", { description: "something went wrong." });
  }
}

module.exports = {
  findGameById,
  startGame,
  generateNumber,
};
