let acronyms;
let targetAcronym;
let targetDefinition;
let guessesRemaining = 6;
let currentGuess = [];
let nextLetter = 0;
let gameOver = false;

function initializeGame() {
    fetch('acronyms.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load acronyms.');
            }
            return response.json();
        })
        .then(data => {
            acronyms = data;
            const acronymKeys = Object.keys(acronyms);
            if (acronymKeys.length === 0) {
                throw new Error('Acronym list is empty.');
            }
            const randomIndex = Math.floor(Math.random() * acronymKeys.length);
            targetAcronym = acronymKeys[randomIndex].toUpperCase();
            targetDefinition = acronyms[targetAcronym].definition;
            createGameBoard();
            createKeyboard();
        })
        .catch(error => {
            showMessage(`Error: ${error.message}`);
            gameOver = true; // Prevent the game from running if initialization fails
        });
}

function createGameBoard() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = ''; // Clear existing board
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("div");
        row.className = "row";
        
        for (let j = 0; j < targetAcronym.length; j++) {
            let tile = document.createElement("div");
            tile.className = "tile";
            row.appendChild(tile);
        }
        
        gameBoard.appendChild(row);
    }
}

function createKeyboard() {
    // ... (keyboard creation code remains the same)
}

function handleKeyPress(key) {
    // ... (handleKeyPress function remains the same)
}

function addLetter(letter) {
    // ... (addLetter function remains the same)
}

function deleteLetter() {
    // ... (deleteLetter function remains the same)
}

function submitGuess() {
    if (nextLetter !== targetAcronym.length) {
        showMessage(`Not enough letters. The acronym has ${targetAcronym.length} letters.`);
        return;
    }

    let guess = currentGuess.join("");
    updateGameBoard(guess);
    guessesRemaining--;
    
    if (guess === targetAcronym) {
        showMessage(`You win! ${targetAcronym} stands for: ${targetDefinition}`);
        gameOver = true;
    } else if (guessesRemaining === 0) {
        showMessage(`You lose! The acronym was ${targetAcronym}: ${targetDefinition}`);
        gameOver = true;
    } else {
        showMessage(`Incorrect. ${guessesRemaining} guesses remaining.`);
    }
    
    currentGuess = [];
    nextLetter = 0;
}

function updateGameBoard(guess) {
    if (guessesRemaining < 0 || guessesRemaining > 6) return; // Prevent out-of-bounds access

    let row = document.getElementById("game-board").children[6 - guessesRemaining - 1];
    if (!row) return; // Check if row exists

    for (let i = 0; i < targetAcronym.length; i++) {
        let tile = row.children[i];
        if (!tile) continue; // Skip if tile doesn't exist

        let letter = guess[i];
        
        if (letter === targetAcronym[i]) {
            tile.classList.add("correct");
        } else if (targetAcronym.includes(letter)) {
            tile.classList.add("present");
        } else {
            tile.classList.add("absent");
        }
    }
}

function showMessage(msg) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = msg;
    messageElement.style.display = "block";
    setTimeout(() => {
        messageElement.style.display = "none";
    }, 3000);
}

document.addEventListener("DOMContentLoaded", initializeGame);

// Add keyboard support
document.addEventListener("keydown", (e) => {
    if (gameOver) return;
    
    let pressedKey = String(e.key).toUpperCase();
    if (pressedKey === "BACKSPACE") {
        deleteLetter();
    } else if (pressedKey === "ENTER") {
        submitGuess();
    } else if (pressedKey.match(/^[A-Z]$/)) {
        handleKeyPress(pressedKey);
    }
});
