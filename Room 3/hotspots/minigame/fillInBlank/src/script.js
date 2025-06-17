const sentenceData = {
    sentence: "The capital of France is _____.",
    answer: "Paris"
};


function loadSentence() {
    const sentenceElement = document.getElementById('sentence');
    const blankInput = `<input type="text" id="answer-input" >`;
    sentenceElement.innerHTML = sentenceData.sentence.replace("_____", blankInput);
}

function checkAnswer() {
    const userAnswer = document.getElementById('answer-input').value.trim();
    const resultElement = document.getElementById('result');

    // Reset class
    resultElement.classList.remove('correct', 'incorrect');

    if (userAnswer.toLowerCase() === sentenceData.answer.toLowerCase()) {
        resultElement.textContent = "Correct!";
        resultElement.classList.add('correct');
    } else {
        resultElement.textContent = `Wrong! Try Again.`;
        resultElement.classList.add('incorrect');
    }
}


document.getElementById('submit-button').addEventListener('click', checkAnswer);

// Load the sentence when the page loads
loadSentence();
