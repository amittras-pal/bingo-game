import React from "react";
import useConductorSocket from "../../../hooks/conductorSocket";
import "./Conductor.scss";
import GameDetails from "./GameDetails/GameDetails";
import GameStats from "./GameStats/GameStats";

function Conductor() {
  const { gameId, gameTitle } = JSON.parse(localStorage.getItem("gameData"));
  const { gameData, startGame, generateNext } = useConductorSocket();

  return (
    <div className="container-fluid px-2 conductor scrollable">
      <div className="container my-3 p-0">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="generator-tile mb-3 p-3 text-center shadow glass-dark">
              {gameData?.started ? (
                <h6 className="text-light">Click button to get next number</h6>
              ) : (
                <h6 className="text-light">
                  Start the game to generate the first number
                </h6>
              )}
              <div className="container text-center current text-light fw-bold">
                {gameData?.next ? <>{gameData.next}</> : <>XX</>}
              </div>
              <div className="conductor-actions mt-4">
                {gameData?.started ? (
                  <button
                    className="btn btn-light fw-bold shadow"
                    onClick={() => generateNext({ gameId, gameTitle })}>
                    NEXT NUMBER
                  </button>
                ) : (
                  <button
                    className="btn btn-warning fw-bold shadow"
                    onClick={() => startGame({ gameId, gameTitle })}>
                    START GAME
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <GameStats gameData={gameData} />
            <GameDetails gameData={gameData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conductor;
