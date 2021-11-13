import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { baseURL } from "../constants/constants";
import { DateTime } from "luxon";

const useConductorSocket = () => {
  // Ref to handle the socket instance.
  const socketRef = useRef();
  const history = useHistory();
  // Store and update the game data here.
  const [gameData, setGameData] = useState(null);
  const [claimedBoard, setClaimedBoard] = useState(null);
  // Pull data on render: Need to find better entry points.
  useEffect(() => {
    socketRef.current = socketIOClient(baseURL);

    socketRef.current.on("playerJoined", ({ playerName, players }) => {
      setGameData((gameData) => ({ ...gameData, players }));
    });

    socketRef.current.on("gameData", (gameData) => {
      setGameData(gameData);
    });

    socketRef.current.on("gameStartedData", (gameData) => {
      setGameData(gameData);
      toast.info(`Game ${gameData.name} has started.`);
    });

    socketRef.current.on("winnerDeclared", ({ time, winner }) => {
      toast.success(
        <p className="m-0">
          <span className="text-success">{winner} </span>declared winner! <br />
          Game finished at{" "}
          <span className="text-success">
            {DateTime.fromISO(time).toLocaleString(DateTime.TIME_SIMPLE)}{" "}
          </span>
        </p>,
        { autoClose: 3000 }
      );
      localStorage.clear();
      setTimeout(() => history.push("/"), 1000);
    });

    socketRef.current.on("gameFinished", ({ gameTitle, gameUpdate }) => {
      toast.success(`${gameTitle} has been finished. Redirecting to HOME!`, {
        autoClose: 3500,
      });
      localStorage.clear();
      setTimeout(() => {
        history.push("/");
      }, 1000);
    });

    socketRef.current.on("lastNum", () => {
      toast.error("This is the last number.", { autoClose: 5000 });
      toast.info("There were no winners, the game will end in 2 seconds!", {
        theme: "dark",
        autoClose: 5000,
      });
      setTimeout(() => {
        const { gameId, gameTitle } = JSON.parse(
          localStorage.getItem("gameData")
        );
        endGame({ gameId, gameTitle });
      }, 2000);
    });

    socketRef.current.on("updatedGameState", ({ usedNumbers, next }) => {
      setGameData((prev) => ({ ...prev, usedNumbers, next }));
    });

    socketRef.current.on(
      "playerClaimedBingo",
      ({ playerName, board, description }) => {
        toast.info(description);
        setClaimedBoard({ board, playerName });
      }
    );

    socketRef.current.on("playerLeft", ({ playerName, players }) => {
      toast.info(
        <p className="mb-0">
          <span className="fw-bold">{playerName}</span>{" "}
          <span>has left the game.</span>
        </p>,
        { theme: "dark" }
      );
      setGameData((prev) => ({ ...prev, players }));
    });

    const { gameId, gameTitle } = JSON.parse(localStorage.getItem("gameData"));
    socketRef.current.emit("idConductor", { gameId, gameTitle });

    // Disconnect on component unmount.
    return () => {
      socketRef.current.disconnect();
    };
  }, [history]);

  // start the game.
  const startGame = ({ gameId, gameTitle }) => {
    socketRef.current.emit("startGame", { gameId, gameTitle });
  };

  const endGame = ({ gameId, gameTitle }) => {
    socketRef.current.emit("endGame", { gameId, gameTitle });
  };

  const generateNext = ({ gameId, gameTitle }) => {
    socketRef.current.emit("generateNext", { gameId, gameTitle });
  };

  const declareWinner = ({ gameId, gameTitle, playerName }) => {
    socketRef.current.emit("declareWinner", { gameId, gameTitle, playerName });
  };
  const declareBogey = ({ playerName, gameTitle }) => {
    socketRef.current.emit("declareBogey", { playerName, gameTitle });
    setClaimedBoard(null);
    toast.info(`${playerName} is a declared bogey! The game will continue!`, {
      theme: "dark",
    });
  };

  return {
    gameData,
    claimedBoard,
    startGame,
    endGame,
    generateNext,
    declareWinner,
    declareBogey,
  };
};

export default useConductorSocket;
