import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const usePlayerSocket = () => {
  const socketRef = useRef();

  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    socketRef.current = socketIOClient(process.env.REACT_APP_API_URL);
    socketRef.current.on("identifyRole", (val) => {
      const gameTitle = localStorage.getItem("gameData");
      console.log(gameTitle);
      socketRef.current.emit("idPlayer", gameTitle);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return { playerData };
};

export default usePlayerSocket;
