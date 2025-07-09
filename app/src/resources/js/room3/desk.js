let currentQuestionIndex = 0;

function normalize(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}


function loadCurrentQuestion() {
  const container = document.getElementById("question-container");
  container.innerHTML = "";

  const item = sentenceData[currentQuestionIndex];
  const questionBlock = document.createElement("div");
  questionBlock.className = "question-block";
  questionBlock.innerHTML = `
    <p><strong>Câu ${currentQuestionIndex + 1}:</strong> ${item.sentence.replace(
    "_____",
    `<input type="text" class="answer-input" id="answer-input">`
  )}</p>
    <p class="hint">Gợi ý: ${item.hint}</p>
    <div id="result" class="result"></div>
  `;
  container.appendChild(questionBlock);
  document.getElementById("submit-button").style.display = "inline-block";
  document.getElementById("next-button").style.display = "none";
}

function checkAnswer() {
  const input = document.getElementById("answer-input");
  const userAnswer = normalize(input.value);
  const correctAnswer = normalize(sentenceData[currentQuestionIndex].answer);
  const resultElement = document.getElementById("result");

  resultElement.classList.remove("correct", "incorrect");

  if (userAnswer === correctAnswer) {
    resultElement.textContent = "Chính xác!";
    resultElement.classList.add("correct");
    document.getElementById("submit-button").style.display = "none";
    if (currentQuestionIndex < sentenceData.length - 1) {
      document.getElementById("next-button").style.display = "inline-block";
    } else {
      const popup = document.getElementById("popup-message");
      popup.style.display = "flex";
      const popupClose = document.getElementById("popup-close");
      popupClose.onclick = () => {
        popup.style.display = "none";
        window.location.href = "http://localhost:8080/room3";
      };
      setTimeout(() => {
        window.location.href = "http://localhost:8080/room3";
      }, 3000);
    }
  } else {
    resultElement.textContent = "Sai rồi! Hãy thử lại.";
    resultElement.classList.add("incorrect");
  }
}


function goToNextQuestion() {
  currentQuestionIndex++;
  loadCurrentQuestion();
}

document.getElementById("submit-button").addEventListener("click", checkAnswer);
document.getElementById("next-button").addEventListener("click", goToNextQuestion);
window.onload = loadCurrentQuestion;
