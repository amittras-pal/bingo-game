import React from "react";
import { useFormik, Field, FormikProvider } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useHistory } from "react-router";
import { axiosInstance } from "../../../config/axiosConfig";
import { API_ENDPOINTS } from "../../../constants/constants";

function Join() {
  const history = useHistory();

  const joinGame = async (values) => {
    try {
      const { data } = await axiosInstance.post(API_ENDPOINTS.joinGame, values);
      toast.success(data.description);
      const { playerName, gameTitle, boardSelection, boardUrl, board } =
        data.response;
      localStorage.setItem(
        "playerInfo",
        JSON.stringify({ playerName, gameTitle, boardSelection, boardUrl })
      );
      localStorage.setItem("board", JSON.stringify(board));
      history.push("/game");
    } catch (error) {
      toast.error(error.response.data.description);
    }
  };

  const joinGameForm = useFormik({
    initialValues: {
      gameTitle: "",
      playerName: "",
    },
    validationSchema: Yup.object({
      gameTitle: Yup.string().required(
        "Please provide the game ID you want to join"
      ),
      playerName: Yup.string().required("Enter your name as the player."),
    }),
    onSubmit: joinGame,
  });

  return (
    <div className="container-fluid px-3">
      <div className="container d-flex flex-column justify-content-center align-items-center my-5 p-4 bg-light rounded shadow border border-primary">
        <h2 className="text-primary">Join an Ongoing Game!</h2>
        <FormikProvider value={joinGameForm}>
          <form className="w-100" onSubmit={joinGameForm.handleSubmit}>
            <div className="row">
              <div className="col-md-6 col-sm-12 my-3">
                <label className="form-label text-primary">
                  Game ID{" "}
                  <span className="fst-italic small text-danger">
                    (Required)
                  </span>
                </label>
                <Field
                  type="text"
                  autoFocus
                  className="form-control form-control-sm text-primary fw-bold"
                  name="gameTitle"
                  autoComplete="off"
                  placeholder="Enter Game ID provided to you. . ."
                />
              </div>
              <div className="col-md-6 col-sm-12 my-3">
                <label htmlFor="" className="form-label text-primary">
                  Player Name{" "}
                  <span className="fst-italic small text-danger">
                    (Required)
                  </span>
                </label>
                <Field
                  type="text"
                  className="form-control form-control-sm text-primary fw-bold"
                  name="playerName"
                  autoComplete="off"
                  placeholder="Enter player name. . ."
                />
              </div>
            </div>
            <div className="d-flex justify-content-end my-2">
              <button
                type="submit"
                className="btn btn-sm btn-primary fw-bold shadow"
                disabled={!joinGameForm.isValid}>
                JOIN GAME
              </button>
            </div>
          </form>
        </FormikProvider>
      </div>
    </div>
  );
}

export default Join;
