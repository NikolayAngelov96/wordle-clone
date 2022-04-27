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
        row.classList.add('row');

        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';

            row.appendChild(cell);
        }

        root.appendChild(row);
    }
}

function handleKeydown(e) {
    const key = e.key;
    if (e.ctrlKey || e.metaKey || e.altKey) {
        return
    }
    let letter = key.toLowerCase();

    if (letter === 'enter') {

        if (currentAttempt.length < 5) {
            return;
        }

        if (attempts.length < 6) {
            attempts.push(currentAttempt);
            currentAttempt = '';
        }
    } else if (letter === 'backspace') {
        console.log('backspace pressed');
    } else {
        
        console.log(letter);
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
}

function drawAttempt(row, attempt) {
    for (let i = 0; i < 5; i++) {
        let cell = row.children[i];
        cell.textContent = attempt[i].toUpperCase();

    }
}
