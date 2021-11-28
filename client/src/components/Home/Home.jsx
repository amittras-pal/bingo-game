import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import bingoLogo from "../../resources/images/bingo-01.png";
import { duration } from "../../utils/utils";
import { DateTime } from "luxon";
import BingoModal from "../Shared/BingoModal/BingoModal";
import { axiosInstance } from "../../config/axiosConfig";
import { API_ENDPOINTS } from "../../constants/constants";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Home.scss";

function Home() {
  const [gameReport, setGameReport] = useState(null);
  const history = useHistory();
  useEffect(() => {
    if (localStorage["showReportFor"]) {
      (async () => {
        try {
          const gameId = localStorage.getItem("showReportFor");
          console.log(gameId);
          const { data } = await axiosInstance.get(
            API_ENDPOINTS.gameReport + gameId
          );
          setGameReport(data.response);
        } catch (error) {
          toast.error("Failed to get the report for last game!");
          console.log(error);
          console.log(error.response);
        }
      })();
    }
  }, []);

  const closeReport = () => {
    setGameReport(null);
    localStorage.clear();
  };

  const startNewGame = () => {
    setGameReport(null);
    localStorage.clear();
    history.push("/new-game");
  };

  return (
    <>
      <div className="container-fluid px-2">
        <h4 className="text-light text-center w-100 mt-3">
          Alchemist's Hobby Shop <br />{" "}
          <span className="fst-italic small text-warning">Presents</span>
        </h4>
        <div className="home-tile container d-flex flex-column justify-content-center align-items-center rounded shadow">
          <img src={bingoLogo} alt="" className="mb-3 bingo-poster" />
          <div className="row w-100">
            <div className="col-md-6 col-lg-6 mb-3">
              <Link
                to="/new-game"
                className="btn shadow fw-bold btn-light w-100">
                START A NEW GAME
              </Link>
            </div>
            <div className="col-md-6 col-lg-6 mb-3">
              <Link
                to="/join-game"
                className="btn shadow fw-bold btn-outline-light w-100">
                JOIN A GAME
              </Link>
            </div>
          </div>
        </div>
        <div className="container d-flex justify-content-center px-0 border-top border-warning mt-3">
          <Link
            to="/game-rules"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-link text-light text-decoration-none fw-bold">
            About & Instructions
          </Link>
        </div>
      </div>
      <BingoModal
        show={gameReport ? true : false}
        className="game-report-modal"
        primaryBtnColor="danger"
        secondaryBtnColor="primary"
        footerActions={[startNewGame, closeReport]}
        primaryLabel={
          <>
            <span>
              <FontAwesomeIcon icon={faTimes} />
            </span>{" "}
            &nbsp;<span>CLOSE</span>
          </>
        }
        secondaryLabel={
          <>
            <span>
              <FontAwesomeIcon icon={faPen} />
            </span>{" "}
            &nbsp;<span>NEW GAME</span>
          </>
        }
        bodyContent={
          <>
            {gameReport && (
              <>
                <p className="fw-bold">
                  <span className="text-muted">Game Title: </span>
                  <span className="text-primary">{gameReport.name}</span>
                </p>
                <p className="fw-bold">
                  <span className="text-muted">Created By: </span>
                  <span className="text-primary">
                    {gameReport.conductorName}
                  </span>
                </p>
                <p className="fw-bold">
                  <span className="text-muted">Started: </span>
                  <span className="text-primary">
                    {DateTime.fromISO(gameReport.created).toLocaleString(
                      DateTime.DATETIME_MED
                    )}
                  </span>
                </p>
                <p className="fw-bold">
                  <span className="text-muted">Finished: </span>
                  <span className="text-primary">
                    {DateTime.fromISO(gameReport.finished).toLocaleString(
                      DateTime.DATETIME_MED
                    )}{" "}
                  </span>{" "}
                  <span className="fw-normal text-danger">
                    {`${
                      duration(gameReport.finished, gameReport.created).hours
                    }:${
                      duration(gameReport.finished, gameReport.created).minutes
                    }:${
                      duration(gameReport.finished, gameReport.created).minutes
                    } hrs.`}
                  </span>
                </p>
                <p className="fw-bold">
                  <span className="text-muted">Winner: </span>
                  <span className="text-primary">
                    {gameReport.winner ? (
                      gameReport.winner
                    ) : (
                      <>
                        No Winner Declared <br />
                        <span className="fst-italic fw-normal small">
                          (game was finished before anybody won.)
                        </span>
                      </>
                    )}
                  </span>
                </p>
              </>
            )}
          </>
        }
        headerContent={
          <h2>
            {gameReport ? (
              <>
                <span>Report:</span>{" "}
                <span className="text-primary">{gameReport?.name}</span>
              </>
            ) : (
              "Loading Last Game Report!"
            )}
          </h2>
        }
      />
    </>
  );
}

export default Home;
