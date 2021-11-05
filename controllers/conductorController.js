const Game = require("../models/game");

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

module.exports = {
  findGameById,
};
