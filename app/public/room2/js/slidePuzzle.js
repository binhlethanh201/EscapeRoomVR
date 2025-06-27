<<<<<<< HEAD
//Initial References
      const moves = document.getElementById("moves");
      const container = document.querySelector(".container");
      const backButton = document.getElementById("back-button");
      let currentElement = "";
      let movesCount,
        imagesArr = [];

      const isTouchDevice = () => {
        try {
          document.createEvent("TouchEvent");
          return true;
        } catch (e) {
          return false;
        }
      };

      const randomNumber = () => Math.floor(Math.random() * 8) + 1;

      const getCoords = (element) => {
        const [row, col] = element.getAttribute("data-position").split("_");
        return [parseInt(row), parseInt(col)];
      };

      const checkAdjacent = (row1, row2, col1, col2) => {
        if (row1 == row2) {
          if (col2 == col1 - 1 || col2 == col1 + 1) {
            return true;
          }
        } else if (col1 == col2) {
          if (row2 == row1 - 1 || row2 == row1 + 1) {
            return true;
          }
        }
        return false;
      };

      const randomImages = () => {
        while (imagesArr.length < 8) {
          let randomVal = randomNumber();
          if (!imagesArr.includes(randomVal)) {
            imagesArr.push(randomVal);
          }
        }
        imagesArr.push(9);
      };

      const gridGenerator = () => {
        let count = 0;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            let div = document.createElement("div");
            div.setAttribute("data-position", `${i}_${j}`);
            div.addEventListener("click", selectImage);
            div.classList.add("image-container");
            div.innerHTML = `<img src="/room2/Slidepuzzle_images/Layer_${imagesArr[count]}.jpg" class="image ${imagesArr[count] == 3 ? "target" : ""}" data-index="${imagesArr[count]}" />`;
            count += 1;
            container.appendChild(div);
          }
        }
      };

      const selectImage = (e) => {
        e.preventDefault();
        currentElement = e.target;
        let targetElement = document.querySelector(".target");
        let currentParent = currentElement.parentElement;
        let targetParent = targetElement.parentElement;

        const [row1, col1] = getCoords(currentParent);
        const [row2, col2] = getCoords(targetParent);

        if (checkAdjacent(row1, row2, col1, col2)) {
          currentElement.remove();
          targetElement.remove();
          let currentIndex = parseInt(currentElement.getAttribute("data-index"));
          let targetIndex = parseInt(targetElement.getAttribute("data-index"));
          currentElement.setAttribute("data-index", targetIndex);
          targetElement.setAttribute("data-index", currentIndex);
          currentParent.appendChild(targetElement);
          targetParent.appendChild(currentElement);
          let currentArrIndex = imagesArr.indexOf(currentIndex);
          let targetArrIndex = imagesArr.indexOf(targetIndex);
          [imagesArr[currentArrIndex], imagesArr[targetArrIndex]] = [
            imagesArr[targetArrIndex],
            imagesArr[currentArrIndex],
          ];

          if (imagesArr.join("") == "123456789") {
            setTimeout(() => {
              container.classList.add("hide");
              moves.innerText = `Total Moves: ${movesCount}`;
            }, 1000);
          }
          movesCount += 1;
          moves.innerText = `Moves: ${movesCount}`;
        }
      };

      // Back button click to redirect
      backButton.addEventListener("click", () => {
        window.location.href = "http://localhost:8080/room2";
      });

      // Initialize game on load
      window.onload = () => {
        container.classList.remove("hide");
        container.innerHTML = "";
        imagesArr = [];
        randomImages();
        gridGenerator();
        movesCount = 0;
        moves.innerText = `Moves: ${movesCount}`;
=======
//Initial References
      const moves = document.getElementById("moves");
      const container = document.querySelector(".container");
      const backButton = document.getElementById("back-button");
      let currentElement = "";
      let movesCount,
        imagesArr = [];

      const isTouchDevice = () => {
        try {
          document.createEvent("TouchEvent");
          return true;
        } catch (e) {
          return false;
        }
      };

      const randomNumber = () => Math.floor(Math.random() * 8) + 1;

      const getCoords = (element) => {
        const [row, col] = element.getAttribute("data-position").split("_");
        return [parseInt(row), parseInt(col)];
      };

      const checkAdjacent = (row1, row2, col1, col2) => {
        if (row1 == row2) {
          if (col2 == col1 - 1 || col2 == col1 + 1) {
            return true;
          }
        } else if (col1 == col2) {
          if (row2 == row1 - 1 || row2 == row1 + 1) {
            return true;
          }
        }
        return false;
      };

      const randomImages = () => {
        while (imagesArr.length < 8) {
          let randomVal = randomNumber();
          if (!imagesArr.includes(randomVal)) {
            imagesArr.push(randomVal);
          }
        }
        imagesArr.push(9);
      };

      const gridGenerator = () => {
        let count = 0;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            let div = document.createElement("div");
            div.setAttribute("data-position", `${i}_${j}`);
            div.addEventListener("click", selectImage);
            div.classList.add("image-container");
            div.innerHTML = `<img src="/room2/Slidepuzzle_images/Layer_${imagesArr[count]}.jpg" class="image ${imagesArr[count] == 3 ? "target" : ""}" data-index="${imagesArr[count]}" />`;
            count += 1;
            container.appendChild(div);
          }
        }
      };

      const selectImage = (e) => {
        e.preventDefault();
        currentElement = e.target;
        let targetElement = document.querySelector(".target");
        let currentParent = currentElement.parentElement;
        let targetParent = targetElement.parentElement;

        const [row1, col1] = getCoords(currentParent);
        const [row2, col2] = getCoords(targetParent);

        if (checkAdjacent(row1, row2, col1, col2)) {
          currentElement.remove();
          targetElement.remove();
          let currentIndex = parseInt(currentElement.getAttribute("data-index"));
          let targetIndex = parseInt(targetElement.getAttribute("data-index"));
          currentElement.setAttribute("data-index", targetIndex);
          targetElement.setAttribute("data-index", currentIndex);
          currentParent.appendChild(targetElement);
          targetParent.appendChild(currentElement);
          let currentArrIndex = imagesArr.indexOf(currentIndex);
          let targetArrIndex = imagesArr.indexOf(targetIndex);
          [imagesArr[currentArrIndex], imagesArr[targetArrIndex]] = [
            imagesArr[targetArrIndex],
            imagesArr[currentArrIndex],
          ];

          if (imagesArr.join("") == "123456789") {
            setTimeout(() => {
              container.classList.add("hide");
              moves.innerText = `Total Moves: ${movesCount}`;
            }, 1000);
          }
          movesCount += 1;
          moves.innerText = `Moves: ${movesCount}`;
        }
      };

      // Back button click to redirect
      backButton.addEventListener("click", () => {
        window.location.href = "http://localhost:8080/room2";
      });

      // Initialize game on load
      window.onload = () => {
        container.classList.remove("hide");
        container.innerHTML = "";
        imagesArr = [];
        randomImages();
        gridGenerator();
        movesCount = 0;
        moves.innerText = `Moves: ${movesCount}`;
>>>>>>> 886eb27abef7989fbac68e72558745647b08bf05
      };