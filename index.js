// Required Packages
const express = require("express");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config();

// Required Files
const gameController = require("./controllers/gameController");

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

// Start the app.
console.log("Starting App!");
mongoose.connect(clusterUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Cluster Connected Successfully.");
  console.log("Starting App...");
  server.listen(port, () =>
    console.log(`Bingo Started Successfully on port ${port}`)
  );
});
