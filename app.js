const root = document.getElementById('root');

const wordList = [
    'pizza',
    'sushi',
    'horse',
    'hello',
    'water'
]

const colors = {
    lightgray: '#3a3a3c',
    yellow: '#b59f3b',
    green: '#538d4e',
    darkgray: '#121213'
}

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
    if(e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) {
        return;
    }

    let letter = e.key.toLowerCase();
    if (letter === 'enter') {

        if (currentAttempt.length < 5) {
            return;
        }

        if (attempts.length < 6) {
            attempts.push(currentAttempt);
            currentAttempt = '';
        }

        // when attemprs.length == 6 => end game
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
        drawAttempt(row, attempt, false)
        row = row.nextSibling;
    }
    drawAttempt(row, currentAttempt, true)
}

function drawAttempt(row, attempt, isCurrent) {
    for (let i = 0; i < 5; i++) {
        let cell = row.children[i];
        if (attempt[i] !== undefined) {
            cell.textContent = attempt[i].toUpperCase();
            if (isCurrent) {
                cell.style.backgroundColor = colors.darkgray;
            } else {
                cell.style.backgroundColor = getColors(attempt, i);
            }
        } else {
            // hack
            cell.innerHTML = '<div style="opacity: 0">X</div>';
        }
    }
}

function getColors(attempt, index) {

    if (secretWord[index] === attempt[index]) {
        return colors.green;
    }

    if (secretWord.includes(attempt[index])) {
        return colors.yellow;
    }

    return colors.lightgray;
}
