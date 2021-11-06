import React from "react";
import useConductorSocket from "../../../hooks/conductorSocket";
import "./Conductor.scss";
import GameDetails from "./GameDetails/GameDetails";
import NumberTile from "../../Shared/NumberTile/NumberTile";
import GameStats from "./GameStats/GameStats";

function Conductor() {
  const { gameId, gameTitle } = JSON.parse(localStorage.getItem("gameData"));
  const { gameData, claimedBoard, startGame, generateNext } =
    useConductorSocket();

  return (
    <div className="container-fluid px-2 conductor scrollable">
      <div className="container my-3 p-0">
        <div className="row">
          <div className="col-md-4 col-sm-12">
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
          <div className="col-md-8 col-sm-12">
            {claimedBoard && (
              <div className="claim-tile glass-dark text-center mb-3 p-3">
                <h3 className="text-light">
                  {claimedBoard.playerName}'s Board.
                </h3>
                {/* {JSON.stringify(claimedBoard.board)} */}
                <div className="player-board d-flex justify-content-center align-items-center">
                  <div className="board-layout">
                    <div className="board-tiles">
                      <div className="column">
                        {claimedBoard.board.B.map((num) => (
                          <NumberTile
                            value={num.value}
                            key={num.value}
                            letter="B"
                            isSelected={num.selected}
                            onSelect={() => {}}
                          />
                        ))}
                      </div>
                      <div className="column">
                        {claimedBoard.board.I.map((num) => (
                          <NumberTile
                            value={num.value}
                            key={num.value}
                            letter="I"
                            isSelected={num.selected}
                            onSelect={() => {}}
                          />
                        ))}
                      </div>
                      <div className="column">
                        {claimedBoard.board.N.map((num) => (
                          <NumberTile
                            value={num.value}
                            key={num.value}
                            letter="N"
                            isSelected={num.selected}
                            onSelect={() => {}}
                          />
                        ))}
                      </div>
                      <div className="column">
                        {claimedBoard.board.G.map((num) => (
                          <NumberTile
                            value={num.value}
                            key={num.value}
                            letter="G"
                            isSelected={num.selected}
                            onSelect={() => {}}
                          />
                        ))}
                      </div>
                      <div className="column">
                        {claimedBoard.board.O.map((num) => (
                          <NumberTile
                            value={num.value}
                            key={num.value}
                            letter="O"
                            isSelected={num.selected}
                            onSelect={() => {}}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between my-2">
                  <button className="btn btn-warning fw-bold">
                    APPROVE CLAIM
                  </button>
                  <button className="btn btn-light fw-bold">
                    DECLARE BOGEY
                  </button>
                </div>
              </div>
            )}
            <GameStats gameData={gameData} />
            <GameDetails gameData={gameData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conductor;
