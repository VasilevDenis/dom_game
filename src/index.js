import './style.css'
import imgGoblinPath from './goblin.png'

class Game {
  constructor() {
    //startButton
    this.startButtonElement = document.querySelector("#start");
    this.startButtonElement.addEventListener("click", this.startGame.bind(this))
    //goblin
    this.goblinElement = document.createElement('img');
    this.goblinElement.src = imgGoblinPath;
    this.currentGoblinPosition = null;
    //board
    this.boardElement = document.querySelector(".board");
    this.boardElement.addEventListener("mousedown", (event) => this.clickOnBoardHandler(event, true));
    this.boardElement.addEventListener("mouseup", (event) => this.clickOnBoardHandler(event, false));    
    //squares
    this.squaresElement = document.querySelectorAll('.square');
    //score
    this.scoreElement = document.querySelector(".score");
    //attempts
    this.attemptsElement = document.querySelector(".attempts");
    //message
    this.messageElement = document.querySelector(".message");
    this.showMessage("Click Start to go!")
    //reset
    this.resetGame();
    //lock
    this.lock = false;
    //coursor
    this.htmlElement =  document.querySelector("html");
    this.lastDeadGoblinSquare = null;
  }

  startGame() {
    if (!this.lock) {
      this.lock = true;
      this.resetGame();
      this.doIteration();
    }
  }

  doIteration() {
    const currentScore = this.score;
    this.placeGoblinInRandomSquare();
    setTimeout(() => {
      if (currentScore === this.score) {
        if (this.attempts > 0) {
          this.updateAttempts(this.attempts - 1);
          this.showMessage("Ha-ha-ha!")
          this.doIteration();
        } else {
          this.gameOver();
        }
      } else {
        this.doIteration();
      }
    }, 1000);
  }

  gameOver() {
    this.lock = false;
    this.showMessage("Game over!")
  }

  resetGame() {
    this.showMessage("Go!")
    this.updateAttempts(5);
    this.updateScore(0);
  }

  setRandomNumber () {
    const randomNumber = Math.floor(Math.random() * 16);
    if (randomNumber != this.currentGoblinPosition) {
      this.currentGoblinPosition = randomNumber;
    } else {
      this.setRandomNumber()
    }
  }

  placeGoblin () {
    this.squaresElement[this.currentGoblinPosition].appendChild(this.goblinElement);
    this.goblinElement.style.display = "block";
  }

  placeGoblinInRandomSquare () {
    this.setRandomNumber();
    this.placeGoblin();
  }

  updateScore(number) {
    this.score = number;
    this.scoreElement.textContent = `Scores: ${number}`;
}

  updateAttempts(number) {
    this.attempts = number;
    this.attemptsElement.textContent = `Attempts: ${number}`;
}

  showMessage(message) {
    this.messageElement.textContent = message;
  }

  clickOnBoardHandler(event, isRotated) {
      if (isRotated) {
        this.htmlElement.classList.add("hammer-down");
      } else {
        this.htmlElement.classList.remove("hammer-down");
      }
    if (event.target.tagName.toLowerCase() === 'img') {
      if (this.lock) {
        if (this.lastDeadGoblinSquare == this.currentGoblinPosition) {
          return
        }
        this.goblinElement.style.display = "none";
        this.updateScore(this.score + 1)
        this.lastDeadGoblinSquare = this.currentGoblinPosition;
        this.showMessage("Ouch!");
      }
    } 
  }
}

new Game();
