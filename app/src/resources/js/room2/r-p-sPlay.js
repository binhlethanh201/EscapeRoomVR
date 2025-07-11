const choices = ["rock", "paper", "scissors"];
const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const playerScoreDisplay = document.getElementById("playerScoreDisplay");
const computerScoreDisplay = document.getElementById("computerScoreDisplay");
const gameOverlay = document.getElementById("gameOverlay");
const overlayMessage = document.getElementById("overlayMessage");
const overlayButtons = document.getElementById("overlayButtons");
const messageContainer = document.querySelector(".message-container");
const messageButtons = document.getElementById("messageButtons");
let playerScore = 0;
let computerScore = 0;
let turns = 0;
const maxTurns = 5;

function playGame(playerChoice) {
    if (turns >= maxTurns) return;
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    let result = "";

    if (playerChoice === computerChoice) {
        result = "HÒA!";
    } else {
        switch (playerChoice) {
            case "rock":
                result = (computerChoice === "scissors") ? "BẠN THẮNG!" : "BẠN THUA!";
                break;
            case "paper":
                result = (computerChoice === "rock") ? "BẠN THẮNG!" : "BẠN THUA!";
                break;
            case "scissors":
                result = (computerChoice === "paper") ? "BẠN THẮNG!" : "BẠN THUA!";
                break;
        }
    }

    playerDisplay.textContent = `NGƯỜI CHƠI: ${playerChoice}`;
    computerDisplay.textContent = `ĐỐI THỦ: ${computerChoice}`;
    resultDisplay.textContent = result;

    resultDisplay.classList.remove("greenText", "redText");

    switch (result) {
        case "BẠN THẮNG!":
            resultDisplay.classList.add("greenText");
            playerScore++;
            playerScoreDisplay.textContent = playerScore;
            break;
        case "BẠN THUA!":
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
    const choicesButtons = document.querySelectorAll(".choices button");
    choicesButtons.forEach(button => button.disabled = true);
    document.getElementById("backButton").disabled = true;

    if (playerScore > computerScore) {
        messageContainer.style.display = "flex"; // Hiển thị message-container khi thắng
        messageButtons.innerHTML = `
            <button onclick="window.location.href='http://localhost:8080/room2'">Thoát phòng</button>
        `;
    } else {
        gameOverlay.style.display = "flex"; // Hiển thị gameOverlay khi thua hoặc hòa
        if (playerScore < computerScore) {
            overlayMessage.textContent = "BẠN ĐÃ THẤT BẠI!";
            overlayButtons.innerHTML = `
                <button onclick="resetGame()">Chơi lại!</button>
                <button onclick="window.location.href='http://localhost:8080/room2'">Quay về phòng</button>
            `;
        } else {
            overlayMessage.textContent = "BẠN ĐÃ HÒA!";
            overlayButtons.innerHTML = `
                <button onclick="resetGame()">Chơi lại</button>
                <button onclick="window.location.href='http://localhost:8080/room2'">Quay về phòng</button>
            `;
        }
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    turns = 0;
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
    playerDisplay.textContent = "NGƯỜI CHƠI: ";
    computerDisplay.textContent = "ĐỐI THỦ: ";
    resultDisplay.textContent = "";
    resultDisplay.classList.remove("greenText", "redText");
    gameOverlay.style.display = "none";
    messageContainer.style.display = "none"; // Ẩn message-container khi reset
    const choicesButtons = document.querySelectorAll(".choices button");
    choicesButtons.forEach(button => button.disabled = false);
    document.getElementById("backButton").disabled = false;
}