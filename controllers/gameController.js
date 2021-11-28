const router = require("express").Router();
const { createBoard } = require("../utils/utils");
const { boardImages } = require("../constants/constants");
const Game = require("../models/game");

router.get("/patterns", (req, res) => {
  return res.json(boardImages);
});

router.post("/new", async (req, res) => {
  const { gameTitle, conductorName, boardSelection } = req.body;
  try {
    const existing = await Game.findOne({ name: gameTitle });
    if (existing)
      return res.status(409).json({
        description:
          "A game with that title is already in record. Please enter another title.",
        response: existing,
      });
    try {
      const game = await new Game({
        name: gameTitle,
        conductorName,
        boardSelection,
        boardUrl: boardImages.filter(
          (image) => image.imageName === boardSelection
        )[0].imageUrl,
      }).save();
      return res.json({
        description: "New Game Created!",
        response: { gameId: game._id, gameTitle: game.name },
      });
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

router.post("/join-game", async (req, res) => {
  const { gameTitle, playerName } = req.body;
  try {
    const existing = await Game.findOne({ name: gameTitle });
    if (existing) {
      if (existing.started) {
        return res
          .status(403)
          .json({ description: "This Game is already in progress." });
      } else if (!existing.players.includes(playerName)) {
        try {
          await Game.updateOne(
            { name: gameTitle },
            { $addToSet: { players: playerName } },
            { new: true, useFindAndModify: false }
          );
          return res.json({
            description: `Connected to Game: ${gameTitle}`,
            response: {
              gameTitle,
              playerName,
              board: createBoard(),
              boardSelection: existing.boardSelection,
              boardUrl: existing.boardUrl,
            },
          });
        } catch (error) {
          res.status(500).json({
            description: "Something went wrong from within",
            response: null,
          });
        }
      } else {
        res
          .status(409)
          .json({ description: "You are already a part of that game." });
      }
    } else {
      res.status(404).json({
        description: "There is no game with that title. Please Review!",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ description: "Something went wrong on first", response: null });
  }
});

router.get("/report/:gameId", async (req, res) => {
  try {
    const gameReport = await Game.findById(req.params.gameId);
    res.json({ description: "Report For Last Game", response: gameReport });
  } catch (error) {
    res
      .status(500)
      .json({ description: "Something went wrong", response: null });
  }
});

module.exports = router;
