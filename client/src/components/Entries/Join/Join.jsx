import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Join.scss";

function Join() {
  const joinGameForm = useFormik({
    initialValues: {
      gameId: "",
      playerName: "",
    },
    validationSchema: Yup.object({
      gameId: Yup.string().required(
        "Please provide the game ID you want to join"
      ),
      playerName: Yup.string().required("Enter your name as the player."),
    }),
    onSubmit: (values) => console.log("values: ", values),
  });

  return (
    <div className="container-fluid px-3">
      <div className="container d-flex flex-column justify-content-center align-items-center glass-dark my-5 p-3">
        <h2 className="text-light">Join an Ongoing Game!</h2>
        <form className="w-100" onSubmit={joinGameForm.handleSubmit}>
          <div className="row">
            <div className="col-md-6 col-sm-12 my-3">
              <label htmlFor="" className="form-label text-light">
                Game ID{" "}
                <span className="fst-italic small text-warning">
                  (Required)
                </span>
              </label>
              <input
                type="text"
                autoFocus
                className="form-control form-control-sm"
                name="gameId"
                autoComplete="off"
                placeholder="Enter Game ID provided to you. . ."
                onChange={joinGameForm.handleChange}
                onBlur={joinGameForm.handleBlur}
              />
            </div>
            <div className="col-md-6 col-sm-12 my-3">
              <label htmlFor="" className="form-label text-light">
                Player Name{" "}
                <span className="fst-italic small text-warning">
                  (Required)
                </span>
              </label>
              <input
                type="text"
                autoFocus
                className="form-control form-control-sm"
                name="playerName"
                autoComplete="off"
                placeholder="Enter player name. . ."
                onChange={joinGameForm.handleChange}
                onBlur={joinGameForm.handleBlur}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end my-2">
            <button
              type="submit"
              className="btn btn-sm btn-warning fw-bold shadow"
              disabled={!joinGameForm.isValid}>
              Join GAME
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Join;
