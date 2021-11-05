const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  conductorName: { type: String, required: true },
  availableNumbers: {
    type: [Number],
    default: Array.from({ length: 75 }, (_, i) => i + 1),
  },
  usedNumbers: { type: [Number] },
  players: { type: [String] },
  created: { type: Date, default: Date.now },
  started: { type: Date },
  finished: { type: Date },
  boardSelection: { type: [String] },
  winner: { type: String },
});

module.exports = mongoose.model("game", gameSchema);
