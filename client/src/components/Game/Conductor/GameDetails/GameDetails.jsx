import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../../config/axiosConfig";
import { API_ENDPOINTS } from "../../../../constants/constants";
import { toast } from "react-toastify";
import { Tooltip } from "react-tippy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

function GameDetails({ gameData }) {
  console.log(gameData?.boardSelection);
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
    <div className="glass-dark p-3 mb-3">
      <h2 className="text-light">Game Details: </h2>
      <p className="fw-bold">
        <span className="text-light">Game Title: </span>
        <span className="text-warning">{gameData?.name}</span>
      </p>
      <p className="fw-bold">
        <span className="text-light">Created By: </span>
        <span className="text-warning">{gameData?.conductorName}</span>
      </p>
      {gameImages && (
        <>
          <p className="fw-bold text-light">Win Pattern(s):</p>
          {gameImages.map((image) => (
            <p className="text-warning m-0" key={image.value}>
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
                position="top-start"
                trigger="click">
                {" "}
                <span className="ms-2 text-light cursor-pointer ">
                  <FontAwesomeIcon icon={faInfoCircle} />
                </span>{" "}
              </Tooltip>
            </p>
          ))}
        </>
      )}
    </div>
  );
}

export default GameDetails;
