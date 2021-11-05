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
  const [showConfirmLeave, setShowConfirmLeave] = useState(false);

  const { playerData } = usePlayerSocket();

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
          <button className="btn btn-success fw-bold me-2">BINGO!</button>
          <button className="btn btn-light fw-bold">Patterns</button>
        </div>
        <div className="info">
          <a
            className="game-rules shadow"
            target="_blank"
            rel="noreferrer"
            href="https://www.atlanticbingosupply.com/about/howto-play-bingo">
            <FontAwesomeIcon icon={faInfoCircle} />
          </a>
        </div>
      </div>
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
    </div>
  );
}

export default Player;
