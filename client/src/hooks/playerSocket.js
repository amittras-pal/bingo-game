import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const usePlayerSocket = () => {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(process.env.REACT_APP_API_URL);
    return () => {
      socketRef.current.disconnect("Some nmame");
    };
  }, []);

  function connectPlayer({ playerName, gameTitle }) {
    socketRef.current.emit("idPlayer", { playerName, gameTitle });
  }

  return { connectPlayer };
};

export default usePlayerSocket;
