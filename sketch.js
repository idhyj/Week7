let cannonAngle = 90; // Initial angle of the cannon (90 degrees points upwards)
let bulletX, bulletY; // Initial position of the bullet
let targetX, targetY; // Position of the target circle
let score = 0; // Points obtained
let gameEnded = false; // Game end flag
let successSound, hitSound; // Success and hit sound effects

function preload() {
  successSound = loadSound('yeah.mp3'); // Load success sound effect
  hitSound = loadSound('puuu.mp3'); // Load hit sound effect
}

function setup() {
  createCanvas(800, 400);
  bulletX = width / 2;
  bulletY = height;
  targetX = random(width);
  targetY = random(50, height - 50);
}

function draw() {
  background(0);

  if (!gameEnded) {
    // Can only move the cannon if the game is not over
    handleInput(); // Handle keyboard input
  }

  // Draw the target circle
  fill(255, 0, 0);
  ellipse(targetX, targetY, 30, 30);

  // Draw the cannon
  push();
  translate(bulletX, bulletY);
  rotate(radians(cannonAngle));
  fill(255);
  rect(-10, -5, 20, 10);
  pop();

  // Move the bullet
  if (!gameEnded) {
    bulletX += 5 * cos(radians(cannonAngle));
    bulletY -= 5 * sin(radians(cannonAngle));
  }

  // Reset the bullet if it goes outside the canvas
  if (bulletY < 0 || bulletX < 0 || bulletX > width) {
    bulletY = height;
    bulletX = width / 2;
  }

  // If the bullet hits the target circle
  let distance = dist(bulletX, bulletY, targetX, targetY);
  if (distance < 15) {
    score++;
    targetX = random(width);
    targetY = random(50, height - 50);
    // Play success sound effect when reaching 5 points
    if (score >= 5) {
      successSound.play();
    }
    // Play hit sound effect when hitting the target
    hitSound.play();
  }

  // Display the score
  fill(255);
  textSize(24);
  textAlign(RIGHT);
  text("Score: " + score, width - 20, 30);

  // Display success message
  if (score >= 5) {
    gameEnded = true;
    fill(0, 255, 0);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("Success!", width / 2, height / 2);
    // Display the restart button
    textAlign(CENTER);
    textSize(24);
    fill(255);
    text("Restart", width / 2, height / 2 + 50);
  }
}

function keyPressed() {
  // Rotate the cannon to the left when the right arrow key is pressed
  if (keyCode === RIGHT_ARROW) {
    cannonAngle -= 5;
  }
  // Rotate the cannon to the right when the left arrow key is pressed
  else if (keyCode === LEFT_ARROW) {
    cannonAngle += 5;
  }
}

function handleInput() {
  // Function to handle keyboard input
  // Additional input logic can be added here
}

function mousePressed() {
  if (gameEnded) {
    // Restart the game when the mouse is clicked after the game is over
    score = 0;
    gameEnded = false;
    bulletY = height;
    bulletX = width / 2;
    targetX = random(width);
    targetY = random(50, height - 50);
  }
}
