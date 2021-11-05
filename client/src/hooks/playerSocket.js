import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const usePlayerSocket = () => {
  const socketRef = useRef();

  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    socketRef.current = socketIOClient(process.env.REACT_APP_API_URL);
    socketRef.current.on("playerData", (data) => setPlayerData(data));
    return () => {
      socketRef.current.disconnect("Some nmame");
    };
  }, []);

  function connectPlayer({ playerName, gameTitle }) {
    socketRef.current.emit("idPlayer", { playerName, gameTitle });
  }

  return { playerData, connectPlayer };
};

export default usePlayerSocket;
