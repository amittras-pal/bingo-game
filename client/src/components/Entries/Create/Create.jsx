import React, { useEffect, useState } from "react";
import { Field, useFormik, FormikProvider } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../config/axiosConfig";
import { Tooltip } from "react-tippy";
import "./Create.scss";
import { API_ENDPOINTS } from "../../../constants/constants";

function Create() {
  const history = useHistory();
  const [gamePatterns, setGamePatterns] = useState(null);

  useEffect(() => {
    async function retrieveBoardOptions() {
      try {
        const { data } = await axiosInstance.get(API_ENDPOINTS.boardOptions);
        const patterns = Object.entries(data).map(([key, value]) => ({
          value: key,
          url: value,
        }));
        setGamePatterns(patterns);
      } catch (error) {
        toast.error("Something Went Wrong while retrieving board options.");
      }
    }
    retrieveBoardOptions();
  }, []);

  const createNewGame = async (values) => {
    try {
      const { data } = await axiosInstance.post(API_ENDPOINTS.newGame, values);
      toast.success(data.description);
      localStorage.setItem("gameData", data.response);
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
      boardSelection: [],
    },
    validationSchema: Yup.object({
      gameTitle: Yup.string().required("You must provide a game title!"),
      conductorName: Yup.string().required(
        "Enter your name as the game conductor."
      ),
      boardSelection: Yup.array()
        .min(1, "At least one pattern needs to be selected.")
        .required("Required."),
    }),
    validateOnMount: true,
    onSubmit: createNewGame,
  });

  return (
    <div
      className="container-fluid px-3"
      style={{ overflowY: "auto", maxHeight: "100vh" }}>
      <div className="container d-flex flex-column justify-content-center align-items-center glass-dark my-5 p-3">
        <h2 className="text-light">Create a New Game</h2>
        {gamePatterns && (
          <FormikProvider value={newGameForm}>
            <form className="w-100" onSubmit={newGameForm.handleSubmit}>
              <div className="row">
                <div className="col-md-6 col-sm-12 my-3">
                  <label htmlFor="" className="form-label text-light">
                    Game Title{" "}
                    <span className="fst-italic small text-warning">
                      (Required):
                    </span>
                  </label>
                  <Field
                    type="text"
                    autoFocus
                    className="form-control form-control-sm"
                    name="gameTitle"
                    autoComplete="off"
                    placeholder="Enter a game title. . ."
                  />
                </div>
                <div className="col-md-6 col-sm-12 my-3">
                  <label htmlFor="" className="form-label text-light">
                    Conductor Name{" "}
                    <span className="fst-italic small text-warning">
                      (Required):
                    </span>
                  </label>
                  <Field
                    type="text"
                    className="form-control form-control-sm"
                    name="conductorName"
                    autoComplete="off"
                    placeholder="Enter game conductor name. . ."
                  />
                </div>
              </div>
              <p className="text-light fw-bold">
                Select Win Board(s) <br />
                <span className="fw-normal small">
                  Click on the label to view board
                </span>
                <span className="fw-normal fst-italic small text-warning">
                  {" "}
                  (At least one required!):
                </span>
              </p>
              <div className="row mb-4" role="group">
                {gamePatterns?.map((pattern) => (
                  <div className="col-md-3 col-sm-6" key={pattern.value}>
                    <div className="form-check">
                      <label className="form-check-label text-light cursor-pointer">
                        <Field
                          type="checkbox"
                          className="form-check-input"
                          name="boardSelection"
                          value={pattern.value}
                        />
                        <span>{pattern.value}</span>
                      </label>
                      <Tooltip
                        arrow
                        theme="light"
                        html={
                          <img
                            alt={pattern.value}
                            src={pattern.url}
                            className="tooltip-image"
                          />
                        }
                        position="bottom"
                        trigger="click">
                        <span className="ms-2 text-light cursor-pointer">
                          <FontAwesomeIcon icon={faInfoCircle} />{" "}
                        </span>
                      </Tooltip>
                    </div>
                  </div>
                ))}
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
          </FormikProvider>
        )}
      </div>
    </div>
  );
}

export default Create;
