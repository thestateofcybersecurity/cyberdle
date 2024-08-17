let acronyms;
let targetAcronym;
let targetDefinition;
let targetSources;
let guessesRemaining;
let currentGuess;
let nextLetter;
let gameOver;

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
            startNewGame();
        })
        .catch(error => {
            showMessage(`Error: ${error.message}`);
            gameOver = true; // Prevent the game from running if initialization fails
        });
}

function startNewGame() {
    const acronymKeys = Object.keys(acronyms);
    if (acronymKeys.length === 0) {
        throw new Error('Acronym list is empty.');
    }
    const randomIndex = Math.floor(Math.random() * acronymKeys.length);
    targetAcronym = acronymKeys[randomIndex].toUpperCase();
    targetDefinition = acronyms[targetAcronym].definition;
    targetSources = acronyms[targetAcronym].sources;
    guessesRemaining = 6;
    currentGuess = [];
    nextLetter = 0;
    gameOver = false;
    
    createGameBoard();
    createKeyboard();
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
    const keyboard = document.getElementById("keyboard");
    keyboard.innerHTML = ''; // Clear existing keyboard
    const keys = [
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
        'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'
    ];
    
    keys.forEach(key => {
        const buttonElement = document.createElement("button");
        buttonElement.textContent = key;
        buttonElement.classList.add("key");
        if (key === 'ENTER' || key === '⌫') {
            buttonElement.classList.add("wide");
        }
        buttonElement.addEventListener("click", () => handleKeyPress(key));
        keyboard.appendChild(buttonElement);
    });
}

function handleKeyPress(key) {
    if (gameOver) return;
    
    if (key === '⌫') {
        deleteLetter();
    } else if (key === 'ENTER') {
        submitGuess();
    } else if (nextLetter < targetAcronym.length && guessesRemaining > 0) {
        addLetter(key);
    }
}

function addLetter(letter) {
    if (nextLetter < targetAcronym.length && guessesRemaining > 0) {
        let row = document.getElementById("game-board").children[6 - guessesRemaining];
        let tile = row.children[nextLetter];
        tile.textContent = letter;
        tile.classList.add("filled");
        currentGuess.push(letter);
        nextLetter++;
    }
}

function deleteLetter() {
    if (nextLetter > 0) {
        nextLetter--;
        let row = document.getElementById("game-board").children[6 - guessesRemaining];
        let tile = row.children[nextLetter];
        tile.textContent = "";
        tile.classList.remove("filled");
        currentGuess.pop();
    }
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
        showEndGameMessage(true);
        gameOver = true;
    } else if (guessesRemaining === 0) {
        showEndGameMessage(false);
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
        
        // Remove setTimeout to update immediately
        if (letter === targetAcronym[i]) {
            tile.classList.add("correct");
        } else if (targetAcronym.includes(letter)) {
            tile.classList.add("present");
        } else {
            tile.classList.add("absent");
        }
    }
}

function showEndGameMessage(isWin) {
    let message = isWin ? 
        `You win! ${targetAcronym} stands for: ${targetDefinition}` :
        `You lose! The acronym was ${targetAcronym}: ${targetDefinition}`;
    
    showMessage(message, true);
    displaySourceLinks();
}

function displaySourceLinks() {
    const messageElement = document.getElementById("message");
    const sourcesDiv = document.createElement("div");
    sourcesDiv.className = "sources";
    sourcesDiv.innerHTML = "<p>Sources:</p>";
    
    targetSources.forEach(source => {
        const link = document.createElement("a");
        link.href = source.url;
        link.textContent = source.name;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        sourcesDiv.appendChild(link);
        sourcesDiv.appendChild(document.createElement("br"));
    });
    
    messageElement.appendChild(sourcesDiv);
}

function showMessage(msg, persistent = false) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = msg;
    messageElement.style.display = "block";
    
    if (!persistent) {
        setTimeout(() => {
            messageElement.style.display = "none";
        }, 3000);
    }
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
