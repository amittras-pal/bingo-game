import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { toast } from "react-toastify";

const useConductorSocket = () => {
  // Ref to handle the socket instance.
  const socketRef = useRef();
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

    socketRef.current.on("updatedGameState", ({ usedNumbers, next }) => {
      setGameData((prev) => ({ ...prev, usedNumbers, next }));
    });

    socketRef.current.on(
      "playerClaimedBingo",
      ({ playerName, board, description }) => {
        console.log(board);
        toast.info(description);
        setClaimedBoard({ board, playerName });
      }
    );

    const { gameId, gameTitle } = JSON.parse(localStorage.getItem("gameData"));
    socketRef.current.emit("idConductor", { gameId, gameTitle });

    // Disconnect on component unmount.
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // start the game.
  const startGame = ({ gameId, gameTitle }) => {
    socketRef.current.emit("startGame", { gameId, gameTitle });
  };

  const generateNext = ({ gameId, gameTitle }) => {
    socketRef.current.emit("generateNext", { gameId, gameTitle });
  };

  return { gameData, claimedBoard, startGame, generateNext };
};

export default useConductorSocket;
