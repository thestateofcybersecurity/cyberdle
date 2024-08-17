// Define the word of the day (for testing purposes, you can hardcode a word)
const wordOfTheDay = "ACRON"; // Example word, replace with logic to fetch a word

// Game state
let currentRow = 0;
let currentGuess = '';
const maxGuesses = 6;
const wordLength = wordOfTheDay.length;

// Select DOM elements
const board = document.querySelector('.board');
const input = document.getElementById('input');
const guessButton = document.getElementById('guess-button');
const message = document.getElementById('message');

// Handle user input
input.addEventListener('input', (e) => {
    const inputValue = e.target.value.toUpperCase();
    if (inputValue.length <= wordLength) {
        currentGuess = inputValue;
    } else {
        input.value = currentGuess;
    }
});

// Handle guess submission
guessButton.addEventListener('click', () => {
    if (currentGuess.length !== wordLength) {
        message.textContent = `Your guess must be ${wordLength} letters long.`;
        return;
    }
    if (currentRow >= maxGuesses) {
        message.textContent = 'You have used all your guesses!';
        return;
    }
    evaluateGuess();
});

// Evaluate the user's guess
function evaluateGuess() {
    const row = board.children[currentRow].children;
    for (let i = 0; i < wordLength; i++) {
        const letterBox = row[i];
        const letter = currentGuess[i];

        // Set the default state (absent)
        letterBox.textContent = letter;
        letterBox.classList.add('absent');

        // Check for correct or present letters
        if (wordOfTheDay[i] === letter) {
            letterBox.classList.remove('absent');
            letterBox.classList.add('correct');
        } else if (wordOfTheDay.includes(letter)) {
            letterBox.classList.remove('absent');
            letterBox.classList.add('present');
        }
    }
    
    // Check if the guess is correct
    if (currentGuess === wordOfTheDay) {
        message.textContent = 'Congratulations! You guessed the word!';
        input.disabled = true;
        guessButton.disabled = true;
    } else if (currentRow === maxGuesses - 1) {
        message.textContent = `Game Over! The word was: ${wordOfTheDay}`;
        input.disabled = true;
        guessButton.disabled = true;
    } else {
        currentRow++;
        currentGuess = '';
        input.value = '';
        message.textContent = '';
    }
}

// Initialize the game board
function initBoard() {
    for (let i = 0; i < maxGuesses; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < wordLength; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
}

// Initialize the game
initBoard();
