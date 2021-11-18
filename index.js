// Required Packages
const express = require("express");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const path = require("path");
require("dotenv").config();

// Required Files
const gameController = require("./controllers/gameController");
const {
  findGameById,
  startGame,
  generateNumber,
  declareWinnerAndEndGame,
  endGame,
} = require("./controllers/conductorController");
const {
  notifyPlayerConnected,
  notifyBingoClaimed,
  removePlayerFromGame,
} = require("./controllers/playerController");

// Env Variables Config
const port = process.env.PORT || 5000;
const clusterUri = process.env.CLUSTER_URI;

// App Config
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/game", gameController);
app.use("/static", express.static(path.resolve(__dirname, "static")));

// Set up production app config.
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Create HTTP Server for the app, will be used for socket.io
const server = http.createServer(app);

// Create Socket IO server for the express app.
const io = socketio(server, { cors: { origin: "*" } });

// Socket IO Configuration.
io.on("connection", (socket) => {
  // If socket identifies as conductor.
  socket.on("idConductor", ({ gameId, gameTitle }) => {
    findGameById(gameId, gameTitle, socket);
  });

  // If socket identifies as player.
  socket.on("idPlayer", ({ gameTitle, playerName }) => {
    notifyPlayerConnected(gameTitle, playerName, socket, io);
  });

  socket.on("startGame", ({ gameId, gameTitle }) => {
    startGame(gameId, gameTitle, socket, io);
    setTimeout(() => {
      generateNumber(gameId, gameTitle, socket, io);
    }, 2000);
  });

  socket.on("endGame", ({ gameId, gameTitle }) => {
    endGame(gameId, gameTitle, socket, io);
  });

  socket.on("generateNext", ({ gameId, gameTitle }) => {
    generateNumber(gameId, gameTitle, socket, io);
  });

  socket.on("claimBingo", ({ playerName, gameTitle, board }) => {
    notifyBingoClaimed(gameTitle, playerName, board, socket, io);
  });

  socket.on("quittingGame", ({ playerName, gameTitle }) => {
    removePlayerFromGame(gameTitle, playerName, socket, io);
  });

  socket.on("declareWinner", ({ gameId, gameTitle, playerName }) => {
    declareWinnerAndEndGame(gameId, gameTitle, playerName, socket, io);
  });

  socket.on("declareBogey", ({ playerName, gameTitle }) => {
    io.to(gameTitle).emit("playerDeclaredBogey", { playerName });
  });
  // Disconnection.
  socket.on("disconnect", () => {
    console.log("Disconnected.");
  });
});

// Start the app.
console.log("Connecting Bingo Database");
mongoose.connect(clusterUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Database Connected Successfully.");
  console.log("Starting App...");
  server.listen(port, () => {
    console.log(`Bingo App Started Successfully on port ${port}`);
  });
});
