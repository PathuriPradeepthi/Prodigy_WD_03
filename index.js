document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('resetButton');
    const message = document.getElementById('message');
    const playerModeButton = document.getElementById('playerMode');
    const aiModeButton = document.getElementById('aiMode');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let isAiMode = false;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (event) => {
        const cell = event.target;
        const index = cell.getAttribute('data-index');

        if (board[index] !== '' || !gameActive) {
            return;
        }

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        checkWinner();
        
        if (isAiMode && currentPlayer === 'X' && gameActive) {
            currentPlayer = 'O';
            setTimeout(aiMove, 500); // AI move with a slight delay
        } else if (!isAiMode && gameActive) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    };

    const checkWinner = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            message.textContent = currentPlayer === 'X' ? 'Player 1 has won!' : 'Player 2 has won!';
            gameActive = false;
            return;
        }

        const roundDraw = !board.includes('');
        if (roundDraw) {
            message.textContent = 'Game is a draw!';
            gameActive = false;
            return;
        }
    };

    const aiMove = () => {
        let availableCells = [];
        board.forEach((cell, index) => {
            if (cell === '') {
                availableCells.push(index);
            }
        });

        if (availableCells.length > 0) {
            const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
            board[randomIndex] = currentPlayer;
            cells[randomIndex].textContent = currentPlayer;
            checkWinner();
            currentPlayer = 'X';
        }
    };

    const handleReset = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        message.textContent = '';
        cells.forEach(cell => cell.textContent = '');
    };

    const handlePlayerMode = () => {
        isAiMode = false;
        handleReset();
        message.textContent = 'Player mode selected';
        playerModeButton.classList.add('active');
        aiModeButton.classList.remove('active');
    };

    const handleAiMode = () => {
        isAiMode = true;
        handleReset();
        message.textContent = 'AI mode selected';
        aiModeButton.classList.add('active');
        playerModeButton.classList.remove('active');
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', handleReset);
    playerModeButton.addEventListener('click', handlePlayerMode);
    aiModeButton.addEventListener('click', handleAiMode);
});
