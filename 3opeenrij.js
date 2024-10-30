// Tic-Tac-Toe Game
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.querySelector('#status');
    const resetButton = document.querySelector('#reset');
    let currentPlayer = 'X';
    let board = Array(9).fill(null);
    
    // Functie om het bord te controleren op een winnaar
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
                return true;
            }
        }
        
        if (board.every(cell => cell)) {
            statusText.textContent = "Gelijkspel!";
            return true;
        }
        return false;
    };
    
    // Functie voor de computer om een zet te doen
    const computerMove = () => {
        // Zoek een willekeurige lege cel
        const emptyCells = board.map((value, index) => value === null ? index : null).filter(value => value !== null);
        if (emptyCells.length > 0) {
            const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            board[randomIndex] = 'O';
            cells[randomIndex].textContent = 'O';
            if (!checkWinner()) {
                currentPlayer = 'X'; // Zet de beurt terug naar de speler
                statusText.textContent = `Beurt van ${currentPlayer}`;
            }
        }
    };
    
    // Klikgebeurtenis voor elke cel
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            const index = cell.dataset.index;
            if (!board[index] && currentPlayer === 'X') { // Zorg dat alleen 'X' kan klikken
                board[index] = currentPlayer;
                cell.textContent = currentPlayer;
                if (!checkWinner()) {
                    currentPlayer = 'O';
                    statusText.textContent = `Beurt van ${currentPlayer}`;
                    setTimeout(computerMove, 500); // Wacht even en laat de computer spelen
                }
            }
        });
    });

    // Reset het spel
    resetButton.addEventListener('click', () => {
        board.fill(null);
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        statusText.textContent = `Beurt van ${currentPlayer}`;
    });
});