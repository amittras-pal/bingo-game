import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

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
      const gameId = localStorage.getItem("gameData");
      console.log(gameId);
      socketRef.current.emit("idConductor", gameId);
    });

    // Listen for game Data.
    socketRef.current.on("gameData", (gameData) => {
      console.log(gameData);
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
