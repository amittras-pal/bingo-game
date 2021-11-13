import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { toast } from "react-toastify";
import { baseURL } from "../constants/constants";

const usePlayerSocket = () => {
  const socketRef = useRef();
  const history = useHistory();
  const [claimStatus, setClaimStatus] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    socketRef.current = socketIOClient(baseURL);

    // identify as a player.
    const { playerName, gameTitle } = JSON.parse(
      localStorage.getItem("playerInfo")
    );
    socketRef.current.emit("idPlayer", { playerName, gameTitle });

    // when game started
    socketRef.current.on("gameStarted", (title) => {
      toast.success(`Game ${title} has started.`);
      localStorage.setItem("started", "Yes");
      setTimeout(() => setGameStarted(true), 2000);
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

    socketRef.current.on("lastNum", () => {
      toast.info(
        <p className="m-0">
          <span className="fw-bold">This is the last Number!</span>
          <br />
          <span>
            The Conductor will end the game if no other player claims bingo!
          </span>
        </p>,
        {
          autoClose: false,
          closeButton: false,
          closeOnClick: false,
        }
      );
    });

    // when next number is generated.
    socketRef.current.on("nextNum", (num) => {
      toast.info(
        <p className="m-0">
          The Next Number is: <span className="h3">{num}</span>
        </p>,
        { theme: "light" }
      );
    });

    // when a player claims bingo
    socketRef.current.on(
      "playerClaimedBingo",
      ({ playerName: claimer, description }) => {
        if (claimer === playerName) {
          toast.info(
            "You have claimed Bingo! Please wait while the conductor is reviewing your board."
          );
          localStorage.setItem("claimedState", JSON.stringify({ byMe: true }));
        } else {
          localStorage.setItem(
            "claimedState",
            JSON.stringify({ byMe: false, claimer })
          );
        }
        setClaimStatus(true);
      }
    );

    socketRef.current.on("playerDeclaredBogey", (data) => {
      localStorage.removeItem("claimedState");
      setClaimStatus(false);
      if (data.playerName !== playerName) {
        toast.info(
          `${playerName} has been declared Bogey, the game will continue.`,
          { autoClose: 3500 }
        );
      } else {
        toast.error("You have been declared Bogey! Your claim is invalid.", {
          autoClose: 3500,
        });
      }
    });

    socketRef.current.on(
      "playerDeclaredWinner",
      ({ gameTitle, playerName: winner }) => {
        if (winner === playerName) {
          toast.success(
            "You have won the game. This session will finish now.",
            { autoClose: 3000 }
          );
        } else {
          toast.info(
            `${winner} has won the game. This session will finish now! BETTER LUCK NEXT TIME.`,
            { autoClose: 3000 }
          );
        }
        setClaimStatus(false);
        setTimeout(() => {
          history.push("/");
          localStorage.clear();
        }, 1000);
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

  return { claimBingo, quittingGame, claimStatus, gameStarted, setClaimStatus };
};

export default usePlayerSocket;
