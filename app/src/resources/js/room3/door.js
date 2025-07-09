function normalize(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function checkTextInput() {
  const inputs = document.querySelectorAll(".answer-input");
  const userAnswers = Array.from(inputs).map(input => normalize(input.value));
  const normalizedCorrect = correctAnswers.map(ans => normalize(ans));
  const message = document.getElementById("message");

  const allCorrect = normalizedCorrect.every(ans =>
    userAnswers.includes(ans)
  );

  if (allCorrect && userAnswers.length === 3) {
    message.textContent = "Mật khẩu đúng!";
    fetch("http://localhost:3000/room3/complete", {
      method: "POST",
      credentials: "include",
    });
    const popup = document.getElementById("complete-popup");
    popup.style.display = "flex";
    popup.classList.add("show");
    setTimeout(() => {
      window.location.href = "http://localhost:8080";
    }, 5000);
  } else {
    message.textContent = "Sai mật khẩu. Hãy thử lại.";
  }
}

function closePopup() {
  document.getElementById("complete-popup").style.display = "none";
}
