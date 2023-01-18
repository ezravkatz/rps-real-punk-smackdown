import React from "react";
import scissors from "./assets/hands/scissors/scissorshand.png";
import paper from "./assets/hands/paper/paperhand.png";
import rock from "./assets/hands/rock/rockhand.png";

const Player = ({ weapon }) => (
  <>
    <div className="player">
      <img
        className="player-image"
        src={
          weapon === "rock" ? rock : weapon === "scissors" ? scissors : paper
        }
        alt="Rock Paper Scissors"
      />
    </div>
  </>
);

export default Player;
