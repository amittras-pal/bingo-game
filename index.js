// Required Packages
const express = require("express");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const socketio = require("socket.io");
require("dotenv").config();

// Required Files
const gameController = require("./controllers/gameController");
const { findGameById } = require("./controllers/conductorController");

// Env Variables Config
const port = process.env.PORT || 5000;
const clusterUri = process.env.CLUSTER_URI;

// App Config
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/game", gameController);

// Create HTTP Server for the app, will be used for socket.io
const server = http.createServer(app);

// Create Socket IO server for the express app.
const io = socketio(server, { cors: { origin: "*" } });

// Socket IO Configuration.
io.on("connection", (socket) => {
  console.log("New Socket Connected");
  // Request identification for the newly connected socket.
  socket.emit("identifyRole", "Identify Your Role.");

  // If socket identifies as conductor.
  socket.on("idConductor", (gameId) => {
    console.log(`Conductor Connected for game Id ${gameId}`);
    // Send game data to the socket.
    findGameById(gameId, socket);
  });

  // Start the game.
  socket.on("startGame", (gameId) => {
    console.log(`Starting Game: ${gameId}`);
    // TODO: Should emit to only the game room.
    io.emit("Game Started!");
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
