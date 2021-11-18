import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateTime } from "luxon";
import React from "react";
import { Tooltip } from "react-tippy";

function GameDetails({ gameData }) {
  console.log(gameData);
  // const [gameImages, setGameImages] = useState(null);
  // useEffect(() => {
  //   async function retrieveBoardOptions() {
  //     try {
  //       const { data } = await axiosInstance.get(API_ENDPOINTS.boardOptions);
  //       const patterns = Object.entries(data).map(([key, value]) => ({
  //         value: key,
  //         url: value,
  //       }));
  //       const gameBoard = patterns.filter((pattern) =>
  //         gameData?.boardSelection.includes(pattern.value)
  //       );
  //       setGameImages(gameBoard);
  //     } catch (error) {
  //       toast.error("Something Went wrong while retrieving board options.");
  //     }
  //   }
  //   retrieveBoardOptions();
  // }, [gameData]);
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
      <p className="fw-bold">
        <span className="text-muted">Created: </span>
        <span className="text-primary">
          {DateTime.fromISO(gameData?.created).toLocaleString(
            DateTime.DATETIME_MED
          )}
        </span>
      </p>

      <p className="fw-bold text-muted mb-2">Win Pattern(s):</p>
      <div className="row">
        {gameData && (
          <p className="text-primary m-0">
            {gameData?.boardSelection}{" "}
            <Tooltip
              tag="span"
              html={
                <img
                  src={
                    process.env.REACT_APP_API_URL
                      ? process.env.REACT_APP_API_URL + gameData?.boardUrl
                      : gameData?.boardUrl
                  }
                  alt={gameData.boardSelection}
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
        )}
      </div>
    </div>
  );
}

export default GameDetails;
