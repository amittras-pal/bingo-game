import React from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../config/axiosConfig";
import "./Create.scss";
import { API_ENDPOINTS } from "../../../constants/constants";

function Create() {
  const history = useHistory();
  const createNewGame = async (values) => {
    try {
      const { data } = await axiosInstance.post(API_ENDPOINTS.newGame, values);
      toast.success(data.description);
      localStorage.setItem("gameData", JSON.stringify(data.response));
      history.push("/conductor");
    } catch (error) {
      const {
        response: { data },
      } = error;
      toast.error(data.description);
    }
  };
  const newGameForm = useFormik({
    initialValues: {
      gameTitle: "",
      conductorName: "",
    },
    validationSchema: Yup.object({
      gameTitle: Yup.string().required("You must provide a game title!"),
      conductorName: Yup.string().required(
        "Enter your name as the game conductor."
      ),
    }),
    onSubmit: createNewGame,
  });

  return (
    <div className="container-fluid px-3">
      <div className="container d-flex flex-column justify-content-center align-items-center glass-dark my-5 p-3">
        <h2 className="text-light">Create a New Game</h2>
        <form className="w-100" onSubmit={newGameForm.handleSubmit}>
          <div className="row">
            <div className="col-md-6 col-sm-12 my-3">
              <label htmlFor="" className="form-label text-light">
                Game Title{" "}
                <span className="fst-italic small text-warning">
                  (Required)
                </span>
              </label>
              <input
                type="text"
                autoFocus
                className="form-control form-control-sm"
                name="gameTitle"
                autoComplete="off"
                placeholder="Enter a game title. . ."
                onChange={newGameForm.handleChange}
                onBlur={newGameForm.handleBlur}
              />
            </div>
            <div className="col-md-6 col-sm-12 my-3">
              <label htmlFor="" className="form-label text-light">
                Conductor Name{" "}
                <span className="fst-italic small text-warning">
                  (Required)
                </span>
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                name="conductorName"
                autoComplete="off"
                placeholder="Enter game conductor name. . ."
                onChange={newGameForm.handleChange}
                onBlur={newGameForm.handleBlur}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end my-2">
            <button
              type="submit"
              className="btn btn-sm btn-warning fw-bold shadow"
              disabled={!newGameForm.isValid}>
              CREATE GAME
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
