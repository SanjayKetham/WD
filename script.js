const cells = document.querySelectorAll('[data-cell]');
const gameMessage = document.getElementById('game-message');
let isXTurn = true;
let gameState = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(event) {
    const cell = event.target;
    const currentClass = isXTurn ? 'x' : 'o';
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameState[cellIndex] !== null) return;

    placeMark(cell, currentClass, cellIndex);
    if (checkWin(currentClass)) {
        endGame(false, currentClass);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function placeMark(cell, currentClass, index) {
    cell.classList.add(currentClass);
    cell.textContent = currentClass.toUpperCase();
    gameState[index] = currentClass;
}

function swapTurns() {
    isXTurn = !isXTurn;
}

function setBoardHoverClass() {
    gameMessage.textContent = `Player ${isXTurn ? 'X' : 'O'}'s turn`;
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameState[index] === currentClass;
        });
    });
}

function isDraw() {
    return gameState.every(cell => {
        return cell !== null;
    });
}

function endGame(draw, winnerClass) {
    if (draw) {
        gameMessage.textContent = "It's a Draw!";
    } else {
        gameMessage.textContent = `Player ${winnerClass.toUpperCase()} Wins!`;
    }
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

setBoardHoverClass();
