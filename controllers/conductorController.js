const Game = require("../models/game");

// TODO: Error Handling and refining.
async function findGameById(gameId, socket) {
  const game = await Game.findById(gameId);
  if (game) socket.emit("gameData", game);
  else socket.emit("gameData", null);
}

module.exports = {
  findGameById,
};
