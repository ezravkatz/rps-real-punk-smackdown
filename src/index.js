import React, { Component, useEffect } from "react";
import ReactDOM from "react-dom";
import Player from "./Player";
import "./styles.css";
import { animate, motion, useMotionValue } from "framer-motion";
import rocktext from "./assets/text/rock/rockred.png";
import rockhover from "./assets/text/rock/rockyellowred.png";
import papertext from "./assets/text/paper/paperyellow.png";
import paperalt from "./assets/text/paper/paperblueyellow.png";
import scissorstext from "./assets/text/scissors/scissorsblue.png";
import scissorsalt from "./assets/text/scissors/scissorsbluered.png";
import youwin from "./assets/text/you win/youwinyellow.png";
import cpuwin from "./assets/text/cpu wins/cpuwinsyellow.png";
import draw from "./assets/text/draw/drawyellow.png";

const weapons = ["rock", "paper", "scissors"];
// var imgList = [];
class App extends Component {
  //   btnBlink = () => {
  //   const [blink, setBlink] = useState('initial');
  //   const createImgList = () => {
  //    // create an array of images to apply the border effect
  //    var imgs = document.body.getElementsByTagName("img");
  //    for (var i = 0; i < imgs.length; i++) {
  //      if (imgs[i].className == "border0") {
  //        setBlink('blinking')
  //        imgList.push(imgs[i]);
  //      }
  //    }
  //    btnBlink(1);
  //  };

  //  btnBlink = (n) => {
  //    for (var i = 0; i < imgList.length; i++) {
  //      imgList[i].className = "border" + n;
  //    }
  //    setTimeout(function () {
  //      btnBlink(Math.abs(n - 1));
  //    }, 1000);
  //  };
  //  document.onload = createImgList();

  // }

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

  handAnimation = () => {
    let fighters = document.getElementsByClassName("fighters");
    const x = useMotionValue(0);
    if (this.startGame()) {
      useEffect((fighters) => {
        fighters.animate(x, 5);
      });
    }
  };

  selectWinner = () => {
    const { playerOne, playerTwo } = this.state;

    if (playerOne === playerTwo) {
      return (
        <div className="tie-text">
          <img src={draw} alt="Draw or Tie" className="draw" />
        </div>
      );
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

  // blinkColor(color) {
  //   let colorButton = document.getElementsByClassName("rockBtn");
  //   colorButton.src = "./assets/text/rock/rockblue.png";
  //   if (colorButton === document.getElementsByClassName("rockBtn")) {
  //     setTimeout(() => {
  //       colorButton.src = "./assets/text/rock/rockred.png";
  //     }, 5);
  //   } else {
  //     setTimeout(() => {
  //       colorButton.src = "./assets/text/rock/rockyellow.png";
  //     }, 5);
  //   }
  // }

  //  createImgList = () => {
  //   // create an array of images to apply the border effect
  //   var imgs = document.body.getElementsByTagName("img");
  //   for (var i = 0; i < imgs.length; i++) {
  //     if (imgs[i].className == "border0") {
  //       imgList.push(imgs[i]);
  //     }
  //   }
  //   borderchange(1);
  // };

  // borderchange = (n) => {
  //   for (var i = 0; i < imgList.length; i++) {
  //     imgList[i].className = "border" + n;
  //   }
  //   setTimeout(function () {
  //     borderchange(Math.abs(n - 1));
  //   }, 1000);
  // };

  // componentDidMount() {
  // blinkBorder(colorA = "#F7E61A", colorB = "#223FFA", btnBorder, time) => {
  //   this.componentDidMount(){
  //     document.getElementById(btnBorder).style.borderColor = colorB;
  //     setTimeout(() => {
  //       this.blinkBorder(colorB, colorA, btnBorder, time);
  //       colorA = null;
  //       colorB = null;
  //       btnBorder = null;
  //       time = null;
  //     }, 500);
  //   }
  // }

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

        <motion.div
          className="fighters"
          animate={{ y: [0, 50, 0] }}
          transition={{ delay: 0.5, duration: 1, repeat: 2 }}
        >
          <Player weapon={playerOne} />
          <Player weapon={playerTwo} />
        </motion.div>
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
