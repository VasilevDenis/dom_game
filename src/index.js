import './style.css'
import imgGoblinPath from './goblin.png'


const goblin = document.createElement('img');
goblin.src = imgGoblinPath;
let currentNumber = null;
placeGoblinInRandomSquare();


export function setRandomNumber () {
  const randomNumber = Math.floor(Math.random() * 16);
  if (randomNumber != currentNumber) {
    currentNumber = randomNumber;
  } else {
    setRandomNumber()
  }
}

export function placeGoblin () {
  const squares = document.querySelectorAll('.square');
  squares[currentNumber].appendChild(goblin);
}

export function placeGoblinInRandomSquare () {
  setRandomNumber();
  placeGoblin();
}

setInterval(() => {
  placeGoblinInRandomSquare();
}, 2000)