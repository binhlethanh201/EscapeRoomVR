let currentQuestionIndex = 0;
let selectedOption = null;

function loadQuestion() {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const resultElement = document.getElementById("result");
  const submitButton = document.getElementById("submit-button");

  const current = questions[currentQuestionIndex];
  questionElement.textContent = current.question;
  optionsElement.innerHTML = "";
  resultElement.textContent = "";
  resultElement.className = "";
  selectedOption = null;

  current.options.forEach((option) => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "option";
    radio.value = option;
    radio.addEventListener("change", () => {
      selectedOption = option;
    });
    label.appendChild(radio);
    label.appendChild(document.createTextNode(option));
    optionsElement.appendChild(label);
    optionsElement.appendChild(document.createElement("br"));
  });

  submitButton.style.display = "block";
}

document.getElementById("submit-button").addEventListener("click", () => {
  const resultElement = document.getElementById("result");
  resultElement.className = "";

  if (!selectedOption) {
    resultElement.textContent = "Vui lòng chọn một lựa chọn trước khi gửi.";
    resultElement.classList.add("wrong");
    return;
  }

  const correctAnswer = questions[currentQuestionIndex].answer;

  if (selectedOption === correctAnswer) {
    resultElement.textContent = "Chính Xác!";
    resultElement.classList.add("correct");

    setTimeout(() => {
      window.history.back();
    }, 1000);
  } else {
    resultElement.textContent = "Sai Rồi! Hãy Thử Lại.";
    resultElement.classList.add("wrong");
  }
});

window.onload = loadQuestion;
