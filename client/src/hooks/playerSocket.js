import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { toast } from "react-toastify";

const usePlayerSocket = () => {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(process.env.REACT_APP_API_URL);

    socketRef.current.on("gameStarted", (title) => {
      toast.success(`Game ${title} has started.`);
    });

    socketRef.current.on("nextNum", (num) => {
      toast.info(
        <p>
          The Next Number is: <span className="h3">{num}</span>
        </p>
      );
    });

    const { playerName, gameTitle } = JSON.parse(
      localStorage.getItem("playerInfo")
    );
    socketRef.current.emit("idPlayer", { playerName, gameTitle });

    return () => {
      socketRef.current.disconnect("Some nmame");
    };
  }, []);

  function claimBingo() {
    console.log("Claiming Bingo");
  }

  return { claimBingo };
};

export default usePlayerSocket;
