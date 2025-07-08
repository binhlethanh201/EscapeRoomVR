let currentQuestionIndex = 0;
let selectedOption = null;

function loadCurrentQuestion() {
  const container = document.getElementById("question-container");
  const result = document.getElementById("result");
  container.innerHTML = "";
  result.textContent = "";
  result.className = "result";

  const q = questions[currentQuestionIndex];

  const questionBlock = document.createElement("div");
  questionBlock.className = "question-block";

  const questionTitle = document.createElement("p");
  questionTitle.innerHTML = `<strong>Câu ${currentQuestionIndex + 1}:</strong> ${q.question}`;
  questionBlock.appendChild(questionTitle);

  q.options.forEach((opt) => {
    const label = document.createElement("label");
    label.classList.add("option-label");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "option";
    radio.value = opt;

    radio.addEventListener("change", () => {
      selectedOption = opt;
    });

    label.appendChild(radio);
    label.appendChild(document.createTextNode(" " + opt));
    questionBlock.appendChild(label);
    questionBlock.appendChild(document.createElement("br"));
  });
  container.appendChild(questionBlock);
  document.getElementById("submit-button").style.display = "inline-block";
  document.getElementById("next-button").style.display = "none";
}

function checkAnswer() {
  const result = document.getElementById("result");
  result.classList.remove("correct", "wrong");

  if (!selectedOption) {
    result.textContent = "Vui lòng chọn một đáp án.";
    result.classList.add("wrong");
    return;
  }
  const correctAnswer = questions[currentQuestionIndex].answer;
  if (selectedOption === correctAnswer) {
    result.textContent = "Chính xác!";
    result.classList.add("correct");
    document.getElementById("submit-button").style.display = "none";

    if (currentQuestionIndex < questions.length - 1) {
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
    result.textContent = "Sai rồi! Hãy thử lại";
    result.classList.add("wrong");
  }
}



function nextQuestion() {
  currentQuestionIndex++;
  selectedOption = null;
  loadCurrentQuestion();
}

document.getElementById("submit-button").addEventListener("click", checkAnswer);
document.getElementById("next-button").addEventListener("click", nextQuestion);
window.onload = loadCurrentQuestion;
