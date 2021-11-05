import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { toast } from "react-toastify";

const useConductorSocket = () => {
  // Ref to handle the socket instance.
  const socketRef = useRef();
  // Store and update the game data here.
  const [gameData, setGameData] = useState(null);
  // Pull data on render: Need to find better entry points.
  useEffect(() => {
    socketRef.current = socketIOClient(process.env.REACT_APP_API_URL);

    // Identify the client as a conductor.
    socketRef.current.on("identifyRole", (val) => {
      const { gameId, gameTitle } = JSON.parse(
        localStorage.getItem("gameData")
      );
      socketRef.current.emit("idConductor", { gameId, gameTitle });
    });

    socketRef.current.on("playerJoined", ({ playerName, players }) => {
      toast.info(`${playerName} has joined the game.`, { autoClose: 1000 });
      setGameData((gameData) => ({ ...gameData, players }));
    });

    // Listen for game Data.
    socketRef.current.on("gameData", (gameData) => {
      setGameData(gameData);
    });

    // Disconnect on component unmount.
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Other user action functions.
  const startGame = () => {
    socketRef.current.emit("startGame", gameData._id);
  };

  return { gameData, startGame };
};

export default useConductorSocket;
