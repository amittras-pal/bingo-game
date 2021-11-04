import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const useConductor = () => {
  const socketRef = useRef();
  //   const [data, setData] = useState(null);
  const [gameData, setGameData] = useState(null);
  useEffect(() => {
    socketRef.current = socketIOClient(process.env.REACT_APP_API_URL);

    socketRef.current.on("identifyRole", (val) => {
      const gameId = localStorage.getItem("gameData");
      console.log(gameId);
      socketRef.current.emit("idConductor", gameId);
    });

    socketRef.current.on("gameData", (gameData) => {
      console.log(gameData);
      setGameData(gameData);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return { gameData };
};

export default useConductor;
