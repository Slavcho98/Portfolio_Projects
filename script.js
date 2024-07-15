const images = document.querySelectorAll("img");
const leftBtn = document.querySelector("#left-btn");
const rightBtn = document.querySelector("#right-btn");

let positionOfImage = 0;

function showImage(selectedIndex) {
  images.forEach((image, index) => {
    if (index === selectedIndex) {
      image.style.display = "block";
    } else {
      image.style.display = "none";
    }
  });
}

function updateButtons() {
  leftBtn.disabled = positionOfImage === 0;
  rightBtn.disabled = positionOfImage === images.length - 1;

  toggleOpacity(leftBtn, leftBtn.disabled);
  toggleOpacity(rightBtn, rightBtn.disabled);

  leftBtn.style.cursor = leftBtn.disabled ? "auto" : "pointer";
  rightBtn.style.cursor = rightBtn.disabled ? "auto" : "pointer";
}

function toggleOpacity(btn, disabled) {
  if (disabled) {
    btn.classList.add("opacity");
    
  } else {
    btn.classList.remove("opacity");
    
  }
}

function moveRight() {
  if (positionOfImage < images.length - 1) {
    positionOfImage++;
    showImage(positionOfImage);
    updateButtons();
  }
}

function moveLeft() {
  if (positionOfImage > 0) {
    positionOfImage--;
    showImage(positionOfImage);
    updateButtons();
  }
}

function handleKeyDown(event) {
  if (event.key === "ArrowRight") {
    moveRight();
  } else if (event.key === "ArrowLeft") {
    moveLeft();
  }
}

function handleLeftButtonClick() {
  moveLeft();
}

function handleRightButtonClick() {
  moveRight();
}

leftBtn.addEventListener("click", handleLeftButtonClick);
rightBtn.addEventListener("click", handleRightButtonClick);
document.addEventListener("keydown", handleKeyDown);

showImage(positionOfImage);
updateButtons();
