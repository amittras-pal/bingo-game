import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container-fluid px-2">
      <div className="container d-flex flex-column justify-content-center bg-light align-items-center my-5 border border-primary p-4 rounded shadow">
        <h1 className="text-primary text-center pb-4 border-primary border-bottom w-100">
          Online Bingo Game
        </h1>
        <div className="d-flex flex-column mt-4 w-100">
          <Link
            to="/new-game"
            className="btn btn-lg shadow fw-bold btn-primary mb-4">
            START A NEW GAME
          </Link>
          <Link
            to="/join-game"
            className="btn btn-lg shadow fw-bold btn-outline-primary mb-3">
            JOIN A GAME
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
