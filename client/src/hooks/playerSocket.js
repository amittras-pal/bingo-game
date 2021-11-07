import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { toast } from "react-toastify";

const usePlayerSocket = () => {
  const socketRef = useRef();
  const history = useHistory();
  const [claimStatus, setClaimStatus] = useState(false);

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

    socketRef.current.on("gameFinished", ({ gameTitle, gameUpdate }) => {
      toast.success(`${gameTitle} has been finished. Redirecting to HOME!`, {
        autoClose: 3500,
      });
      localStorage.clear();
      setTimeout(() => {
        history.push("/");
      }, 1000);
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
        console.log("running");
        if (claimer === playerName) {
          toast.info(
            "You have claimed Bingo! Please wait while the conductor is reviewing your board."
          );
          localStorage.setItem("claimedState", JSON.stringify({ byMe: true }));
        } else {
          localStorage.setItem(
            "claimedState",
            JSON.stringify({ byMe: false, playerName })
          );
        }
        setClaimStatus(true);
      }
    );

    socketRef.current.on("removeSuccess", () => {
      localStorage.clear();
      toast.info("You have left the game.", { theme: "dark" });
      history.push("/");
    });
    socketRef.current.on("removeFailed", () => {
      toast.error("Failed to leave the game!", { theme: "dark" });
    });

    socketRef.current.on("playerLeft", ({ playerName }) => {
      toast.info(
        <p className="mb-0">
          <span className="fw-bold">{playerName}</span>{" "}
          <span>has left the game.</span>
        </p>,
        { theme: "dark" }
      );
    });

    return () => {
      socketRef.current.disconnect("Some nmame");
    };
  }, [history]);

  function quittingGame({ gameTitle, playerName }) {
    socketRef.current.emit("quittingGame", { gameTitle, playerName });
  }

  function claimBingo({ playerName, gameTitle }) {
    const board = JSON.parse(localStorage.getItem("board"));
    socketRef.current.emit("claimBingo", { playerName, gameTitle, board });
  }

  return { claimBingo, quittingGame, claimStatus, setClaimStatus };
};

export default usePlayerSocket;
