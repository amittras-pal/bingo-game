import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

function Home() {
  return (
    <div className="container-fluid px-3">
      <div className="container d-flex flex-column justify-content-center align-items-center glass-dark my-5 p-3">
        <h1 className="text-light text-center pb-4 border-light border-bottom w-100">
          Welcome to
          <br /> <span className="text-warning">Online Bingo Game</span>
        </h1>
        <div className="d-flex flex-column mt-4 w-100">
          <Link
            to="/new-game"
            className="btn btn-lg shadow fw-bold btn-warning mb-4">
            START A NEW GAME
          </Link>
          <Link
            to="/join-game"
            className="btn btn-lg shadow fw-bold btn-light mb-3">
            JOIN A GAME
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
