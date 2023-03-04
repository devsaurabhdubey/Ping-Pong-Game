// Get the canvas element from the HTML file
var canvas = document.getElementById("gameCanvas");
var canvasContext = canvas.getContext("2d");

// Set the ball position and speed
var ballX = canvas.width/2;
var ballY = canvas.height/2;
var ballSpeedX = -10;
var ballSpeedY = 0;

// Set the paddle size and speed
var paddleHeight = 100;
var paddleWidth = 10;
var paddleSpeed = 10;
var leftPaddleY = (canvas.height - paddleHeight)/2;
var rightPaddleY = (canvas.height - paddleHeight)/2;

// Set the score variables
var score = 0;
var maxScore = localStorage.getItem("maxScore") || 0;
var maxScorePlayer = localStorage.getItem("maxScorePlayer") || "No one";

// Draw the ball and paddles
function draw() {
  // Clear the canvas
  canvasContext.fillStyle = "#000000";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the ball
  canvasContext.fillStyle = "#ffffff";
  canvasContext.beginPath();
  canvasContext.arc(ballX, ballY, 10, 0, Math.PI*2, true);
  canvasContext.fill();

  // Draw the left paddle
  canvasContext.fillStyle = "#ffffff";
  canvasContext.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);

  // Draw the right paddle
  canvasContext.fillStyle = "#ffffff";
  canvasContext.fillRect(canvas.width-paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

  // Draw the score
  canvasContext.fillStyle = "#ffffff";
  canvasContext.fillText("Score: " + score, 50, 50);
  canvasContext.fillText("High Score: " + maxScore + " by " + maxScorePlayer, canvas.width - 200, 50);
}

// Update the ball and paddles
function update() {
  // Move the ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Bounce the ball off the top and bottom walls
  if (ballY > canvas.height - 10 || ballY < 10) {
    ballSpeedY = -ballSpeedY;
  }

  // Bounce the ball off the left paddle
  if (ballX < 20 && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
    ballSpeedX = -ballSpeedX;
    var deltaY = ballY - (leftPaddleY + paddleHeight/2);
    ballSpeedY = deltaY * 0.35;
    score++;
  }

  // Bounce the ball off the right paddle
  if (ballX > canvas.width - 20 - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
    ballSpeedX = -ballSpeedX;
    var deltaY = ballY - (rightPaddleY + paddleHeight/2);
    ballSpeedY = deltaY * 0.35;
    score++;
  }

  // Check for a winner
  var winner = "";
  if (score >= 10) {
    if (leftPaddleY > rightPaddleY) {
      winner = "Left Player";
    } else {
      winner = "Right Player";
    }
    showScore(winner);
  }
}

// Function for showing the winner and resetting the game
function showScore(winner) {
  if (score > maxScore) {
    maxScore = score;
    maxScorePlayer = winner
    localStorage.setItem("maxScore", maxScore);
    localStorage.setItem("maxScorePlayer", maxScorePlayer);
    }
    
    // Display the winner and score
    alert(winner + " wins with a score of " + score);
    
    // Reset the score and ball position
    score = 0;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
    
    // Reset the paddle position
    leftPaddleY = (canvas.height - paddleHeight)/2;
    rightPaddleY = (canvas.height - paddleHeight)/2;
    
    // Redraw the canvas
    draw();
    }
    
    // Move the paddles when the arrow keys are pressed
    function movePaddles(evt) {
    switch(evt.keyCode) {
    // Up arrow
    case 38:
    leftPaddleY -= paddleSpeed;
    rightPaddleY -= paddleSpeed;
    break;
    // Down arrow
    case 40:
    leftPaddleY += paddleSpeed;
    rightPaddleY += paddleSpeed;
    break;
    }
    }
    
    // Add the event listener for moving the paddles
    document.addEventListener("keydown", movePaddles);
    
    // Set the game loop to update every 30 milliseconds
    setInterval(function() {
    update();
    draw();
    }, 30);