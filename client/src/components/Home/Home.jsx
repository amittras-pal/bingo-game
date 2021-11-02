import React from "react";
import { useHistory } from "react-router-dom";
import "./Home.scss";

function Home() {
  const history = useHistory();
  return (
    <div className="home-layout">
      <div className="welcome-tile">
        <h2 className="title">Welcome to Online Bingo</h2>
        <div className="divider"></div>
        <button className="new-game" onClick={() => history.push("/new-game")}>
          NEW GAME
        </button>
        <button className="join-game">JOIN GAME</button>
      </div>
    </div>
  );
}

export default Home;
