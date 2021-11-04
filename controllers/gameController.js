const router = require("express").Router();
const { createBoard, getNextNumber } = require("../utils/utils");
const Game = require("../models/game");

router.post("/next-number", async (req, res) => {
  const { gameId } = req.body;
  const game = await Game.findById(gameId);
  const { next, remaining } = getNextNumber(game.availableNumbers);
  const updatedGame = await Game.findByIdAndUpdate(
    gameId,
    { $push: { usedNumbers: next }, availableNumbers: remaining },
    { new: true, useFindAndModify: false }
  );
  res.json({
    description: "Next Number retireved successfully!",
    response: {
      next,
      usedNumbers: updatedGame.usedNumbers.sort((a, b) => a - b),
      availableNumbers: updatedGame.availableNumbers.sort((a, b) => a - b),
    },
  });
});

router.post("/new", async (req, res) => {
  const { gameTitle, conductorName } = req.body;
  try {
    const existing = await Game.findOne({ name: gameTitle });
    if (existing)
      return res.status(409).json({
        description:
          "A game with that title is already in record. Please enter another title.",
        response: existing,
      });
    try {
      const game = await new Game({ name: gameTitle, conductorName }).save();
      return res.json({ description: "New Game Created!", response: game });
    } catch (error) {
      return res
        .status(400)
        .json({ description: "Failed to create new game.", error });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ description: "Something went wrong!", error });
  }
});

router.post("/begin", async (req, res) => {
  const { name } = req.body;
  try {
    const existingGame = await Game.findOne({ name });
    if (existingGame["started"]) {
      console.log(existingGame.started);
      return res
        .status(400)
        .json({ description: "This game is already started." });
    } else {
      const gameUpdate = await Game.findOneAndUpdate(
        { name },
        { $set: { started: Date.now() } },
        { new: true, useFindAndModify: false }
      );
      return res.json({ description: "Game Started!", response: gameUpdate });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ description: "Something went wrong!", error });
  }
});

router.post("/join", async (req, res) => {
  const { name, playerName } = req.body;
  try {
    const gameUpdate = await Game.findOneAndUpdate(
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
  } catch (error) {
    return res
      .status(500)
      .json({ description: "Could not add you into the game.", error });
  }
});

// test route
router.get("/games", async (req, res) => {
  const games = await Game.find();
  return res.json({ games });
});

module.exports = router;
