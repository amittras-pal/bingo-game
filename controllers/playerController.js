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
  try {
    socket.emit("bingoClaimed", {
      description:
        "Your claim has been submitted successfully!\nplease wait while the conductor reviews!",
    });
    // TODO: description block needs to be removed. LET FE Handle it.
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

async function removePlayerFromGame(gameTitle, playerName, socket, io) {
  try {
    const game = await Game.findOne({ name: gameTitle });
    const playerList = game.players;
    const playerIndex = playerList.indexOf(playerName);
    playerList.splice(playerIndex, 1);
    const update = await Game.findByIdAndUpdate(
      game._id,
      {
        $set: { players: playerList },
      },
      { new: true, useFindAndModify: false }
    );
    socket.emit("removeSuccess", null);
    io.to(gameTitle).emit("playerLeft", {
      playerName,
      players: update.players,
    });
  } catch (error) {
    socket.emit("removeFailed", null);
  }
}

module.exports = {
  notifyPlayerConnected,
  notifyBingoClaimed,
  removePlayerFromGame,
};
