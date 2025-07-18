const puzzleContainer = document.querySelector('.puzzle-container');
        const moves = document.querySelector('.moves');
        const puzzle = document.querySelector('.puzzle');
        const backButton = document.getElementById('back-button');
        const modal = document.getElementById('win-modal');
        const moveCountSpan = document.getElementById('move-count');
        const modalOkButton = document.getElementById('modal-ok-button');
        let currentElement = "";
        let movesCount = 0;
        let imagesArr = [];

        const randomNumber = () => Math.floor(Math.random() * 8) + 1;

        const getCoords = (element) => {
            const [row, col] = element.getAttribute("data-position").split("_");
            return [parseInt(row), parseInt(col)];
        };

        const checkAdjacent = (row1, row2, col1, col2) => {
            if (row1 === row2) {
                if (col2 === col1 - 1 || col2 === col1 + 1) {
                    return true;
                }
            } else if (col1 === col2) {
                if (row2 === row1 - 1 || row2 === row1 + 1) {
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

        const generateGrid = () => {
            puzzle.innerHTML = ''; // Clear existing grid
            let count = 0;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    let div = document.createElement("div");
                    div.setAttribute("data-position", `${i}_${j}`);
                    div.addEventListener("click", selectImage);
                    div.classList.add("image-container");
                    div.innerHTML = `<img src="/room2/Slidepuzzle_images/Layer_${imagesArr[count]}.jpg" class="image ${imagesArr[count] === 3 ? "target" : ""}" data-index="${imagesArr[count]}"/>`;
                    count += 1;
                    puzzle.appendChild(div);
                }
            }
        };

        const setCustomImageOrder = (customOrder) => {
            if (customOrder.length === 9 && customOrder.every(num => num >= 1 && num <= 9 && customOrder.indexOf(num) === customOrder.lastIndexOf(num))) {
                imagesArr = [...customOrder];
                movesCount = 0;
                moves.innerText = `Moves: ${movesCount}`;
                generateGrid();
                if (imagesArr.join("") === "123456789") {
                    setTimeout(() => {
                        moveCountSpan.innerText = movesCount;
                        modal.style.display = 'flex';
                    }, 1000);
                }
            } else {
                console.error("Invalid custom order. Must be an array of 9 unique numbers from 1 to 9.");
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

                movesCount += 1;
                moves.innerText = `Moves: ${movesCount}`;

                if (imagesArr.join("") === "123456789") {
                    setTimeout(() => {
                        moveCountSpan.innerText = movesCount;
                        modal.style.display = 'flex';
                    }, 1000);
                }
            }
        };

        backButton.addEventListener("click", () => {
            window.location.href = "http://localhost:8080/room2";
        });

        modalOkButton.addEventListener("click", () => {
            window.location.href = "http://localhost:8080/room2";
        });

        window.onload = () => {
            puzzleContainer.style.display = 'flex';
            movesCount = 0;
            moves.innerText = `Bước: ${movesCount}`;
            imagesArr = [];
            randomImages();
            generateGrid();
            // For testing the win condition, you can call setCustomImageOrder with a specific order
            // Example: setCustomImageOrder([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        };
