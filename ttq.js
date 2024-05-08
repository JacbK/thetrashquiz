const trashItems = [
  "plastic bottle", "banana peel", "newspaper", "cardboard box",
  "food scraps", "aluminum can", "glass jar", "paper bag"
];

const userResponses = [false, false, false, false, false, false, false, false];

// Answers (1 = landfill, 2 = recycle, 3 = compost)
const answers = [2, 3, 2, 2, 3, 2, 2, 2];

let currentItem = -1;
let userAnswer = 0;
let score = 0;
let gameState = 'intro';
let startTime; // New variable to store the start time
let endTime;

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(220);
  if (gameState === 'intro') {
    displayIntro();
  } else if (gameState === 'quiz') {
    displayQuiz();
  } else if (gameState === 'end') {
    displayEnd();
  }
}

function displayIntro() {
  textSize(24);
  text("Welcome to the Trash Quiz!", width / 2, height / 8);
  text("Here's what goes where:", width / 2, height / 5);
  textSize(18);
  text("Landfill: Non-recyclable items", width / 2, height / 2 - 80);
  text("(e.g., styrofoam, chip bags)", width / 2, height / 2 - 50);
  text("Recycle: Plastic, paper, glass, metal", width / 2, height / 2);
  text("Compost: Food scraps, yard waste", width / 2, height / 2 + 50);
  text("Press any key to start the quiz", width / 2, height / 2 + 100);
}

function displayQuiz() {
  textSize(24);
  text(`Where should the ${trashItems[currentItem]} go?`, width / 2, height / 2 - 50);
  text("1. Landfill 2. Recycle 3. Compost", width / 2, height / 2 + 50);

  if (userAnswer !== 0) {
    let feedback = "";
    if (userAnswer === answers[currentItem]) {
      feedback = "Correct!";
      userResponses[currentItem] = true;
    } else {
      feedback = "Incorrect.";
    }
    text(feedback, width / 2, height / 2 + 100);
  }
}

function displayEnd() {
  const timeTaken = (endTime - startTime) / 1000; // Calculate the time taken in seconds

  let totalScore = 0;
  for (let i = 0; i < userResponses.length; i++) {
    if (userResponses[i] == true) {
      totalScore++;
    }
  }

  textSize(24);
  text(`Final Score: ${totalScore}/${trashItems.length}`, width / 2, height / 2 - 50);
  text(`Time Taken: ${timeTaken.toFixed(2)} seconds`, width / 2, height / 2);
  text("Press '4' to restart the game", width / 2, height / 2 + 50);
}

function keyPressed() {
  if (gameState === 'intro') {
    startTime = millis(); // Store the start time
    resetGame();
    nextItem();
    gameState = 'quiz';
  } else if (key === "1" || key === "2" || key === "3") {
    userAnswer = parseInt(key);
  } else if (key === "4" && userAnswer !== 0) { // Check if key '4' is pressed and userAnswer is not 0
    nextItem();
  } else if (key === "4" && gameState === 'end') { // Check if key '4' is pressed and gameState is 'end'
    resetGame();
    gameState = 'intro';
  }
}

function resetGame() {
  currentItem = -1;
  userAnswer = 0;
  score = 0;
  for (let i = 0; i < userResponses.length; i++) {
    userResponses[i] = false;
  }
}

function nextItem() {
  currentItem = (currentItem + 1) % trashItems.length;
  userAnswer = 0;
  if (currentItem === 0) {
    gameState = 'end'; // Switch to the 'end' state when all items have been displayed
    endTime = millis();
  } else {
    text(`Score: ${score}/${currentItem}`, width / 2, 50);
  }
}

function mousePressed() {
  if (userAnswer !== 0) {
    nextItem();
  }
}
