function loadSentence() {
  const sentenceElement = document.getElementById("sentence");
  const blankInput = `<input type="text" id="answer-input">`;
  sentenceElement.innerHTML = sentenceData.sentence.replace(
    "_____",
    blankInput
  );
}

function checkAnswer() {
  const userAnswer = document
    .getElementById("answer-input")
    .value.trim()
    .toLowerCase();
  const correctAnswer = sentenceData.answer.toLowerCase();
  const resultElement = document.getElementById("result");

  resultElement.classList.remove("correct", "incorrect");

  if (userAnswer === correctAnswer) {
    resultElement.textContent = "Chính Xác!";
    resultElement.classList.add("correct");
    setTimeout(() => {
      window.history.back();
    }, 1000);
  } else {
    resultElement.textContent = "Sai Rồi! Hãy Thử Lại.";
    resultElement.classList.add("incorrect");
  }
}

document.getElementById("submit-button").addEventListener("click", checkAnswer);
window.onload = loadSentence;
