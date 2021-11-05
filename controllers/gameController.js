const router = require("express").Router();
const { createBoard, getNextNumber } = require("../utils/utils");
const { boardImgLinks } = require("../constants/constants");
const Game = require("../models/game");

router.get("/patterns", (req, res) => {
  res.json(boardImgLinks);
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
      if (!existing.players.includes(playerName)) {
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
              boards: boardImgLinks,
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

// test route
router.get("/games", async (req, res) => {
  const games = await Game.find();
  return res.json({ games });
});

module.exports = router;

// router.post("/begin", async (req, res) => {
//   const { name } = req.body;
//   try {
//     const existingGame = await Game.findOne({ name });
//     if (existingGame["started"]) {
//       console.log(existingGame.started);
//       return res
//         .status(400)
//         .json({ description: "This game is already started." });
//     } else {
//       const gameUpdate = await Game.findOneAndUpdate(
//         { name },
//         { $set: { started: Date.now() } },
//         { new: true, useFindAndModify: false }
//       );
//       return res.json({ description: "Game Started!", response: gameUpdate });
//     }
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ description: "Something went wrong!", error });
//   }
// });

// router.post("/next-number", async (req, res) => {
//   const { gameId } = req.body;
//   const game = await Game.findById(gameId);
//   const { next, remaining } = getNextNumber(game.availableNumbers);
//   const updatedGame = await Game.findByIdAndUpdate(
//     gameId,
//     { $push: { usedNumbers: next }, availableNumbers: remaining },
//     { new: true, useFindAndModify: false }
//   );
//   res.json({
//     description: "Next Number retireved successfully!",
//     response: {
//       next,
//       usedNumbers: updatedGame.usedNumbers.sort((a, b) => a - b),
//       availableNumbers: updatedGame.availableNumbers.sort((a, b) => a - b),
//     },
//   });
// });
