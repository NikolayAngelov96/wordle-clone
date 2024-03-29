const root = document.getElementById("root");
const notification = document.querySelector(".notification");
const endScreen = document.querySelector(".end-screen");
const keyboardContainer = document.querySelector(".keyboard-container");

const wordList = ["pizza", "sushi", "horse", "hello", "water"];

const colors = {
  lightgray: "#3a3a3c",
  yellow: "#b59f3b",
  green: "#538d4e",
  darkgray: "#121213",
  borderGray: "#565758",
};

let randomIndex = Math.floor(Math.random() * wordList.length);
const secretWord = wordList[randomIndex];

let currentAttempt = "";
let attempts = [];

startGame();

function startGame() {
  window.addEventListener("keydown", handleKeydown);
  createBoard();
  generateKeyboard();

  currentAttempt = "";
  attempts = [];
}

function createBoard() {
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("div");
    row.className = "row";

    for (let j = 0; j < 5; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.textContent = "";

      row.appendChild(cell);
    }

    root.appendChild(row);
  }
}

function handleLetterInput(letter) {
  if (letter === "enter") {
    if (currentAttempt.length < 5) {
      return;
    }

    if (attempts.length < 6) {
      attempts.push(currentAttempt);
      currentAttempt = "";
    }

    if (attempts.length === 6 && currentAttempt !== secretWord) {
      notify(false);
    }
  } else if (letter === "del" || letter === "backspace") {
    currentAttempt = currentAttempt.slice(0, currentAttempt.length - 1);
  } else if (/[a-z]/.test(letter)) {
    if (currentAttempt.length < 5) {
      currentAttempt += letter;
    }
  }
  updateBoard();
}

function handleKeydown(e) {
  if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) {
    return;
  }

  handleLetterInput(e.key.toLowerCase());
}

function updateBoard() {
  let row = root.firstChild;
  for (const attempt of attempts) {
    drawAttempt(row, attempt, false);
    row = row.nextSibling;
    if (attempt === secretWord) {
      notify(true);
    }
  }
  drawAttempt(row, currentAttempt, true);
}

function drawAttempt(row, attempt, isCurrent) {
  for (let i = 0; i < 5; i++) {
    let cell = row.children[i];
    if (attempt[i] !== undefined) {
      cell.textContent = attempt[i];
      setAnimationOnPress(cell);

      if (isCurrent) {
        cell.style.backgroundColor = colors.darkgray;
      } else {
        cell.style.backgroundColor = getColors(attempt, i);
      }
    } else {
      // hack
      cell.innerHTML = '<div style="opacity: 0">X</div>';
      clearAnimationOnPress(cell);
    }
  }
}

function setAnimationOnPress(cell) {
  cell.style.animationName = "press";
  cell.style.animationDuration = "100ms";
  cell.style.animationTimingFunction = "ease-in";
  cell.style.borderColor = colors.borderGray;
}

function clearAnimationOnPress(cell) {
  cell.style.animationName = "";
  cell.style.animationDuration = "";
  cell.style.animationTimingFunction = "";
  cell.style.borderColor = "";
}

function getColors(attempt, index) {
  if (secretWord[index] === attempt[index]) {
    return colors.green;
  }

  if (secretWord.includes(attempt[index])) {
    return colors.yellow;
  }

  return colors.lightgray;
}

function notify(hasWon) {
  notification.style.display = "block";

  if (hasWon) {
    notification.textContent = "Magnificent!";
  } else {
    notification.textContent = secretWord.toUpperCase();
  }

  setTimeout(() => {
    notification.style.display = "";
    endGame(hasWon);
  }, 2500);
}

function endGame(hasWon) {
  endScreen.style.display = "block";
  endScreen.querySelector(".message").textContent = hasWon
    ? "You WON"
    : "Do you want to try again?";
  window.removeEventListener("keydown", handleKeydown);

  endScreen.querySelector(".play").addEventListener("click", () => {
    root.innerHTML = "";
    keyboardContainer.innerHTML = "";
    endScreen.style.display = "none";

    startGame();
  });
}

function createKeyboard(keys) {
  const container = document.createElement("div");
  container.classList.add("keyboard-row");

  function handleClickFromScreenKeyboard(e) {
    let letter = e.target.textContent.toLowerCase();

    handleLetterInput(letter);
  }

  for (const key of keys) {
    const button = document.createElement("button");
    button.classList.add("letter");
    button.textContent = key;
    container.appendChild(button);

    button.addEventListener("click", handleClickFromScreenKeyboard);
  }

  keyboardContainer.appendChild(container);
}

function generateKeyboard() {
  createKeyboard("qwertyuiop");
  createKeyboard("asdfghjkl");
  createKeyboard(["enter", "z", "x", "c", "v", "b", "n", "m", "del"]);
}
