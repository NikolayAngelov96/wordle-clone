const root = document.getElementById('root');

const wordList = [
    'pizza',
    'sushi',
    'horse',
    'hello',
    'water'
]

let randomIndex = Math.floor(Math.random() * wordList.length);
const secretWord = wordList[randomIndex];
let currentAttempt = '';
const attempts = [];


window.addEventListener('keydown', handleKeydown)

createBoard();

function createBoard() {
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('div');
        row.className = 'row';

        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = '';

            row.appendChild(cell);
        }

        root.appendChild(row);
    }
}

function handleKeydown(e) {
    // handle shift, alt, ctrl keys
    let letter = e.key.toLowerCase();
    if (letter === 'enter') {

        if (currentAttempt.length < 5) {
            return;
        }

        if (attempts.length < 6) {
            attempts.push(currentAttempt);
            currentAttempt = '';
        }
    } else if (letter === 'backspace') {
        currentAttempt = currentAttempt.slice(0, currentAttempt.length - 1);
    } else {
        if (currentAttempt.length < 5) {
            currentAttempt += letter;
        }
    }
    updateBoard();

}

function updateBoard() {
    let row = root.firstChild;
    for (const attempt of attempts) {
        drawAttempt(row, attempt)
        row = row.nextSibling;
    }
    drawAttempt(row, currentAttempt)
}

function drawAttempt(row, attempt) {
    for (let i = 0; i < 5; i++) {
        let cell = row.children[i];
        if (attempt[i] !== undefined) {
            cell.textContent = attempt[i].toUpperCase();
        } else {
            // hack
            cell.innerHTML = '<div style="opacity: 0">X</div>';
        }

    }
}
