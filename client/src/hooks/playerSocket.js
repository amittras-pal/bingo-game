import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { toast } from "react-toastify";

const usePlayerSocket = () => {
  const socketRef = useRef();
  const [claimStatus, setClaimStatus] = useState(null);

  useEffect(() => {
    socketRef.current = socketIOClient(process.env.REACT_APP_API_URL);

    // identify as a player.
    const { playerName, gameTitle } = JSON.parse(
      localStorage.getItem("playerInfo")
    );
    socketRef.current.emit("idPlayer", { playerName, gameTitle });

    // when game started
    socketRef.current.on("gameStarted", (title) => {
      toast.success(`Game ${title} has started.`);
    });

    // when next number is generated.
    socketRef.current.on("nextNum", (num) => {
      toast.info(
        <p>
          The Next Number is: <span className="h3">{num}</span>
        </p>
      );
    });

    // when a player claims bingo
    socketRef.current.on(
      "playerClaimedBingo",
      ({ playerName: claimer, description }) => {
        if (claimer === playerName) return;
        else {
          setClaimStatus((state) => ({
            ...state,
            showClaimed: true,
            description,
          }));
        }
      }
    );

    return () => {
      socketRef.current.disconnect("Some nmame");
    };
  }, []);

  function claimBingo({ playerName, gameTitle }) {
    const board = JSON.parse(localStorage.getItem("board"));
    console.log(`Player ${playerName} claiming Bingo for ${gameTitle}`);
    socketRef.current.emit("claimBingo", { playerName, gameTitle, board });
  }

  return { claimBingo, claimStatus };
};

export default usePlayerSocket;
