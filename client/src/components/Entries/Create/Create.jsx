import React from "react";
import "./Create.scss";

function Create() {
  return (
    <div className="container-fluid px-3">
      <div className="container d-flex flex-column justify-content-center align-items-center glass-dark my-5 p-3">
        <h2 className="text-light">Create a New Game</h2>
        <form className="w-100">
          <div className="row">
            <div className="col-md-6 col-sm-12 my-3">
              <label htmlFor="" className="form-label text-light">
                Game Title{" "}
                <span className="fst-italic small text-warning">
                  (Required)
                </span>
              </label>
              <input type="text" className="form-control form-control-sm" />
            </div>
            <div className="col-md-6 col-sm-12 my-3">
              <label htmlFor="" className="form-label text-light">
                Conductor Name{" "}
                <span className="fst-italic small text-warning">
                  (Required)
                </span>
              </label>
              <input type="text" className="form-control form-control-sm" />
            </div>
          </div>
          <div className="d-flex justify-content-end my-2">
            <button className="btn btn-sm btn-warning fw-bold shadow" disabled>
              CREATE GAME
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
