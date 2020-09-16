import "../scss/main.scss";

let canvas = document.querySelector(".game");
/** @type {CanvasRenderingContext2D} */
let ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;
let x2 = canvas.width / 2;
let y2 = canvas.height - 30;
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
let score = 0;

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
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

function drawSecondBall() {
  ctx.beginPath();
  ctx.arc(x2, y2, ballRadius, 0, Math.PI * 2);
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
      if (bricks[c][r].status == 1) {
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
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}

function collisionDetection() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight && b.status == 1) {
        dy = -dy;
        b.status = 0;
        score++;
        if (score == brickRowCount * brickColumnCount) {
          alert("YOU WIN, CONGRATULATIONS!");
          document.location.reload();
        }
      }
    }
  }
}
let prevTime = 0;
let f = 0;

function draw(time) {
  requestAnimationFrame(draw);
  f = time - prevTime;
  prevTime = time;
  console.log(f, time, prevTime);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawSecondBall();
  drawPaddle();
  drawBricks();
  drawScore();
  collisionDetection();

  x2 += dx;
  y2 += dy;

  if (!isNaN(f)) {
    f = (f * 60) / 1000;
    x += dx * f;
    y += dy * f;
    paddleX += paddleDx * rightpressed * f - paddleDx * leftpressed * f;
  }

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
    }
  }

  if (paddleX + paddleWidth > canvas.width) {
    paddleX = canvas.width - paddleWidth;
  }
  if (paddleX < 0) {
    paddleX = 0;
  }
}
draw();
