let acronyms;
let targetAcronym;
let targetDefinition;
let guessesRemaining = 6;
let currentGuess = [];
let nextLetter = 0;
let gameOver = false;

function initializeGame() {
    fetch('acronyms.json')
        .then(response => response.json())
        .then(data => {
            acronyms = data;
            const acronymKeys = Object.keys(acronyms);
            const randomIndex = Math.floor(Math.random() * acronymKeys.length);
            targetAcronym = acronymKeys[randomIndex];
            targetDefinition = acronyms[targetAcronym].definition;
            console.log(targetAcronym); // For testing purposes
            createGameBoard();
            createKeyboard();
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
        checkGuess();
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

function checkGuess() {
    if (nextLetter === targetAcronym.length) {
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
    } else {
        showMessage(`Not enough letters. The acronym has ${targetAcronym.length} letters.`);
    }
}

function updateGameBoard(guess) {
    let row = document.getElementById("game-board").children[6 - guessesRemaining - 1];
    for (let i = 0; i < targetAcronym.length; i++) {
        let tile = row.children[i];
        let letter = guess[i];
        
        setTimeout(() => {
            if (letter === targetAcronym[i]) {
                tile.classList.add("correct");
            } else if (targetAcronym.includes(letter)) {
                tile.classList.add("present");
            } else {
                tile.classList.add("absent");
            }
        }, 250 * i);
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
        checkGuess();
    } else if (pressedKey.match(/^[A-Z]$/)) {
        handleKeyPress(pressedKey);
    }
});
