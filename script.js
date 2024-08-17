// Game state
let currentRow = 0;
let currentGuess = '';
const maxGuesses = 6;
let wordLength;
let wordOfTheDay;
let definitionOfTheDay;

// Select DOM elements
const board = document.querySelector('.board');
const input = document.getElementById('input');
const guessButton = document.getElementById('guess-button');
const message = document.getElementById('message');
const definitionSection = document.getElementById('definition'); // Element to show the definition

// Fetch acronyms from JSON file
async function fetchAcronyms() {
    try {
        const response = await fetch('acronyms.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching acronyms:', error);
        return {};
    }
}

// Select a random word and its definition from the list
function selectRandomWord(acronyms) {
    const keys = Object.keys(acronyms);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    wordOfTheDay = randomKey;
    definitionOfTheDay = acronyms[randomKey].definition;
    wordLength = wordOfTheDay.length;
}

// Initialize the game
async function initGame() {
    const acronyms = await fetchAcronyms();
    if (Object.keys(acronyms).length === 0) {
        message.textContent = 'Error loading acronyms. Please try again later.';
        return;
    }
    selectRandomWord(acronyms);
    initBoard();
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
        showDefinition();
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
            updateKeyColor(letter, 'correct');
        } else if (wordOfTheDay.includes(letter)) {
            letterBox.classList.remove('absent');
            letterBox.classList.add('present');
            updateKeyColor(letter, 'present');
        } else {
            updateKeyColor(letter, 'absent');
        }
    }

    // Check if the guess is correct
    if (currentGuess === wordOfTheDay) {
        message.textContent = 'Congratulations! You guessed the word!';
        input.disabled = true;
        guessButton.disabled = true;
        showDefinition();
    } else if (currentRow === maxGuesses - 1) {
        message.textContent = `Game Over! The word was: ${wordOfTheDay}`;
        input.disabled = true;
        guessButton.disabled = true;
        showDefinition();
    } else {
        currentRow++;
        currentGuess = '';
        input.value = '';
        message.textContent = '';
    }
}

function updateKeyColor(letter, status) {
    const key = document.querySelector(`.key[data-key="${letter}"]`);
    if (key) {
        key.classList.remove('absent', 'present', 'correct');
        key.classList.add(status);
    }
}

// Show the definition of the word after the game ends
function showDefinition() {
    const definitionContent = `
        <h3>Definition</h3>
        <p>${definitionOfTheDay}</p>
        <h4>Sources:</h4>
        <ul>
            ${wordOfTheDay.sources.map(source => `<li><a href="${source.url}" target="_blank">${source.name}</a></li>`).join('')}
        </ul>
    `;
    definitionSection.innerHTML = definitionContent;
}

// Start the game
initGame();
