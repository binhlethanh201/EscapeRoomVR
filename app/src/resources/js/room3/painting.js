const imagePool = document.getElementById("imagePool");
const dropZones = document.querySelectorAll(".dropZone.border");
const submitBtn = document.getElementById("submitBtn");
const result = document.getElementById("result");

let draggedImgId = null;
function addDragStartListeners() {
  document.querySelectorAll(".draggable-img").forEach((img) => {
    img.addEventListener("dragstart", (e) => {
      draggedImgId = img.id;
      e.dataTransfer.setData("text/plain", draggedImgId);
    });
  });
}

addDragStartListeners();
[...dropZones, imagePool].forEach((zone) => {
  zone.addEventListener("dragover", (e) => e.preventDefault());
  zone.addEventListener("drop", (e) => {
    e.preventDefault();
    const imgId = e.dataTransfer.getData("text/plain");
    if (!imgId) return;
    const img = document.getElementById(imgId);
    if (!img) return;

    if (zone !== imagePool) {
      const oldImg = zone.querySelector("img");
      if (oldImg) oldImg.remove();
    }
    zone.appendChild(img);
    addDragStartListeners();
  });
});

submitBtn.addEventListener("click", () => {
  let correct = 0;
  dropZones.forEach((zone) => {
    const expectedId = zone.dataset.accept;
    const droppedImg = zone.querySelector("img");
    if (droppedImg && droppedImg.id === expectedId) {
      correct++;
    }
  });

  if (correct === dropZones.length) {
    result.textContent = "Chính Xác!";
    result.style.color = "green";
    const popup = document.getElementById("popup-message");
    const popupText = document.getElementById("popup-text");
    if (popup && popupText && popupText.textContent.trim() !== "") {
      popup.style.display = "flex";
    }
    const popupClose = document.getElementById("popup-close");
    if (popupClose) {
      popupClose.addEventListener("click", () => {
        popup.style.display = "none";
        window.location.href = "http://localhost:8080/room3";
      });
    }

    setTimeout(() => {
      window.location.href = "http://localhost:8080/room3";
    }, 3000);
  } else {
    result.textContent = "Sai Rồi! Hãy Thử Lại.";
    result.style.color = "red";

    setTimeout(() => {
      dropZones.forEach((zone) => {
        const img = zone.querySelector("img");
        if (img) {
          imagePool.appendChild(img);
        }
      });
      result.textContent = "";
    }, 2000);
  }
});

const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", () => {
  dropZones.forEach((zone) => {
    const img = zone.querySelector("img");
    if (img) {
      imagePool.appendChild(img);
    }
    zone.innerHTML = "";
  });

  result.textContent = "";
});
