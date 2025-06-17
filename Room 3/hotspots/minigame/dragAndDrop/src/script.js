const imagePool = document.getElementById("imagePool");
const dropZones = document.querySelectorAll(".dropZone.border"); 
const submitBtn = document.getElementById("submitBtn");
const result = document.getElementById("result");

let draggedImgId = null;
// Gán dragstart cho tất cả ảnh hiện tại (cả trong pool và drop zones)
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
  
//event drop
  zone.addEventListener("drop", (e) => {
    e.preventDefault();
    const imgId = e.dataTransfer.getData("text/plain");
    if (!imgId) return;
    const img = document.getElementById(imgId);
    if (!img) return;

    if (zone !== imagePool) {
      const oldImg = zone.querySelector('img');
      if (oldImg) oldImg.remove();
    }
    zone.appendChild(img);
    // Gán lại dragstart cho ảnh (vì img vừa chuyển vùng)
    addDragStartListeners();
  });
});

// submit button
submitBtn.addEventListener("click", () => {
  let correct = 0;
  dropZones.forEach(zone => {
    const expectedId = zone.dataset.accept;
    const droppedImg = zone.querySelector('img');
    if (droppedImg && droppedImg.id === expectedId) {
      correct++;
    }
  });

  if (correct === dropZones.length) {
    result.textContent = "Passed!";
    result.style.color = "green";
  } else {
    result.textContent = "Incorrect! Resetting...";
    result.style.color = "red";

    setTimeout(() => {
      dropZones.forEach((zone) => {
        const img = zone.querySelector("img");
        if (img) {
          imagePool.appendChild(img);
        }
      });
      result.textContent = "";
    }, 1500);
  }
});

// reset button
const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", () => {
  //Di chuyển lại imagePool
  dropZones.forEach(zone => {
    const img = zone.querySelector("img");
    if (img) {
      imagePool.appendChild(img);
    }
    zone.innerHTML = ""; // Reset drop zone text
  });

  result.textContent = ""; //message clear
});

