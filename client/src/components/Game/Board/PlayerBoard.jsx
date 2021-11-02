import React, { useEffect, useState } from "react";
import "./PlayerBoard.scss";
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
          const { data } = await axiosInstance.get("/board/create-board");
          const { response: board } = data;
          board.N = [...board.N.slice(0, 2), "S", ...board.N.slice(2, 4)];
          const boardState = {};
          Object.entries(board).forEach(([letter, numbers]) => {
            boardState[letter] = numbers.map((val) => ({
              value: val,
              selected: val === "S" ? true : false,
            }));
          });
          localStorage.setItem("board", JSON.stringify(boardState));
          setBoard(boardState);
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
    localStorage.setItem(
      "board",
      JSON.stringify({ ...board, [letter]: column })
    );
    setBoard((board) => ({ ...board, [letter]: column }));
  };
  return (
    <div className="player-board">
      <div className="board-layout">
        <div className="board-header">
          <NumberTile value="B" isHeader />
          <NumberTile value="I" isHeader />
          <NumberTile value="N" isHeader />
          <NumberTile value="G" isHeader />
          <NumberTile value="O" isHeader />
        </div>
        <div className="divider"></div>
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
  );
}

export default PlayerBoard;
