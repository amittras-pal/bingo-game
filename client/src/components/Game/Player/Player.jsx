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
import { Link } from "react-router-dom";

function Player() {
  const { playerName, gameTitle, boardSelection, boardUrl } = JSON.parse(
    localStorage.getItem("playerInfo")
  );
  const { claimBingo, quittingGame, claimStatus, gameStarted } =
    usePlayerSocket();

  const [showConfirmLeave, setShowConfirmLeave] = useState(false);
  const [showPatterns, setShowPatterns] = useState(false);
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
    if (localStorage["started"]) setStarted(true);
  }, [gameStarted]);

  const patternsModalHandler = () => {
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
        <div className="container d-flex justify-content-between pt-3 mt-3 px-0">
          <h6>
            <span className="text-light">Player: </span>{" "}
            <span className="text-warning fst-italic">{playerName}</span>{" "}
          </h6>
          <h6 className="text-end">
            <span className="text-light">Game: </span>{" "}
            <span className="text-warning fst-italic">{gameTitle}</span>{" "}
          </h6>
        </div>
        <GameBoard />
        <div className="container d-flex justify-content-between py-3 px-0 mt-2 player-actions">
          <div className="actions">
            <button
              className="btn btn-sm btn-outline-light fw-bold"
              onClick={patternsModalHandler}>
              PATTERN
            </button>
            <Link
              to="/game-rules"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-link text-light text-decoration-none ms-2 pe-0">
              <FontAwesomeIcon icon={faInfoCircle} />
            </Link>
            <button
              className="btn btn-sm btn-link text-danger fw-bold text-decoration-none ms-2"
              onClick={confirmLeaveModalHandler}>
              <FontAwesomeIcon icon={faTimes} /> QUIT
            </button>
          </div>
          <button
            className="btn btn-sm btn-warning fw-bold me-2"
            onClick={() => claimBingo({ playerName, gameTitle })}
            disabled={!started}>
            BINGO!
          </button>
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
        <BingoModal
          show={showPatterns}
          rootclose={true}
          primaryLabel="OKAY"
          primaryBtnColor="primary"
          bodyContent={
            <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
              <img
                src={
                  process.env.REACT_APP_API_URL
                    ? process.env.REACT_APP_API_URL + boardUrl
                    : boardUrl
                }
                alt={boardSelection}
                className="img-fluid"
              />
            </div>
          }
          headerContent={
            <h2 className="text-primary">Try to make this pattern!</h2>
          }
          footerActions={[patternsModalHandler, patternsModalHandler]}
        />
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
      </div>
    </>
  );
}

export default Player;
