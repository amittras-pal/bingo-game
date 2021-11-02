const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT;
const clusterUri = process.env.CLUSTER_URI;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const gameController = require("./controllers/gameController");
app.use("/game", gameController);

async function bingoApp() {
  console.log("Connecting Bingo Database...");
  try {
    mongoose.connect(clusterUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    mongoose.connection.on("connected", () => {
      console.log("Cluster Connected Successfully.");
      console.log("Starting App...");
      const server = app.listen(port, () =>
        console.log(`Bingo Started Successfully on port ${port}`)
      );
    });
  } catch (error) {
    console.log("Database Connection Failed! Check error below:");
    console.log(error);
  }
}

bingoApp();
