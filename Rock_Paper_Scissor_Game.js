// Query selectors for all buttons and display elements
const result = document.querySelector('.js-result');
const rockButton = document.querySelector('.js-rock-button');
const paperButton = document.querySelector('.js-paper-button');
const scissorsButton = document.querySelector('.js-scissor-button');
const resetButton = document.querySelector('.js-reset-btn');
const scoreStorage = document.querySelector('.js-score');
const movesDisplay = document.querySelector('.js-moves');

// Retrieve score from localStorage or initialize it
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

// Display initial score
scoreStorage.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

// Function to randomly generate computer's move
const computerMove = () => {
  const move = Math.random();
  if (move < 1 / 3) {
    return 'rock';
  } else if (move < 2 / 3) {
    return 'paper';
  } else {
    return 'scissors';
  }
};

// Function to play the game
function playGame(playerMove) {
  const compMove = computerMove();

  // Update the move display with images
  movesDisplay.innerHTML = `
    <p class="moves">You</p>
    <img src="img/${playerMove}.png" alt="${playerMove}" class="move-img">
    <img src="img/${compMove}.png" alt="${compMove}" class="move-img">
    <p class="moves">Computer</p>
  `;

  // Compare player move to computer move
  if (playerMove === compMove) {
    result.innerHTML = 'Tie';
  } else if (
    (playerMove === 'rock' && compMove === 'scissors') ||
    (playerMove === 'paper' && compMove === 'rock') ||
    (playerMove === 'scissors' && compMove === 'paper')
  ) {
    result.innerHTML = 'You won';
  } else {
    result.innerHTML = 'You lose';
  }

  updateScore();
}

// Function to update score and save to localStorage
function updateScore() {
  if (result.innerHTML === 'You won') {
    score.wins++;
  } else if (result.innerHTML === 'You lose') {
    score.losses++;
  } else if (result.innerHTML === 'Tie') {
    score.ties++;
  }

  // Update the score display
  scoreStorage.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

  // Save updated score to localStorage
  localStorage.setItem('score', JSON.stringify(score));
}

// Event listener to reset the score
resetButton.addEventListener('click', () => {
  score = { wins: 0, losses: 0, ties: 0 };

  // Update UI and save reset score to localStorage
  scoreStorage.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  localStorage.setItem('score', JSON.stringify(score));
});

// Event listeners for player moves
rockButton.addEventListener('click', () => playGame('rock'));
paperButton.addEventListener('click', () => playGame('paper'));
scissorsButton.addEventListener('click', () => playGame('scissors'));
