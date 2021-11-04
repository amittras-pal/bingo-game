import React from "react";

function GameDetails({ gameData }) {
  return (
    <div className="glass-dark p-3 mb-3">
      <h2 className="text-light">Game Details: </h2>
      <p className="fw-bold text-light">Win Pattern(s):</p>
      <p className="fw-bold">
        <span className="text-light">Game Title: </span>
        <span className="text-warning">{gameData?.name}</span>
      </p>
      <p className="fw-bold">
        <span className="text-light">Created By: </span>
        <span className="text-warning">{gameData?.conductorName}</span>
      </p>
    </div>
  );
}

export default GameDetails;
