document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.querySelector('#status');
    const resetButton = document.querySelector('#reset');
    let currentPlayer = 'X';
    let board = Array(9).fill(null);
    
    const checkWinner = () => {
        const winningPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontaal
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticaal
            [0, 4, 8], [2, 4, 6]            // Diagonaal
        ];
        
        for (const pattern of winningPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                statusText.textContent = `${currentPlayer} wint!`;
                return board[a]; // Return 'X' of 'O' als winnaar
            }
        }
        
        if (board.every(cell => cell)) {
            statusText.textContent = "Gelijkspel!";
            return 'tie';
        }
        return null;
    };
    
    const minimax = (newBoard, isMaximizing) => {
        const winner = checkWinner();
        if (winner === 'O') return 10;
        if (winner === 'X') return -10;
        if (winner === 'tie') return 0;
        
        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < newBoard.length; i++) {
                if (!newBoard[i]) {
                    newBoard[i] = 'O';
                    let score = minimax(newBoard, false);
                    newBoard[i] = null;
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < newBoard.length; i++) {
                if (!newBoard[i]) {
                    newBoard[i] = 'X';
                    let score = minimax(newBoard, true);
                    newBoard[i] = null;
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    };
    
    const computerMove = () => {
        // 10% kans dat de computer een willekeurige zet doet
        const randomChance = Math.random() < 0.1; // 10% kans op fout
        
        if (randomChance) {
            const emptyCells = board.map((value, index) => value === null ? index : null).filter(value => value !== null);
            if (emptyCells.length > 0) {
                const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                board[randomIndex] = 'O';
                cells[randomIndex].textContent = 'O';
                if (!checkWinner()) {
                    currentPlayer = 'X';
                    statusText.textContent = `Beurt van ${currentPlayer}`;
                }
            }
        } else {
            let bestScore = -Infinity;
            let move;
            
            for (let i = 0; i < board.length; i++) {
                if (!board[i]) {
                    board[i] = 'O';
                    let score = minimax(board, false);
                    board[i] = null;
                    if (score > bestScore) {
                        bestScore = score;
                        move = i;
                    }
                }
            }
            
            if (move !== undefined) {
                board[move] = 'O';
                cells[move].textContent = 'O';
                if (!checkWinner()) {
                    currentPlayer = 'X';
                    statusText.textContent = `Beurt van ${currentPlayer}`;
                }
            }
        }
    };
    
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            const index = cell.dataset.index;
            if (!board[index] && currentPlayer === 'X') {
                board[index] = currentPlayer;
                cell.textContent = currentPlayer;
                if (!checkWinner()) {
                    currentPlayer = 'O';
                    statusText.textContent = `Beurt van ${currentPlayer}`;
                    setTimeout(computerMove, 500);
                }
            }
        });
    });

    resetButton.addEventListener('click', () => {
        board.fill(null);
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        statusText.textContent = `Beurt van ${currentPlayer}`;
    });
});