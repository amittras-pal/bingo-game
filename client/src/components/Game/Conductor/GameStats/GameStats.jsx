import React from "react";
import { DateTime } from "luxon";
import { Tooltip } from "react-tippy";

function GameStats({ gameData }) {
  return (
    <div className="p-3 mb-3 border border-primary rounded shadow bg-light">
      <h2 className="text-primary">Game Stats</h2>
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

        <Tooltip
          tag="span"
          html={
            <>
              {gameData?.players.map((player, index) => (
                <p className="m-0" key={index}>
                  {player}
                </p>
              ))}
            </>
          }
          arrow
          theme="light"
          position="auto"
          trigger="click">
          <span className="text-primary cursor-pointer">
            {gameData?.players?.length}
          </span>
        </Tooltip>
      </p>
      <p className="fw-bold mb-2">
        <span className="text-muted">Used Numbers: </span>
        {gameData?.usedNumbers.length > 0 ? (
          gameData.usedNumbers.map((num, index) => (
            <span
              className={`badge mx-1 text-light ${
                index === gameData.usedNumbers.length - 1
                  ? "bg-primary"
                  : "bg-secondary"
              } `}
              key={num}>
              {num}
            </span>
          ))
        ) : (
          <span className="fw-bold text-primary">Game not started yet.</span>
        )}
      </p>
    </div>
  );
}

export default GameStats;
