let code = [];
function addNumber(num) {
    if (code.length < 4) {
        code.push(num);
        updateDisplay();
    }
}

function backspace() {
    code.pop();
    updateDisplay();
}

function clearCode() {
    code = [];
    updateDisplay();
    document.getElementById('message').textContent = '';
}

function updateDisplay() {
    const display = document.getElementById('display');
    let displayText = '';
    for (let i = 0; i < 4; i++) {
        displayText += code[i] !== undefined ? code[i] : '_';
    }
    display.textContent = displayText;
}

function checkCode() {
    const message = document.getElementById('message');
    if (code.length === 4) {
        const isCorrect = code.every((num, index) => num === correctCode[index]);
        if (isCorrect) {
            message.textContent = 'Mật khẩu đúng! Đang mở khóa...';
            fetch("http://localhost:3000/room1/complete", {
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
            code = [];
            updateDisplay();
        }
    } else {
        message.textContent = "Hãy nhập đủ 4 chữ số để mở khóa.";
    }
}
