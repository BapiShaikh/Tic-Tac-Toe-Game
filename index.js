document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("grid");
    const cells = document.getElementsByClassName("cell");
    const status = document.getElementById("status");
    const restartButton = document.getElementById("restart");
  
    let currentPlayer = "X";
    let gameActive = true;
    let moves = 0;
  
    // Array to keep track of the game board
    let board = ["", "", "", "", "", "", "", "", ""];
  
    // Winning combinations
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    // Function to handle cell click event
    const handleCellClick = (e) => {
      const clickedCell = e.target;
      const clickedCellIndex = Array.from(cells).indexOf(clickedCell);
  
      // Check if the clicked cell is already played or the game is not active
      if (board[clickedCellIndex] !== "" || !gameActive) {
        return;
      }
  
      // Update the board and UI with the current player's move
      board[clickedCellIndex] = currentPlayer;
      clickedCell.textContent = currentPlayer;
      clickedCell.classList.add(currentPlayer);
  
      // Check if the current player has won
      if (checkWin()) {
        status.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
      }
  
      // Check if the game ends with a draw
      if (moves === 8) {
        status.textContent = "It's a draw!";
        gameActive = false;
        return;
      }
  
      // Switch to the next player
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      status.textContent = `Player ${currentPlayer}'s turn`;
      moves++;
    };
  
    // Function to check if the current player has won
    const checkWin = () => {
      for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (
          board[a] === currentPlayer &&
          board[b] === currentPlayer &&
          board[c] === currentPlayer
        ) {
          return true;
        }
      }
      return false;
    };
  
    // Function to restart the game
    const restartGame = () => {
      currentPlayer = "X";
      gameActive = true;
      moves = 0;
      board = ["", "", "", "", "", "", "", "", ""];
      status.textContent = `Player ${currentPlayer}'s turn`;
  
      // Clear the board and remove all the played cell classes
      Array.from(cells).forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("X", "O");
      });
    };
  
    // Add event listeners to each cell
    Array.from(cells).forEach((cell) => {
      cell.addEventListener("click", handleCellClick);
    });
  
    // Add event listener to the restart button
    restartButton.addEventListener("click", restartGame);
  });