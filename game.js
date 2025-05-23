// Selectors
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnInfo = document.querySelector("#turn-info");
let scoreOEl = document.querySelector("#scoreO");
let scoreXEl = document.querySelector("#scoreX");

let nameModal = document.querySelector("#name-modal");
let startGameBtn = document.querySelector("#start-game-btn");
let playerOInput = document.querySelector("#playerO-name");
let playerXInput = document.querySelector("#playerX-name");

let turnO = true;
let count = 0;

let playerOName = "Player O";
let playerXName = "Player X";

let scoreO = 0;
let scoreX = 0;

// Sounds - add your own sound file URLs or use these placeholders
const clickSound = new Audio("click.mp3");
const winSound = new Audio("win.mp3");
const drawSound = new Audio("draw.mp3");

// Function to update turn info text with player names
const updateTurnInfo = () => {
  turnInfo.innerText = `Turn: ${turnO ? playerOName : playerXName}`;
};

// Update scoreboard UI
const updateScoreboard = () => {
  scoreOEl.innerText = `${playerOName}: ${scoreO}`;
  scoreXEl.innerText = `${playerXName}: ${scoreX}`;
};

// Reset game state
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  updateTurnInfo();
  clearBoxes();
};

// Clear boxes content and enable them
const clearBoxes = () => {
  boxes.forEach(box => {
    box.innerText = "";
    box.disabled = false;
  });
};

// Show winner message, update scores & play win sound
const showWinner = (winner) => {
  msg.innerText = `🎉 Congratulations, ${winner} won!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  winSound.play();

  // Update score
  if (winner === playerOName) {
    scoreO++;
  } else if (winner === playerXName) {
    scoreX++;
  }
  updateScoreboard();
  turnInfo.innerText = "";
};

// Show draw message & play draw sound
const gameDraw = () => {
  msg.innerText = `It’s a draw! ⚖️`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  drawSound.play();
  turnInfo.innerText = "";
};

// Disable all boxes
const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

// Enable all boxes
const enableBoxes = () => {
  boxes.forEach(box => box.disabled = false);
};

// Check if there is a winner
const checkWinner = () => {
  const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
      return pos1Val;
    }
  }
  return null;
};

// On box click handler
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // if (turnO) {
    //   box.innerText = "O";
    // } else {
    //   box.innerText = "X";
    // }

    // Set symbol
let symbol = turnO ? "O" : "X";
box.innerText = symbol;

// Remove old class (precaution)
box.classList.remove("x", "o");

// Add new class for color
box.classList.add(symbol.toLowerCase());


    box.classList.add("bounce");
    box.addEventListener("animationend", () => box.classList.remove("bounce"), { once: true });

    box.disabled = true;
    count++;

    clickSound.play();

    let winnerSymbol = checkWinner();

    if (winnerSymbol) {
      let winnerName = winnerSymbol === "O" ? playerOName : playerXName;
      showWinner(winnerName);
    } else if (count === 9) {
      gameDraw();
    } else {
      turnO = !turnO;
      updateTurnInfo();
    }
  });
});

// When user clicks "New Game" or "Reset Game"
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

// Start game button click: save names and close modal
startGameBtn.addEventListener("click", () => {
  let pO = playerOInput.value.trim();
  let pX = playerXInput.value.trim();
  playerOName = pO === "" ? "Player O" : pO;
  playerXName = pX === "" ? "Player X" : pX;
  nameModal.style.display = "none";
  resetGame();
  updateScoreboard();
});

// Show name input modal on page load
window.onload = () => {
  nameModal.style.display = "flex";
  turnInfo.innerText = "";
  scoreOEl.innerText = "";
  scoreXEl.innerText = "";
};

const themeBtn = document.getElementById("themeToggle");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // Emoji toggle based on theme
  if (document.body.classList.contains("dark")) {
    themeBtn.textContent = "Light Theme🌞";  // Sun for light mode
  } else {
    themeBtn.textContent = "Dark Theme🌙";  // Moon for dark mode
  }
});

