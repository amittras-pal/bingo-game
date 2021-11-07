import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const useConductorSocket = () => {
  // Ref to handle the socket instance.
  const socketRef = useRef();
  const history = useHistory();
  // Store and update the game data here.
  const [gameData, setGameData] = useState(null);
  const [claimedBoard, setClaimedBoard] = useState(null);
  // Pull data on render: Need to find better entry points.
  useEffect(() => {
    socketRef.current = socketIOClient(process.env.REACT_APP_API_URL);

    socketRef.current.on("playerJoined", ({ playerName, players }) => {
      // toast.info(`${playerName} has joined the game.`, { autoClose: 1000 });
      setGameData((gameData) => ({ ...gameData, players }));
    });

    socketRef.current.on("gameData", (gameData) => {
      setGameData(gameData);
    });

    socketRef.current.on("gameStartedData", (gameData) => {
      setGameData(gameData);
      toast.info(`Game ${gameData.name} has started.`);
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

  return { gameData, claimedBoard, startGame, endGame, generateNext };
};

export default useConductorSocket;
