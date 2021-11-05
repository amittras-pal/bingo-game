const { createBoard } = require("../utils/utils");
const Game = require("../models/game");

async function notifyPlayerConnected(gameTitle, playerName, socket, io) {
  const game = await Game.findOne({ name: gameTitle });
  socket.join(gameTitle);
  socket.emit("playerData", {
    playerName,
    gameTitle,
    board: createBoard(),
  });
  io.to(gameTitle).emit("playerJoined", {
    playerName,
    players: game.players,
  });
}

module.exports = {
  notifyPlayerConnected,
};

/**
 * const gameUpdate = await Game.findOneAndUpdate(
      { name: name },
      { $push: { players: playerName } },
      { new: true, useFindAndModify: false }
    );
    if (gameUpdate) {
      return res.json({
        description: `You are now playing the game ${name}`,
        response: createBoard(),
      });
    } else {
      return res.status(404).json({
        description: "Cannot Add you to the game, as it doesn't exist!",
      });
    }
 */
