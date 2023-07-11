let velocity = { x: 0, y: 0 };
const foodSound = new Audio("files/food.mp3");
const moveSound = new Audio("files/move.mp3");
const gameOverSound = new Audio("files/gameOver.mp3");
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 14 }],
  food = { x: 6, y: 9 };

function main(ctime) {
  window.requestAnimationFrame(main);
  // console.log(ctime)
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snakeArr) {
  // If snake bump into thyself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
      return true;
    }
}
    // If you bump into the wall
    if (snakeArr[0].x >= 22 || snakeArr[0].x <= 0 || snakeArr[0].y >= 22 || snakeArr[0].y <= 0) {
      return true;
    }
}


function gameEngine() {
  // Updating the snake Array
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    velocity = { x: 0, y: 0 };
    alert("Game Over!!!!");
    snakeArr = [{ x: 13, y: 14 }];
    score = 0;
  }

  // If snake has eaten food
  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    foodSound.play();
    score++;
    if(score>highScore){
        highScore = score;
        localStorage.setItem("highScore", JSON.stringify(highScore))
        highScoreBox.innerHTML = "High-Score: " + highScore;
    }
    scoreBox.innerHTML = "Score:" + score
    snakeArr.unshift({
      // We can also write shift here
      x: snakeArr[0].x + velocity.x,
      y: snakeArr[0].y + velocity.y,
    });
    let a = 2;
    let b = 20;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += velocity.x;
  snakeArr[0].y += velocity.y;

  //Display the snake
  board.innerHTML = "";
  snakeArr.forEach((elem, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = elem.y;
    snakeElement.style.gridColumnStart = elem.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  //Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}


// Main logic
let highScore = localStorage.getItem("highScore");

if (highScore === null) {
  localStorage.setItem("highScore", JSON.stringify(0));
} else {
  highScoreVal = JSON.parse(highScore);
  highScoreBox.innerHTML = "High-Score: " + highScoreVal;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  velocity = { x: 0, y: 1 }; // Start the game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      //   console.log("ArrowUp");
      velocity.x = 0;
      velocity.y = -1;
      break;
    case "ArrowDown":
      //   console.log("ArrowDown");
      velocity.x = 0;
      velocity.y = 1;
      break;
    case "ArrowLeft":
      //   console.log("ArrowLeft");
      velocity.x = -1;
      velocity.y = 0;
      break;
    case "ArrowRight":
      //   console.log("ArrowRight");
      velocity.x = 1;
      velocity.y = 0;
      break;
    default:
      break;
  }
});
