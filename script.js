document.addEventListener("DOMContentLoaded", () => {
    let currentWord = '';
    let currentGuess = '';
    let attempts = 0;
    const maxAttempts = 6;
    const gameBoard = document.getElementById('game-board');
    const keyboard = document.getElementById('keyboard');
    const message = document.getElementById('message');

    fetch('acronyms.json')
        .then(response => response.json())
        .then(data => {
            const acronyms = data.acronyms;
            currentWord = acronyms[Math.floor(Math.random() * acronyms.length)];
            createBoard();
            createKeyboard();
        });

    function createBoard() {
        gameBoard.innerHTML = '';
        for (let i = 0; i < maxAttempts; i++) {
            for (let j = 0; j < currentWord.length; j++) {
                const tile = document.createElement('div');
                tile.setAttribute('id', `tile-${i}-${j}`);
                gameBoard.appendChild(tile);
            }
        }
    }

    function createKeyboard() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        alphabet.split('').forEach(letter => {
            const button = document.createElement('button');
            button.textContent = letter;
            button.addEventListener('click', () => handleKeyPress(letter));
            keyboard.appendChild(button);
        });

        const enterButton = document.createElement('button');
        enterButton.textContent = 'Enter';
        enterButton.addEventListener('click', submitGuess);
        keyboard.appendChild(enterButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', deleteLetter);
        keyboard.appendChild(deleteButton);
    }

    function handleKeyPress(letter) {
        if (currentGuess.length < currentWord.length) {
            currentGuess += letter;
            document.getElementById(`tile-${attempts}-${currentGuess.length - 1}`).textContent = letter;
        }
    }

    function submitGuess() {
        if (currentGuess.length !== currentWord.length) {
            message.textContent = 'Incomplete guess!';
            return;
        }

        for (let i = 0; i < currentWord.length; i++) {
            const tile = document.getElementById(`tile-${attempts}-${i}`);
            if (currentGuess[i] === currentWord[i]) {
                tile.style.backgroundColor = 'green';
            } else if (currentWord.includes(currentGuess[i])) {
                tile.style.backgroundColor = 'yellow';
            } else {
                tile.style.backgroundColor = 'grey';
            }
        }

        if (currentGuess === currentWord) {
            message.textContent = 'You Win!';
            keyboard.querySelectorAll('button').forEach(button => button.disabled = true);
            return;
        }

        attempts++;
        currentGuess = '';

        if (attempts === maxAttempts) {
            message.textContent = `You Lose! The word was ${currentWord}`;
            keyboard.querySelectorAll('button').forEach(button => button.disabled = true);
        }
    }

    function deleteLetter() {
        if (currentGuess.length > 0) {
            const tile = document.getElementById(`tile-${attempts}-${currentGuess.length - 1}`);
            tile.textContent = '';
            currentGuess = currentGuess.slice(0, -1);
        }
    }
});
