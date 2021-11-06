import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../../config/axiosConfig";
import { API_ENDPOINTS } from "../../../../constants/constants";
import { toast } from "react-toastify";
import { Tooltip } from "react-tippy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

function GameDetails({ gameData }) {
  const [gameImages, setGameImages] = useState(null);
  useEffect(() => {
    async function retrieveBoardOptions() {
      try {
        const { data } = await axiosInstance.get(API_ENDPOINTS.boardOptions);
        const patterns = Object.entries(data).map(([key, value]) => ({
          value: key,
          url: value,
        }));
        const gameBoard = patterns.filter((pattern) =>
          gameData?.boardSelection.includes(pattern.value)
        );
        setGameImages(gameBoard);
      } catch (error) {
        toast.error("Something Went wrong while retrieving board options.");
      }
    }
    retrieveBoardOptions();
  }, [gameData]);
  return (
    <div className="p-3 mb-3 shadow rounded border border-primary bg-light">
      <h2 className="text-primary">Game Details: </h2>
      <p className="fw-bold">
        <span className="text-muted">Game Title: </span>
        <span className="text-primary">{gameData?.name}</span>
      </p>
      <p className="fw-bold">
        <span className="text-muted">Created By: </span>
        <span className="text-primary">{gameData?.conductorName}</span>
      </p>
      {gameImages && (
        <>
          <p className="fw-bold text-muted mb-2">Win Pattern(s):</p>
          <div className="row">
            {gameImages.map((image) => (
              <div className="col-md-4 col-sm-12" key={image.value}>
                <p className="text-primary m-0">
                  {image.value}{" "}
                  <Tooltip
                    tag="span"
                    html={
                      <img
                        src={image.url}
                        alt={image.value}
                        className="img-fluid mb-2"
                      />
                    }
                    arrow
                    theme="light"
                    position="auto"
                    trigger="click">
                    <span className="ms-1 text-primary cursor-pointer ">
                      <FontAwesomeIcon icon={faInfoCircle} />
                    </span>
                  </Tooltip>
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default GameDetails;
