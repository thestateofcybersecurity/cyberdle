// Game variables
const board = document.getElementById('board');
const input = document.getElementById('input');
const guessButton = document.getElementById('guess-button');
const message = document.getElementById('message');

let currentGuess = '';
let row = 0;
let targetAcronym = 'PT';  // Example target acronym

// Initialize board
for (let i = 0; i < 30; i++) {
    const cell = document.createElement('div');
    board.appendChild(cell);
}

// Function to handle guesses
function handleGuess() {
    const guess = input.value.toUpperCase();
    if (guess.length !== 5) {
        message.textContent = 'Please enter a valid 5-letter acronym.';
        return;
    }

    let rowIndex = row * 5;
    let tempTarget = targetAcronym.split('');
    let correctLetters = Array(5).fill(null);

    // First pass: check for correct letters in correct positions
    for (let i = 0; i < 5; i++) {
        const cell = board.children[rowIndex + i];
        cell.textContent = guess[i];
        if (guess[i] === tempTarget[i]) {
            cell.classList.add('correct');
            correctLetters[i] = guess[i];
            tempTarget[i] = null;  // Remove matched letter from tempTarget
        }
    }

    // Second pass: check for correct letters in wrong positions
    for (let i = 0; i < 5; i++) {
        const cell = board.children[rowIndex + i];
        if (!cell.classList.contains('correct')) {
            if (tempTarget.includes(guess[i])) {
                cell.classList.add('present');
                tempTarget[tempTarget.indexOf(guess[i])] = null;  // Remove matched letter from tempTarget
            } else {
                cell.classList.add('absent');
            }
        }
    }

    row++;
    if (guess === targetAcronym) {
        message.textContent = `Correct! The acronym is ${targetAcronym}. ${acronyms[targetAcronym].definition}`;
        guessButton.disabled = true;
        input.disabled = true;
    } else if (row === 6) {
        message.textContent = `Game over! The correct acronym was ${targetAcronym}.`;
        guessButton.disabled = true;
        input.disabled = true;
    } else {
        input.value = '';
        input.focus();
    }
}

// Event listener for the guess button
guessButton.addEventListener('click', handleGuess);
