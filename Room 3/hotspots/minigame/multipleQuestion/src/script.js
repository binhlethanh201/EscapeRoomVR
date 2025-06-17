const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Jupiter"
    }
];
let currentQuestionIndex = 0;
let selectedOption = null;




// Load current question
function loadQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const submitButton = document.getElementById('submit-button');
    const nextButton = document.getElementById('next-button');
    const resultElement = document.getElementById('result');

    questionElement.textContent = questions[currentQuestionIndex].question;
    optionsElement.innerHTML = '';
    resultElement.textContent = ''; // clear previous result
    selectedOption = null;

    questions[currentQuestionIndex].options.forEach(option => {
        const label = document.createElement('label');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'option';
        radio.value = option;
        radio.addEventListener('change', () => {
            selectedOption = option;
        });
        label.appendChild(radio);
        label.appendChild(document.createTextNode(option));
        optionsElement.appendChild(label);
        optionsElement.appendChild(document.createElement('br'));
    });

    submitButton.style.display = 'block';
    nextButton.style.display = 'none';
}

// Handle submit
document.getElementById('submit-button').addEventListener('click', () => {
    const resultElement = document.getElementById('result');
    resultElement.className = '';

    if (!selectedOption) {
        resultElement.textContent = "Please select an option before submitting.";
        resultElement.classList.add('wrong');
        return;
    }

    const correctAnswer = questions[currentQuestionIndex].answer;

    if (selectedOption === correctAnswer) {
        resultElement.textContent = "Correct!";
        resultElement.classList.add('correct');
        document.getElementById('submit-button').style.display = 'none';
        document.getElementById('next-button').style.display = 'block';
    } else {
        resultElement.textContent = "Wrong! Try again.";
        resultElement.classList.add('wrong');
        // Không cho chọn câu tiếp theo
    }
});


// Handle next question
document.getElementById('next-button').addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        alert("Quiz completed!");
        currentQuestionIndex = 0; // Restart the quiz
        loadQuestion();
    }
});

// Initial load
loadQuestion();
