let acronyms;
let targetAcronym;
let guessesRemaining = 6;
let currentGuess = [];
let nextLetter = 0;

function initializeGame() {
    fetch('acronyms.json')
        .then(response => response.json())
        .then(data => {
            acronyms = Object.keys(data);
            targetAcronym = acronyms[Math.floor(Math.random() * acronyms.length)];
            console.log(targetAcronym); // For testing purposes
            createGameBoard();
            createKeyboard();
        });
}

function createGameBoard() {
    const gameBoard = document.getElementById("game-board");
    for (let i = 0; i < 30; i++) {
        let tile = document.createElement("div");
        tile.classList.add("tile");
        gameBoard.appendChild(tile);
    }
}

function createKeyboard() {
    const keyboard = document.getElementById("keyboard");
    const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let key of keys) {
        let button = document.createElement("button");
        button.textContent = key;
        button.classList.add("key");
        button.addEventListener("click", () => handleKeyPress(key));
        keyboard.appendChild(button);
    }
    let enterButton = document.createElement("button");
    enterButton.textContent = "Enter";
    enterButton.addEventListener("click", () => handleEnter());
    keyboard.appendChild(enterButton);
}

function handleKeyPress(key) {
    if (nextLetter === 5) return;
    let tile = document.getElementById("game-board").children[guessesRemaining * 5 - 5 + nextLetter];
    tile.textContent = key;
    tile.classList.add("filled");
    currentGuess.push(key);
    nextLetter++;
}

function handleEnter() {
    if (nextLetter !== 5) return;
    let guess = currentGuess.join("");
    if (!acronyms.includes(guess)) {
        showMessage("Not in word list");
        return;
    }
    updateGameBoard(guess);
    currentGuess = [];
    nextLetter = 0;
    guessesRemaining--;
    if (guess === targetAcronym) {
        showMessage("You win!");
        guessesRemaining = 0;
    } else if (guessesRemaining === 0) {
        showMessage(`You lose! The word was ${targetAcronym}`);
    }
}

function updateGameBoard(guess) {
    let row = document.getElementById("game-board").children;
    for (let i = 0; i < 5; i++) {
        let tile = row[guessesRemaining * 5 - 5 + i];
        let color = "grey";
        if (guess[i] === targetAcronym[i]) {
            color = "green";
        } else if (targetAcronym.includes(guess[i])) {
            color = "yellow";
        }
        tile.style.backgroundColor = color;
    }
}

function showMessage(msg) {
    document.getElementById("message").textContent = msg;
}

document.addEventListener("DOMContentLoaded", initializeGame);
