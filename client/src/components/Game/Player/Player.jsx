import React, { useEffect, useState } from "react";
import BingoModal from "../../Shared/BingoModal/BingoModal";
import GameBoard from "./GameBoard/GameBoard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faForward } from "@fortawesome/free-solid-svg-icons";
import usePlayerSocket from "../../../hooks/playerSocket";
import "./Player.scss";
import { Link } from "react-router-dom";

function Player() {
  const { playerName, gameTitle, boardSelection, boards } = JSON.parse(
    localStorage.getItem("playerInfo")
  );
  const { claimBingo, quittingGame, claimStatus, gameStarted } =
    usePlayerSocket();

  const [showConfirmLeave, setShowConfirmLeave] = useState(false);
  const [showPatterns, setShowPatterns] = useState(false);
  const [gameImages, setGameImages] = useState(null);
  const [claimState, setClaimState] = useState(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (claimStatus) {
      const claimed = JSON.parse(localStorage.getItem("claimedState"));
      if (claimed) {
        setClaimState(claimed);
      }
    } else {
      setClaimState(null);
    }
  }, [claimStatus, setClaimState]);

  useEffect(() => {
    if (gameStarted) {
      if (localStorage["started"]) setStarted(true);
    }
  }, [gameStarted]);

  const patternsModalHandler = () => {
    const patterns = Object.entries(boards).map(([key, value]) => ({
      value: key,
      url: value,
    }));
    const gameBoards = patterns.filter((pattern) =>
      boardSelection.includes(pattern.value)
    );
    setGameImages(gameBoards);
    setShowPatterns(!showPatterns);
  };

  const confirmLeaveModalHandler = () => setShowConfirmLeave(!showConfirmLeave);
  const quitGame = () => {
    quittingGame({ playerName, gameTitle });
  };
  const continuePlaying = () => {
    confirmLeaveModalHandler();
  };

  return (
    <>
      {claimState && claimState.byMe && (
        <div
          className="block-claimer-overlay"
          onClick={(e) => {
            e.stopPropagation();
          }}></div>
      )}
      <div className="container-fluid px-3">
        <div className="container d-flex justify-content-between pt-3 px-0">
          <h4>
            <span className="text-muted">Player: </span>{" "}
            <span className="text-primary fst-italic">{playerName}</span>{" "}
          </h4>
          <h4>
            <span className="text-muted">Game: </span>{" "}
            <span className="text-primary fst-italic">{gameTitle}</span>{" "}
          </h4>
        </div>
        <GameBoard />
        <div className="container d-flex justify-content-between py-3 px-0 mt-2 player-actions">
          <Link
            to="/game-rules"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-link text-primary fw-bold text-decoration-none">
            HOW TO PLAY
          </Link>
          <div className="actions">
            <button
              className="btn btn-primary fw-bold me-3"
              onClick={() => claimBingo({ playerName, gameTitle })}
              disabled={!started}>
              BINGO!
            </button>
            <button
              className="btn btn-outline-primary fw-bold"
              onClick={patternsModalHandler}>
              PATTERN
            </button>
            <button
              className="btn btn-link text-danger fw-bold text-decoration-none"
              onClick={confirmLeaveModalHandler}>
              <FontAwesomeIcon icon={faTimes} /> QUIT
            </button>
          </div>
        </div>
        <BingoModal
          show={claimState && !claimState.byMe}
          className="bingo-claimed-blocker-modal"
          bodyContent={
            <p>
              <span className="fw-bold text-primary">
                {claimState?.claimer}
              </span>{" "}
              has claimed Bingo! Please wait while it is being reviewed by the
              conductor!
            </p>
          }
          headerContent={<h2>Bingo has been claimed!</h2>}
        />
        {/* View the Game Patterns. */}
        <BingoModal
          show={showPatterns}
          rootclose={true}
          primaryLabel="OKAY"
          primaryBtnColor="primary"
          bodyContent={
            <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
              {gameImages?.map((image) => (
                <img
                  src={image.url}
                  alt={image.value}
                  className="img-fluid"
                  key={image.value}
                />
              ))}
            </div>
          }
          headerContent={
            <h2 className="text-primary">Try to make this pattern!</h2>
          }
          footerActions={[patternsModalHandler, patternsModalHandler]}
        />
        {/* Confirm Quit Game */}
        <BingoModal
          show={showConfirmLeave}
          rootclose={true}
          primaryLabel={
            <>
              <span>
                <FontAwesomeIcon icon={faTimes} />
              </span>{" "}
              &nbsp;<span>CONFIRM</span>
            </>
          }
          secondaryLabel={
            <>
              <span>
                <FontAwesomeIcon icon={faForward} />
              </span>{" "}
              &nbsp;<span>KEEP PLAYING</span>
            </>
          }
          primaryBtnColor="danger"
          secondaryBtnColor="primary"
          headerContent={<h2 className="text-danger">Quit Game?</h2>}
          bodyContent={
            <p className="m-0">
              Are you sure you want to quit this game? <br />
              <span className="fw-bold">NOTE: </span> You will be able to join
              back into the game if the game has not yet started.
            </p>
          }
          footerActions={[continuePlaying, quitGame]}
        />
        {/* Someone else has a Bingo Claimed */}
      </div>
    </>
  );
}

export default Player;
