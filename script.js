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
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("div");
        row.className = "row";
        
        for (let j = 0; j < 5; j++) {
            let tile = document.createElement("div");
            tile.className = "tile";
            row.appendChild(tile);
        }
        
        gameBoard.appendChild(row);
    }
}

function createKeyboard() {
    const keyboard = document.getElementById("keyboard");
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
    if (key === '⌫') {
        deleteLetter();
    } else if (key === 'ENTER') {
        checkGuess();
    } else if (nextLetter < 5 && guessesRemaining > 0) {
        addLetter(key);
    }
}

function addLetter(letter) {
    if (nextLetter < 5 && guessesRemaining > 0) {
        let tile = document.getElementById("game-board").children[6 - guessesRemaining].children[nextLetter];
        tile.textContent = letter;
        tile.classList.add("filled");
        currentGuess.push(letter);
        nextLetter++;
    }
}

function deleteLetter() {
    if (nextLetter > 0) {
        nextLetter--;
        let tile = document.getElementById("game-board").children[6 - guessesRemaining].children[nextLetter];
        tile.textContent = "";
        tile.classList.remove("filled");
        currentGuess.pop();
    }
}

function checkGuess() {
    if (nextLetter === 5) {
        let guess = currentGuess.join("");
        if (!acronyms.includes(guess)) {
            showMessage("Not in word list");
            return;
        }
        updateGameBoard(guess);
        guessesRemaining--;
        if (guess === targetAcronym) {
            showMessage("You win!");
            guessesRemaining = 0;
        } else if (guessesRemaining === 0) {
            showMessage(`You lose! The word was ${targetAcronym}`);
        }
        currentGuess = [];
        nextLetter = 0;
    }
}

function updateGameBoard(guess) {
    let row = document.getElementById("game-board").children[6 - guessesRemaining - 1];
    for (let i = 0; i < 5; i++) {
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
    document.getElementById("message").textContent = msg;
}

document.addEventListener("DOMContentLoaded", initializeGame);

// Add keyboard support
document.addEventListener("keydown", (e) => {
    if (guessesRemaining === 0) {
        return;
    }
    let pressedKey = String(e.key).toUpperCase();
    if (pressedKey === "BACKSPACE") {
        deleteLetter();
    } else if (pressedKey === "ENTER") {
        checkGuess();
    } else if (pressedKey.match(/^[A-Z]$/)) {
        handleKeyPress(pressedKey);
    }
});
