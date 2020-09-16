import "../scss/main.scss";

let canvas = document.querySelector(".game");
/** @type {CanvasRenderingContext2D} */
let ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;
let ballRadius = 10;
let dx = 3;
let dy = -3;

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleDx = 7;

let leftpressed = false;
let rightpressed = false;

let brickRowCount = 3;
let brickColumnCount = 15;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0 };
  }
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
  if (e.code == "KeyA") {
    leftpressed = true;
  }
  if (e.code == "KeyD") {
    rightpressed = true;
  }
}

function keyUpHandler(e) {
  if (e.code == "KeyA") {
    leftpressed = false;
  }
  if (e.code == "KeyD") {
    rightpressed = false;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      bricks[c][r].x = c * (brickWidth + brickPadding) + brickOffsetLeft;
      bricks[c][r].y = r * (brickHeight + brickPadding) + brickOffsetTop;
      ctx.beginPath();
      ctx.rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  x += dx;
  y += dy;

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  }
  if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      alert("GAME OVER");
      document.location.reload();
      clearInterval(interval); // Needed for Chrome to end game
    }
  }

  paddleX += paddleDx * rightpressed - paddleDx * leftpressed;
  if (paddleX + paddleWidth > canvas.width) {
    paddleX = canvas.width - paddleWidth;
  }
  if (paddleX < 0) {
    paddleX = 0;
  }
}
let interval = setInterval(draw, 16);
