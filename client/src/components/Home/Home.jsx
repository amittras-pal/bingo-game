import React from "react";
import { Link } from "react-router-dom";
import bingoLogo from "../../resources/images/bingo-01.png";

function Home() {
  return (
    <div className="container-fluid px-2">
      <h4 className="text-light text-center w-100 mt-3">
        Alchemist's Hobby Shop <br />{" "}
        <span className="fst-italic small text-warning">Presents</span>
      </h4>
      <div className="home-tile container d-flex flex-column justify-content-center align-items-center rounded shadow">
        <img src={bingoLogo} alt="" className="mb-3" style={{ width: "75%" }} />
        <div className="row w-100">
          <div className="col-md-6 col-lg-6 mb-3">
            <Link to="/new-game" className="btn shadow fw-bold btn-light w-100">
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
  );
}

export default Home;
