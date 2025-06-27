<<<<<<< HEAD
const choices = ["rock", "paper", "scissors"];
        const playerDisplay = document.getElementById("playerDisplay");
        const computerDisplay = document.getElementById("computerDisplay");
        const resultDisplay = document.getElementById("resultDisplay");
        const playerScoreDisplay = document.getElementById("playerScoreDisplay");
        const computerScoreDisplay = document.getElementById("computerScoreDisplay");
        const gameOverlay = document.getElementById("gameOverlay");
        const overlayMessage = document.getElementById("overlayMessage");
        const overlayButtons = document.getElementById("overlayButtons");
        let playerScore = 0;
        let computerScore = 0;
        let turns = 0;
        const maxTurns = 5;

        function playGame(playerChoice) {
            if (turns >= maxTurns) return;

            const computerChoice = choices[Math.floor(Math.random() * 3)];
            let result = "";

            if (playerChoice === computerChoice) {
                result = "IT'S A TIE!";
            } else {
                switch (playerChoice) {
                    case "rock":
                        result = (computerChoice === "scissors") ? "YOU WIN!" : "YOU LOSE!";
                        break;
                    case "paper":
                        result = (computerChoice === "rock") ? "YOU WIN!" : "YOU LOSE!";
                        break;
                    case "scissors":
                        result = (computerChoice === "paper") ? "YOU WIN!" : "YOU LOSE!";
                        break;
                }
            }

            playerDisplay.textContent = `PLAYER: ${playerChoice}`;
            computerDisplay.textContent = `COMPUTER: ${computerChoice}`;
            resultDisplay.textContent = result;

            resultDisplay.classList.remove("greenText", "redText");

            switch (result) {
                case "YOU WIN!":
                    resultDisplay.classList.add("greenText");
                    playerScore++;
                    playerScoreDisplay.textContent = playerScore;
                    break;
                case "YOU LOSE!":
                    resultDisplay.classList.add("redText");
                    computerScore++;
                    computerScoreDisplay.textContent = computerScore;
                    break;
            }

            turns++;
            if (turns === maxTurns) {
                showGameResult();
            }
        }

        function showGameResult() {
            gameOverlay.style.display = "flex";
            const choicesButtons = document.querySelectorAll(".choices button");
            choicesButtons.forEach(button => button.disabled = true);
            document.getElementById("backButton").disabled = true;

            if (playerScore > computerScore) {
                overlayMessage.textContent = "Congratulations! You Won!";
                overlayButtons.innerHTML = `
                    <button onclick="window.location.href='http://localhost:8080/room2'">Back to Home</button>
                `;
            } else if (playerScore < computerScore) {
                overlayMessage.textContent = "Sorry, You Lost!";
                overlayButtons.innerHTML = `
                    <button onclick="resetGame()">Play Again</button>
                    <button onclick="window.location.href='http://localhost:8080/room2'">Back to Home</button>
                `;
            } else {
                overlayMessage.textContent = "It's a Tie!";
                overlayButtons.innerHTML = `
                    <button onclick="resetGame()">Play Again</button>
                    <button onclick="window.location.href='http://localhost:8080/room2'">Back to Home</button>
                `;
            }
        }

        function resetGame() {
            playerScore = 0;
            computerScore = 0;
            turns = 0;
            playerScoreDisplay.textContent = playerScore;
            computerScoreDisplay.textContent = computerScore;
            playerDisplay.textContent = "PLAYER: ";
            computerDisplay.textContent = "COMPUTER: ";
            resultDisplay.textContent = "";
            resultDisplay.classList.remove("greenText", "redText");
            gameOverlay.style.display = "none";
            const choicesButtons = document.querySelectorAll(".choices button");
            choicesButtons.forEach(button => button.disabled = false);
            document.getElementById("backButton").disabled = false;
=======
const choices = ["rock", "paper", "scissors"];
        const playerDisplay = document.getElementById("playerDisplay");
        const computerDisplay = document.getElementById("computerDisplay");
        const resultDisplay = document.getElementById("resultDisplay");
        const playerScoreDisplay = document.getElementById("playerScoreDisplay");
        const computerScoreDisplay = document.getElementById("computerScoreDisplay");
        const gameOverlay = document.getElementById("gameOverlay");
        const overlayMessage = document.getElementById("overlayMessage");
        const overlayButtons = document.getElementById("overlayButtons");
        let playerScore = 0;
        let computerScore = 0;
        let turns = 0;
        const maxTurns = 5;

        function playGame(playerChoice) {
            if (turns >= maxTurns) return;

            const computerChoice = choices[Math.floor(Math.random() * 3)];
            let result = "";

            if (playerChoice === computerChoice) {
                result = "IT'S A TIE!";
            } else {
                switch (playerChoice) {
                    case "rock":
                        result = (computerChoice === "scissors") ? "YOU WIN!" : "YOU LOSE!";
                        break;
                    case "paper":
                        result = (computerChoice === "rock") ? "YOU WIN!" : "YOU LOSE!";
                        break;
                    case "scissors":
                        result = (computerChoice === "paper") ? "YOU WIN!" : "YOU LOSE!";
                        break;
                }
            }

            playerDisplay.textContent = `PLAYER: ${playerChoice}`;
            computerDisplay.textContent = `COMPUTER: ${computerChoice}`;
            resultDisplay.textContent = result;

            resultDisplay.classList.remove("greenText", "redText");

            switch (result) {
                case "YOU WIN!":
                    resultDisplay.classList.add("greenText");
                    playerScore++;
                    playerScoreDisplay.textContent = playerScore;
                    break;
                case "YOU LOSE!":
                    resultDisplay.classList.add("redText");
                    computerScore++;
                    computerScoreDisplay.textContent = computerScore;
                    break;
            }

            turns++;
            if (turns === maxTurns) {
                showGameResult();
            }
        }

        function showGameResult() {
            gameOverlay.style.display = "flex";
            const choicesButtons = document.querySelectorAll(".choices button");
            choicesButtons.forEach(button => button.disabled = true);
            document.getElementById("backButton").disabled = true;

            if (playerScore > computerScore) {
                overlayMessage.textContent = "Congratulations! You Won!";
                overlayButtons.innerHTML = `
                    <button onclick="window.location.href='http://localhost:8080/room2'">Back to Home</button>
                `;
            } else if (playerScore < computerScore) {
                overlayMessage.textContent = "Sorry, You Lost!";
                overlayButtons.innerHTML = `
                    <button onclick="resetGame()">Play Again</button>
                    <button onclick="window.location.href='http://localhost:8080/room2'">Back to Home</button>
                `;
            } else {
                overlayMessage.textContent = "It's a Tie!";
                overlayButtons.innerHTML = `
                    <button onclick="resetGame()">Play Again</button>
                    <button onclick="window.location.href='http://localhost:8080/room2'">Back to Home</button>
                `;
            }
        }

        function resetGame() {
            playerScore = 0;
            computerScore = 0;
            turns = 0;
            playerScoreDisplay.textContent = playerScore;
            computerScoreDisplay.textContent = computerScore;
            playerDisplay.textContent = "PLAYER: ";
            computerDisplay.textContent = "COMPUTER: ";
            resultDisplay.textContent = "";
            resultDisplay.classList.remove("greenText", "redText");
            gameOverlay.style.display = "none";
            const choicesButtons = document.querySelectorAll(".choices button");
            choicesButtons.forEach(button => button.disabled = false);
            document.getElementById("backButton").disabled = false;
>>>>>>> 886eb27abef7989fbac68e72558745647b08bf05
        }