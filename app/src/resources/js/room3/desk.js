let currentQuestionIndex = 0;

function loadCurrentQuestion() {
  const container = document.getElementById("question-container");
  container.innerHTML = ""; // Xóa nội dung cũ

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

  // Hiển thị lại nút gửi, ẩn nút tiếp theo
  document.getElementById("submit-button").style.display = "inline-block";
  document.getElementById("next-button").style.display = "none";
}

function checkAnswer() {
  const input = document.getElementById("answer-input");
  const userAnswer = input.value.trim().toLowerCase();
  const correctAnswer = sentenceData[currentQuestionIndex].answer.toLowerCase();
  const resultElement = document.getElementById("result");

  resultElement.classList.remove("correct", "incorrect");

  if (userAnswer === correctAnswer) {
    resultElement.textContent = "Chính xác!";
    resultElement.classList.add("correct");

    // Ẩn nút gửi, hiện nút tiếp theo hoặc quay lại nếu hết câu
    document.getElementById("submit-button").style.display = "none";
    if (currentQuestionIndex < sentenceData.length - 1) {
      document.getElementById("next-button").style.display = "inline-block";
    } else {
      const messageEl = document.getElementById("message");
      if (messageEl && messageEl.textContent.trim() !== "") {
        messageEl.style.display = "block";
      }
      setTimeout(() => {
        window.history.back();
      }, 2000);
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
