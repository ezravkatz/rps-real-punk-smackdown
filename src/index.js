import React, { Component } from "react";
import ReactDOM from "react-dom";
import Player from "./Player";
import "./styles.css";
import rocktext from "./assets/text/rock/rockred.png";
import rockhover from "./assets/text/rock/rockyellowred.png";
import papertext from "./assets/text/paper/paperyellow.png";
import paperalt from "./assets/text/paper/paperblueyellow.png";
import scissorstext from "./assets/text/scissors/scissorsblue.png";
import scissorsalt from "./assets/text/scissors/scissorsbluered.png";
import youwin from "./assets/text/you win/youwinyellow.png";
import cpuwin from "./assets/text/cpu wins/cpuwinsyellow.png";

const weapons = ["rock", "paper", "scissors"];
class App extends Component {
  state = {
    playerOne: weapons[0],
    playerTwo: weapons[0],
    winner: "",
    img1: true,
    img2: true,
    img3: true,
  };

  startGame = () => {
    let counter = 0;
    let gameInterval = setInterval(() => {
      counter++;
      this.setState({
        playerTwo: weapons[Math.floor(Math.random() * weapons.length)],
        winner: "",
      });
      if (counter > 5) {
        clearInterval(gameInterval);
        this.setState({
          winner: this.selectWinner(),
        });
      }
    }, 100);
  };

  selectWinner = () => {
    const { playerOne, playerTwo } = this.state;

    if (playerOne === playerTwo) {
      return <div className="tie-text">Oops! it's a Tie!</div>;
    } else if (
      (playerOne === "rock" && playerTwo === "scissors") ||
      (playerOne === "scissors" && playerTwo === "paper") ||
      (playerOne === "paper" && playerTwo === "rock")
    ) {
      return <img src={youwin} alt="Player One Wins" className="you-win" />;
    } else {
      return <img src={cpuwin} alt="CPU Wins" className="cpu-win" />;
    }
  };
  selectWeapon = (weapon) => {
    this.setState({
      playerOne: weapon,
      winner: "",
    });
  };

  clickRock = () => {
    this.selectWeapon("rock");
    this.startGame();
  };

  clickPaper = () => {
    this.selectWeapon("paper");
    this.startGame();
  };

  clickScissors = () => {
    this.selectWeapon("scissors");
    this.startGame();
  };

  render() {
    const { playerOne, playerTwo, winner } = this.state;
    return (
      <>
        <h1 style={{ textAlign: "center" }}>
          <img
            src={rocktext}
            alt="Rock text black and red"
            className="headerImg"
          ></img>
          <img
            src={papertext}
            alt="Paper text black and yellow"
            className="headerImg"
          ></img>
          <img
            src={scissorstext}
            alt="Scissors text black and blue"
            className="headerImg"
          ></img>
        </h1>

        <div className="winner">{winner ? this.selectWinner() : null}</div>

        <div className="fighters">
          <Player weapon={playerOne} />
          <Player weapon={playerTwo} />
        </div>
        <div className="btn-container">
          <input
            type="image"
            alt="Rock text"
            src={this.state.img1 ? rocktext : rockhover}
            onClick={() => {
              this.clickRock();
            }}
            onMouseOver={() => this.setState({ img1: false })}
            onMouseLeave={() => this.setState({ img1: true })}
            className="rockBtn"
          />
          <input
            type="image"
            alt="Paper text"
            src={this.state.img2 ? papertext : paperalt}
            onClick={() => {
              this.clickPaper();
            }}
            onMouseOver={() => this.setState({ img2: false })}
            onMouseLeave={() => this.setState({ img2: true })}
            className="paperBtn"
          />

          <input
            type="image"
            alt="Scissors text"
            src={this.state.img3 ? scissorstext : scissorsalt}
            onClick={() => {
              this.clickScissors();
            }}
            onMouseOver={() => this.setState({ img3: false })}
            onMouseLeave={() => this.setState({ img3: true })}
            className="scissorsBtn"
          />
        </div>
      </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
