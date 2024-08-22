let acronyms;
let targetAcronym;
let targetDefinition;
let targetSources;
let guessesRemaining = 6;
let currentGuess = [];
let nextLetter = 0;
let gameOver = false;
let currentRow = 0;
let canGuess = true;

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
            showMessage(`Error: ${error.message}`, true);
            console.error('Error:', error);
            gameOver = true;
        });
}

function resetKeyboard() {
    const keys = document.querySelectorAll(".key");
    keys.forEach(key => {
        key.classList.remove("correct", "present", "absent");
    });
}

function clearMessage() {
    const messageElement = document.getElementById("message");
    messageElement.textContent = '';
    messageElement.style.display = "none";
}

function startNewGame() {
    clearMessage();
    resetKeyboard();
    const acronymKeys = Object.keys(acronyms);
    if (acronymKeys.length === 0) {
        showMessage('Acronym list is empty.', true);
        gameOver = true;
        return;
    }
    const randomIndex = Math.floor(Math.random() * acronymKeys.length);
    targetAcronym = acronymKeys[randomIndex].toUpperCase();
    targetDefinition = acronyms[targetAcronym].definition;
    targetSources = acronyms[targetAcronym].sources;
    guessesRemaining = 6;
    currentGuess = [];
    nextLetter = 0;
    currentRow = 0;
    gameOver = false;
    canGuess = true;
    
    console.log('New game started. Target acronym:', targetAcronym);
    
    createGameBoard(6, targetAcronym.length);
    createKeyboard();
}

function createGameBoard(rows = 6, cols) {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = ''; // Clear existing board
    gameBoard.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    gameBoard.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    
    for (let i = 0; i < rows * cols; i++) {
        let tile = document.createElement("div");
        tile.className = "tile";
        gameBoard.appendChild(tile);
    }
}

function createKeyboard() {
    const keyboard = document.getElementById("keyboard");
    keyboard.innerHTML = '';
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

function submitGuess() {
    if (!canGuess || gameOver) return;
    
    if (nextLetter !== targetAcronym.length) {
        showMessage(`Not enough letters. The acronym has ${targetAcronym.length} letters.`);
        return;
    }

    canGuess = false;
    let guess = currentGuess.join("");
    console.log('Submitting guess:', guess, 'Target:', targetAcronym);
    
    updateGameBoard(guess);
    guessesRemaining--;
    currentRow++;
    
    if (guess === targetAcronym) {
        showEndGameMessage(true);
        gameOver = true;
    } else if (guessesRemaining === 0) {
        showEndGameMessage(false);
        gameOver = true;
    } else {
        showMessage(`Incorrect. ${guessesRemaining} guesses remaining.`);
        setTimeout(() => {
            canGuess = true;
            currentGuess = [];
            nextLetter = 0;
        }, 300);
    }
}

function updateGameBoard(guess) {
    console.log('Updating game board for guess:', guess, 'Target:', targetAcronym, 'Current Row:', currentRow);
    
    let remainingLetters = targetAcronym.split('');

    for (let i = 0; i < targetAcronym.length; i++) {
        let tile = document.getElementById("game-board").children[currentRow * targetAcronym.length + i];
        if (!tile) continue;

        let letter = guess[i];
        tile.textContent = letter;
        
        if (letter === targetAcronym[i]) {
            tile.classList.add("correct");
            remainingLetters[i] = null;
        }
    }

    for (let i = 0; i < targetAcronym.length; i++) {
        let tile = document.getElementById("game-board").children[currentRow * targetAcronym.length + i];
        if (!tile) continue;

        let letter = guess[i];
        
        if (letter !== targetAcronym[i]) {
            let index = remainingLetters.indexOf(letter);
            if (index !== -1) {
                tile.classList.add("present");
                remainingLetters[index] = null;
            } else {
                tile.classList.add("absent");
            }
        }
    }

    updateKeyboard(guess);
}

function handleKeyPress(key) {
    if (gameOver || !canGuess) return;
    
    console.log('Key pressed:', key, 'Current target:', targetAcronym);
    
    if (key === '⌫' || key === 'BACKSPACE') {
        deleteLetter();
    } else if (key === 'ENTER') {
        submitGuess();
    } else if (key.length === 1 && key.match(/^[A-Z]$/) && nextLetter < targetAcronym.length && guessesRemaining > 0) {
        addLetter(key);
    }
}

function addLetter(letter) {
    if (nextLetter < targetAcronym.length && guessesRemaining > 0) {
        let tile = document.getElementById("game-board").children[currentRow * targetAcronym.length + nextLetter];
        tile.textContent = letter;
        tile.classList.add("filled");
        currentGuess.push(letter);
        nextLetter++;
    }
}

function deleteLetter() {
    if (nextLetter > 0) {
        nextLetter--;
        let tile = document.getElementById("game-board").children[currentRow * targetAcronym.length + nextLetter];
        tile.textContent = "";
        tile.classList.remove("filled");
        currentGuess.pop();
    }
}

document.addEventListener("keydown", (e) => {
    if (gameOver || !canGuess) return;
    
    let pressedKey = String(e.key).toUpperCase();
    
    if (pressedKey === "BACKSPACE") {
        deleteLetter();
    } else if (pressedKey === "ENTER") {
        submitGuess();
    } else if (pressedKey.length === 1 && pressedKey.match(/^[A-Z]$/)) {
        handleKeyPress(pressedKey);
    }
});

function updateKeyboard(guess) {
    const keyboard = document.getElementById("keyboard");
    const keys = keyboard.getElementsByClassName("key");

    for (let i = 0; i < guess.length; i++) {
        const letter = guess[i];
        const keyElement = Array.from(keys).find(key => key.textContent === letter);
        
        if (keyElement) {
            if (targetAcronym[i] === letter) {
                // If the letter is correct, always update to green
                keyElement.classList.remove("present", "absent");
                keyElement.classList.add("correct");
            } else if (targetAcronym.includes(letter) && !keyElement.classList.contains("correct")) {
                // If the letter is present but not correct, and the key isn't already marked as correct
                keyElement.classList.remove("absent");
                keyElement.classList.add("present");
            } else if (!targetAcronym.includes(letter) && !keyElement.classList.contains("correct") && !keyElement.classList.contains("present")) {
                // If the letter is absent and the key isn't already marked as correct or present
                keyElement.classList.add("absent");
            }
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
