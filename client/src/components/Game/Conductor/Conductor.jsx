import React, { useState } from "react";
import "./Conductor.scss";

function Conductor() {
  const [currentNumber, setCurrentNumber] = useState(null);
  return (
    <div className="container-fluid px-2 conductor">
      <div className="container my-3">
        <div className="row">
          <div className="col-md-4 col-sm-12">
            <div className="generator-tile mb-3 p-3 text-center shadow glass-dark">
              <h6 className="text-light">
                Start the game to generate the first number
              </h6>
              <div className="container text-center current text-light fw-bold">
                XX
              </div>
              <div className="conductor-actions mt-4">
                <button className="btn btn-warning fw-bold shadow">
                  START GAME
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-8 col-sm-12">
            <div className="glass-dark p-3 mb-3">
              <h2 className="text-light">Game Stats</h2>
              <p className="fw-bold">
                <span className="text-light">Players Connected: </span>
                <span className="text-warning">00</span>
              </p>
              <p className="fw-bold">
                <span className="text-light">Started: </span>
                <span className="text-warning">Game Not Started Yet</span>
              </p>
              <p className="fw-bold">
                <span className="text-light">Used Numbers: </span>
                <span className="badge mx-1 rounded-pill bg-info text-dark">
                  1
                </span>
                <span className="badge mx-1 rounded-pill bg-info text-dark">
                  2
                </span>
                <span className="badge mx-1 rounded-pill bg-info text-dark">
                  3
                </span>
                <span className="badge mx-1 rounded-pill bg-info text-dark">
                  4
                </span>
                <span className="badge mx-1 rounded-pill bg-info text-dark">
                  5
                </span>
                <span className="badge mx-1 rounded-pill bg-info text-dark">
                  6
                </span>
                <span className="badge mx-1 rounded-pill bg-info text-dark">
                  7
                </span>
                <span className="badge mx-1 rounded-pill bg-info text-dark">
                  8
                </span>
                <span className="badge mx-1 rounded-pill bg-info text-dark">
                  9
                </span>
                <span className="badge mx-1 rounded-pill bg-info text-dark">
                  10
                </span>
              </p>
            </div>
            <div className="glass-dark p-3 mb-3">
              <h2 className="text-light">Game Settings</h2>
              <p className="fw-bold text-light">Win Pattern(s):</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conductor;
