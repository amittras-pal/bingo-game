import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();

  const { playerName, gameTitle, boardSelection, boards } = JSON.parse(
    localStorage.getItem("playerInfo")
  );
  const { claimBingo, claimStatus } = usePlayerSocket();

  const [showConfirmLeave, setShowConfirmLeave] = useState(false);
  const [showPatterns, setShowPatterns] = useState(false);
  const [gameImages, setGameImages] = useState(null);

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
    localStorage.clear();
    history.push("/");
    confirmLeaveModalHandler();
  };
  const continuePlaying = () => {
    confirmLeaveModalHandler();
  };

  return (
    <div className="container-fluid px-3">
      <GameBoard />
      <div className="container d-flex justify-content-between py-3 px-0 mt-3 player-actions">
        <div className="actions">
          <button
            className="btn btn-danger fw-bold me-2"
            onClick={confirmLeaveModalHandler}>
            Quit
          </button>
          <button
            className="btn btn-success fw-bold me-2"
            onClick={() => claimBingo({ playerName, gameTitle })}>
            BINGO!
          </button>
          <button
            className="btn btn-light fw-bold"
            onClick={patternsModalHandler}>
            Patterns
          </button>
        </div>
        <div className="info">
          <a
            className="game-rules-btn shadow"
            target="_blank"
            rel="noreferrer"
            href="https://www.atlanticbingosupply.com/about/howto-play-bingo">
            <FontAwesomeIcon icon={faInfoCircle} />
          </a>
        </div>
      </div>
      {/* Patterns */}
      <BingoModal
        show={showPatterns}
        rootclose={true}
        primaryLabel="OKAY"
        primaryBtnColor="success"
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
        headerContent={<h2>Win Patterns</h2>}
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

      {/* Bingo Claimed */}
      <BingoModal
        show={claimStatus?.showClaimed}
        bodyContent={<p>{claimStatus?.description}</p>}
        headerContent={<h2>Bingo has been claimed!</h2>}
      />
    </div>
  );
}

export default Player;
