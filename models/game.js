const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  conductorName: { type: String, required: true },
  availableNumbers: {
    type: [Number],
    default: Array.from({ length: 75 }, (_, i) => i + 1).sort(
      () => 0.5 - Math.random()
    ),
  },
  usedNumbers: { type: [Number] },
  players: { type: [String] },
  created: { type: Date, default: Date.now },
  started: { type: Date },
  finished: { type: Date },
  winner: { type: String },
});

module.exports = mongoose.model("game", gameSchema);
