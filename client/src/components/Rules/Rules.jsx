import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import createGameScreenShot from "../../resources/images/create-game-screen.png";
import joinGameScreenshot from "../../resources/images/join-game-screen.png";
import conductorScreenshot from "../../resources/images/conductor-screen.png";
import playerScreenshot from "../../resources/images/player-screen.png";
import claimerScreenshot from "../../resources/images/claimer.png";
import claimedScreenshot from "../../resources/images/claimed.png";
import claimedConductorScreenshot from "../../resources/images/claimed-conductor.png";
import gameProgressPlayerScreenshot from "../../resources/images/game-progress.png";
import gameProgressConductorScreenshot from "../../resources/images/game-progress-conductor.png";
import patternScreenshot from "../../resources/images/player-pattern.png";

export default function Rules() {
  return (
    <div className="game-rules">
      <div className="container-fluid py-3 bg-warning sticky-top shadow border-bottom border-primary">
        <div className="container d-flex justify-content-between">
          <h2 className="text-primary">
            Bingo: <span className="fw-normal text-muted">Game Rules</span>
          </h2>
          <a
            className="btn btn-dark my-auto"
            href="https://github.com/amittras-pal/bingo-game"
            target="_blank"
            rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} />{" "}
            <span className="ms-2">View on Github</span>
          </a>
        </div>
      </div>
      <div className="container mt-4">
        <h3>About the Game</h3>
        <p>
          This is a digital version of the classic game called{" "}
          <span className="fw-bold">BINGO</span>. Detailed rules of the standard
          game can be found{" "}
          <a
            href="https://www.atlanticbingosupply.com/about/howto-play-bingo"
            target="_blank"
            rel="noopener noreferrer"
            className="fw-bold">
            here.
          </a>{" "}
          <span className="fw-bold">
            The players aim to complete a specific pattern on their board of 25
            blocks, and win the game. The numbers they select on the board must
            have been called by the conductor.
          </span>{" "}
          Detailed usage of this online version is described below in subsequent
          sections.
        </p>
        <p>
          This version of the game is a real time online version primarily
          intended to be played over video conferencing or among a group of
          friends, without the hassle of any hard tickets or anything.
        </p>
        <p>
          {" "}
          <span className="fw-bold text-muted text-decoration-underline">
            NOTE TO USERS:
          </span>{" "}
          The developer acknowledges that there is slight bending of the rules
          being made from the official game rules.
        </p>
        <hr />
        <h3>Starting a new game</h3>
        <p>
          All players intending to join a game session log in to the game app
          here. One of the group starts a new game by clicking the{" "}
          <span className="fw-bold">START A NEW GAME</span> button and entering
          the game title and a conductor name in the subsequent screen. . Once
          teh game is successfully created, the conductor{" "}
          <span className="fst-italic">(the one who created the game)</span>{" "}
          shares the game title using which other player can join the game.{" "}
          <br />
          The creator also chooses a win board. This is the connected pattern
          the players will aim to create to win the game.
        </p>
        <p>
          <span className="fw-bold text-danger">NOTE:</span> The game title must
          be unique across all the games currently in progress. The system will
          notify the creator if there is a name conflict with any other game
          currently in record.
        </p>
        <div className="d-flex flex-column align-items-center my-3 text-center">
          <img
            src={createGameScreenShot}
            alt=""
            className="rounded img-fluid"
          />
          <p className="small fst-italic fw-bold text-muted">
            Create Game Screen
          </p>
        </div>
        <hr />
        <h3 className="mt-3">Joining a game</h3>
        <p>
          Players login to the game app and go to{" "}
          <span className="fw-bold">JOIN A GAME</span> screen. Here they enter
          the Game title provided by the conductor and a their name in the
          Player Name input.
        </p>
        <p>
          <span className="fw-bold text-danger">NOTE: </span>
          Player names must be unique in a single game session. It recommended
          to enter full name in this field. The system will notify if there's a
          player name conflict.
        </p>
        <div className="d-flex flex-column align-items-center my-3 text-center">
          <img src={joinGameScreenshot} alt="" className="rounded img-fluid" />
          <p className="small fst-italic fw-bold text-muted">
            Join Game Screen
          </p>
        </div>
        <hr />
        <h3 className="mt-3">Conductor</h3>
        <p>The Conductor's Screen is shown below:</p>
        <div className="d-flex flex-column align-items-center my-3 text-center">
          <img src={conductorScreenshot} alt="" className="rounded img-fluid" />
          <p className="small fst-italic fw-bold text-muted">
            Conductor Screen
          </p>
        </div>
        <p>
          Here the game conductor can see real time status of the game, the
          players connected, and the numbers already used in the game. Once
          there are two or more players connected, the conductor can start the
          game. This will also generate the first number.
        </p>
        <p>
          <span className="fw-bold text-danger">NOTE:</span> Players cannot join
          once the game has started. So conductor should confirm with all who
          wish to join before starting the game.
        </p>
        <p>
          Once the game has started, the conductor's screen changes in the
          following way:
        </p>
        <div className="d-flex flex-column align-items-center my-3 text-center">
          <img
            src={gameProgressConductorScreenshot}
            alt=""
            className="rounded img-fluid"
          />
          <p className="small fst-italic fw-bold text-muted">
            Conductor Screen in progress.
          </p>
        </div>
        <p>
          If a player claims Bingo by pressing the BINGO button, the players
          board is transferred to the conductor for review. The conductor's
          screen transforms in the following manner.{" "}
          <span className="fw-bold">
            The conductor still has the game stat window, where (s)he can verify
            the numbers used.
          </span>
          .
        </p>
        <p>
          <span className="fw-bold text-danger">NOTE:</span> The conductor has
          to make a decision, before continuing the game. The action buttons on
          the number generator are disabled unless a decision is made.
        </p>
        <div className="d-flex flex-column align-items-center my-3 text-center">
          <img
            src={claimedConductorScreenshot}
            alt=""
            className="rounded img-fluid"
          />
          <p className="small fst-italic fw-bold text-muted">
            Conductor screen: Bingo claimed.
          </p>
        </div>
        <p>
          The conductor is required to verify the board state, whether the
          pattern is matched and complete, and that no uncalled numbers are
          selected in the board. After the review is completed, the conductor
          should declare the claim as correct{" "}
          <span className="fw-bold">Winner</span> or declare it as false,{" "}
          <span className="fw-bold">Bogey.</span> If the player is declared as
          the winner, the game ends, and all the players are redirected to the
          Home screen, where a new session can be started. However, if the claim
          is found to be false, the player is declared a bogey, and the game
          continues.
        </p>
        <p>
          <span className="fw-bold text-danger">NOTE:</span> There can be only
          one winner per game session, and there is always a winner. There can
          be no chance that the game ends without a winner being declared.
        </p>
        <hr />
        <h3>Player</h3>
        <p>The Player's Screen is shown below:</p>
        <div className="d-flex flex-column align-items-center my-3 text-center">
          <img src={playerScreenshot} alt="" className="rounded img-fluid" />
          <p className="small fst-italic fw-bold text-muted">Player Screen</p>
        </div>
        <p>
          The player is presented with a randomized set of 24 numbers including
          a feww block at the center. On this board, the player tries to
          complete the game winning pattern and claim the Bingo. The player can
          refer to the pattern anytime by clicking the PATTERN button which will
          open a modal to show the pattern to the player.
        </p>
        <div className="d-flex flex-column align-items-center my-3 text-center">
          <img src={patternScreenshot} alt="" className="rounded img-fluid" />
          <p className="small fst-italic fw-bold text-muted">Pattern Screen</p>
        </div>
        <p>
          Once the game is started the player has to click numbers according to
          the notifications appearing at the bottom of the screen. Once a number
          is selected, it cannot be deselected, so player should be paying
          attention to the numbers in the notification.
        </p>
        <div className="d-flex flex-column align-items-center my-3 text-center">
          <img
            src={gameProgressPlayerScreenshot}
            alt=""
            className="rounded img-fluid"
          />
          <p className="small fst-italic fw-bold text-muted">
            Player Screen in progress
          </p>
        </div>
        <p>
          Once a player has claimed a bingo by pressing the Bingo button, the
          game is frozen for all the players. This allows for the player who
          claimed first to be considered for the win! The respective screens for
          the player who claims bingo and the rest of the players is shown
          below:
        </p>
      </div>
      <div className="d-flex container-fluid flex-column align-items-center my-3 text-center">
        <div className="row">
          <div className="col-md-6 col-lg-6 px-0 mb-3">
            <img
              src={claimedScreenshot}
              alt=""
              className="rounded img-fluid mb-2"
            />{" "}
            <p className="small fst-italic fw-bold text-muted">
              All other players
            </p>
          </div>
          <div className="col-md-6 col-lg-6 px-0 mb-3">
            <img
              src={claimerScreenshot}
              alt=""
              className="rounded img-fluid mb-2"
            />
            <p className="small fst-italic fw-bold text-muted">
              Player who claims bingo!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
