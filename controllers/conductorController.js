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
    if (remaining.length === 0) {
      socket.emit("lastNum", null);
    }
    io.to(gameTitle).emit("nextNum", next);
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

async function declareWinnerAndEndGame(
  gameId,
  gameTitle,
  playerName,
  socket,
  io
) {
  try {
    const finishedGame = await Game.findByIdAndUpdate(
      gameId,
      { $set: { finished: Date.now(), winner: playerName } },
      { new: true, useFindAndModify: false }
    );
    io.to(gameTitle).emit("playerDeclaredWinner", { gameTitle, playerName });
    socket.emit("winnerDeclared", {
      time: finishedGame.finished,
      winner: finishedGame.winner,
    });
  } catch (error) {
    socket.emit("winDeclareFailed", null);
  }
}

async function endGame(gameId, gameTitle, socket, io) {
  try {
    const gameUpdate = await Game.findByIdAndUpdate(
      gameId,
      { $set: { finished: Date.now() } },
      { new: true, useFindAndModify: false }
    );
    io.to(gameTitle).emit("gameFinished", { gameTitle, gameUpdate });
  } catch (error) {
    socket.emit("failedToEnd", null);
  }
}

module.exports = {
  findGameById,
  startGame,
  generateNumber,
  declareWinnerAndEndGame,
  endGame,
};
