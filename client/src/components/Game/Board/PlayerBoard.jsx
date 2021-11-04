import React, { useEffect, useState } from "react";
import "./PlayerBoard.scss";
import { API_ENDPOINTS } from "../../../constants/constants";
import { axiosInstance } from "../../../config/axiosConfig";
import NumberTile from "./NumberTile/NumberTile";
function PlayerBoard() {
  const [board, setBoard] = useState(null);
  useEffect(() => {
    async function retireveBoard() {
      try {
        if (localStorage["board"]) {
          console.log("Reading Local Storage");
          setBoard(JSON.parse(localStorage.getItem("board")));
        } else {
          const { data } = await axiosInstance.post(API_ENDPOINTS.joinGame, {
            name: "t3",
            playerName: "Someone",
          });
          // Required.
          // localStorage.setItem("board", JSON.stringify(data.response));
          setBoard(data.response);
        }
      } catch (error) {
        console.log(error);
      }
    }
    retireveBoard();
  }, []);

  const selectNumber = (letter, val) => {
    console.log(letter, val);
    const column = board[letter];
    column.forEach((entry) => {
      if (entry.value === val) entry.selected = true;
    });
    // Required.
    // localStorage.setItem(
    //   "board",
    //   JSON.stringify({ ...board, [letter]: column })
    // );
    setBoard((board) => ({ ...board, [letter]: column }));
  };
  return (
    <div className="container-fluid px-3">
      <div className="player-board container shadow d-flex justify-content-center align-items-center p-2 mt-2 glass-dark">
        <div className="board-layout">
          <div className="board-header">
            <NumberTile value="B" isHeader />
            <NumberTile value="I" isHeader />
            <NumberTile value="N" isHeader />
            <NumberTile value="G" isHeader />
            <NumberTile value="O" isHeader />
          </div>
          <div className="divider w-100 my-3 bg-dark"></div>
          {board && (
            <div className="board-tiles">
              <div className="column">
                {board.B.map((num) => (
                  <NumberTile
                    value={num.value}
                    letter="B"
                    key={num.value}
                    isSelected={num.selected}
                    onSelect={selectNumber}
                  />
                ))}
              </div>
              <div className="column">
                {board.I.map((num) => (
                  <NumberTile
                    value={num.value}
                    letter="I"
                    key={num.value}
                    isSelected={num.selected}
                    onSelect={selectNumber}
                  />
                ))}
              </div>
              <div className="column">
                {board.N.map((num) => (
                  <NumberTile
                    value={num.value}
                    letter="N"
                    key={num.value}
                    isSelected={num.selected}
                    onSelect={selectNumber}
                  />
                ))}
              </div>
              <div className="column">
                {board.G.map((num) => (
                  <NumberTile
                    value={num.value}
                    letter="G"
                    key={num.value}
                    isSelected={num.selected}
                    onSelect={selectNumber}
                  />
                ))}
              </div>
              <div className="column">
                {board.O.map((num) => (
                  <NumberTile
                    value={num.value}
                    letter="O"
                    key={num.value}
                    isSelected={num.selected}
                    onSelect={selectNumber}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="container d-flex justify-content-between py-3 mt-3 player-actions">
        <button className="btn btn-danger fw-bold">Leave Game</button>
        <button className="btn btn-success fw-bold">BINGO!</button>
        <button className="btn btn-light fw-bold">Game Rules</button>
      </div>
    </div>
  );
}

export default PlayerBoard;
