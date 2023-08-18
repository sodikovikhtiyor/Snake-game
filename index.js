// setup
document.body.addEventListener("keydown", keyDown);
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let tileCount = 20;
let tileSize = 18;
let headX = 10;
let headY = 10;
let xvelocity = 0;
let yvelocity = 0;
let appleX = 5;
let appleY = 5;
let score = 0;
// snake parts
const snakeParts = [];
let tailLength = 2; //initial parts of snake

// draw ame part
function drawGame() {
  changeSnakePosition();
  let result = isGameOver();
  if (result) {
    // if result is true stop other following function from exucuting
    return;
  }
  clearScreen();
  let speed = 7;
  drawSnake();
  checkCollision();
  drawApple();
  drawScore();
  setTimeout(drawGame, 1000 / speed);
}
// draw snake

function drawSnake() {
  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
  ctx.fillStyle = "green";
  for (let i = 0; i < snakeParts.length; i++) {
    const part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }
  snakeParts.push(new snakePart(headX, headY));
}
class snakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
// draw field
function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

drawGame();
// arrow keys
function keyDown(event) {
  if (event.keyCode == 38) {
    if (yvelocity == 1) return;

    yvelocity = -1; //move up
    xvelocity = 0;
  }
  if (event.keyCode == 40) {
    if (yvelocity == -1) return;
    yvelocity = 1; //move down
    xvelocity = 0;
  }
  if (event.keyCode == 37) {
    if (xvelocity == 1) return;
    yvelocity = 0;
    xvelocity = -1; //move left
  }
  if (event.keyCode == 39) {
    if (xvelocity == -1) return;
    yvelocity = 0;
    xvelocity = 1; //move right
  }
}
// change sanke position
function changeSnakePosition() {
  headX = headX + xvelocity;
  headY = headY + yvelocity;
}
// draw apple
function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}
// checkCollision
function checkCollision() {
  if (appleX == headX && appleY == headY) {
    appleX = Math.floor(Math.random * tileCount);
    appleY = Math.floor(Math.random * tileCount);
    tailLength++;
    score++;
  }
}
// set score
function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px verdena";
  ctx.fillText("Score: " + score, canvas.clientWidth - 80, 20);
}
//Game Over function
function isGameOver() {
  let gameOver = false;
  //check whether game has started
  if (yvelocity === 0 && xvelocity === 0) {
    return false;
  }
  if (headX < 0) {
    //if snake hits left wall
    gameOver = true;
  } else if (headX === tileCount) {
    //if snake hits right wall
    gameOver = true;
  } else if (headY < 0) {
    //if snake hits wall at the top
    gameOver = true;
  } else if (headY === tileCount) {
    //if snake hits wall at the bottom
    gameOver = true;
  }

  //stop the game when snake bumps into itself

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
    if (gameOver) {
      ctx.fillStyle = "white";
      ctx.font = "50px verdana";
      ctx.fillText(
        "Game Over! ",
        canvas.clientWidth / 6.5,
        canvas.clientHeight / 2
      ); //position our text in center
    }
    return gameOver; // this will stop the execution of the drawgame method
  }
}
