import React, { useEffect, useState } from "react";
import BingoModal from "../../Shared/BingoModal/BingoModal";
import GameBoard from "./GameBoard/GameBoard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faForward,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import usePlayerSocket from "../../../hooks/playerSocket";
import "./Player.scss";

function Player() {
  const { playerName, gameTitle, boardSelection, boards } = JSON.parse(
    localStorage.getItem("playerInfo")
  );
  const { claimBingo, quittingGame, claimStatus, setClaimStatus } =
    usePlayerSocket();

  const [showConfirmLeave, setShowConfirmLeave] = useState(false);
  const [showPatterns, setShowPatterns] = useState(false);
  const [gameImages, setGameImages] = useState(null);
  const [claimState, setClaimState] = useState(null);

  useEffect(() => {
    if (claimStatus) {
      console.log("effect running");
      const claimed = JSON.parse(localStorage.getItem("claimedState"));
      if (claimed) {
        setClaimState(claimed);
      }
    }
  }, [claimStatus, setClaimState]);

  useEffect(() => {
    if (localStorage["claimedState"]) {
      const claimed = JSON.parse(localStorage.getItem("claimedState"));
      setClaimState(claimed);
    }
  }, [setClaimStatus]);

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
        <GameBoard />
        <div className="container d-flex justify-content-between py-3 px-0 mt-3 player-actions">
          <div className="info">
            <a
              className="game-rules-btn bg-dark text-light shadow"
              target="_blank"
              rel="noreferrer"
              href="https://www.atlanticbingosupply.com/about/howto-play-bingo">
              <FontAwesomeIcon icon={faInfoCircle} />
            </a>
          </div>
          <div className="actions">
            <button
              className="btn btn-primary fw-bold me-3"
              onClick={() => claimBingo({ playerName, gameTitle })}>
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
          headerContent={<h2>Quit Game?</h2>}
          bodyContent={
            <p className="m-0">Are you sure you want to quit this game?</p>
          }
          footerActions={[continuePlaying, quitGame]}
        />
        {/* Someone else has a Bingo Claimed */}
        <BingoModal
          show={claimState && !claimState.byMe}
          className="bingo-claimed-blocker-modal"
          bodyContent={
            <p>
              <span className="fw-bold text-primary">
                {claimState?.playerName}
              </span>{" "}
              has claimed Bingo! PLease wait while it is reviewed.
            </p>
          }
          headerContent={<h2>Bingo has been claimed!</h2>}
        />
      </div>
    </>
  );
}

export default Player;
