import React from "react";
import { DateTime } from "luxon";

function GameStats({ gameData }) {
  return (
    <div className="glass-dark p-3 mb-3">
      <h2 className="text-light">Game Stats</h2>
      <p className="fw-bold">
        <span className="text-light">Game Created: </span>
        <span className="text-warning">
          {DateTime.fromISO(gameData?.created).toLocaleString(
            DateTime.DATETIME_MED
          )}
        </span>
      </p>
      <p className="fw-bold">
        <span className="text-light">Started: </span>
        <span className="text-warning">{`${
          gameData?.started
            ? DateTime.fromISO(gameData?.started).toLocaleString(
                DateTime.DATETIME_MED
              )
            : "Game Not Started Yet"
        }`}</span>
      </p>
      <p className="fw-bold">
        <span className="text-light">Players Connected: </span>
        <span className="text-warning">{gameData?.players?.length}</span>
      </p>
      <p className="fw-bold">
        <span className="text-light">Used Numbers: </span>
        {gameData?.usedNumbers.length > 0 &&
          gameData.usedNumbers
            .sort((a, b) => a - b)
            .map((num) => (
              <span className="badge mx-1  bg-info text-dark shadow" key={num}>
                {num}
              </span>
            ))}
      </p>
    </div>
  );
}

export default GameStats;