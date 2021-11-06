import React from "react";
import { DateTime } from "luxon";

function GameStats({ gameData }) {
  return (
    <div className="p-3 mb-3 border border-primary rounded shadow bg-light">
      <h2 className="text-primary">Game Stats</h2>
      <p className="fw-bold">
        <span className="text-muted">Game Created: </span>
        <span className="text-primary">
          {DateTime.fromISO(gameData?.created).toLocaleString(
            DateTime.DATETIME_MED
          )}
        </span>
      </p>
      <p className="fw-bold">
        <span className="text-muted">Started: </span>
        <span className="text-primary">{`${
          gameData?.started
            ? DateTime.fromISO(gameData?.started).toLocaleString(
                DateTime.DATETIME_MED
              )
            : "Game Not Started Yet"
        }`}</span>
      </p>
      <p className="fw-bold">
        <span className="text-muted">Players Connected: </span>
        <span className="text-primary">{gameData?.players?.length}</span>
      </p>
      <p className="fw-bold mb-2">
        <span className="text-muted">Used Numbers: </span>
        {gameData?.usedNumbers.length > 0 ? (
          gameData.usedNumbers.map((num, index) => (
            <span
              className={`badge mx-1 ${
                index === gameData.usedNumbers.length - 1
                  ? "bg-primary text-light"
                  : "bg-secondary text-dark"
              } `}
              key={num}>
              {num}
            </span>
          ))
        ) : (
          <span className="fw-bold text-primary">Game not staarted yet.</span>
        )}
      </p>
    </div>
  );
}

export default GameStats;
