const root = document.getElementById('root');

createBoard();

function createBoard() {
    for(let i = 0; i < 6; i++) {
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