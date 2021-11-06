const Game = require("../models/game");

async function notifyPlayerConnected(gameTitle, playerName, socket, io) {
  try {
    const game = await Game.findOne({ name: gameTitle });
    socket.join(gameTitle);
    io.to(gameTitle).emit("playerJoined", {
      playerName,
      players: game.players,
    });
  } catch (error) {
    socket.emit("connectionFailed", {
      description: "Failed to connect to game.",
    });
  }
}

async function notifyBingoClaimed(gameTitle, playerName, board, socket, io) {
  console.log(board);
  try {
    // const game = await Game.findOne({ name: gameTitle });
    socket.emit("bingoClaimed", {
      description:
        "Your claim has been submitted successfully!\nplease wait while the conductor reviews!",
    });
    io.to(gameTitle).emit("playerClaimedBingo", {
      playerName,
      board,
      description: `Player: ${playerName} has claimed Bingo!\nPlease wait while it is reviewed!!`,
    });
  } catch (error) {
    socket.emit("claimFailed", {
      description: "Failed to claim Bingo for your board.",
    });
  }
}

module.exports = {
  notifyPlayerConnected,
  notifyBingoClaimed,
};
