const container = document.querySelector("#container");
const resetButton = document.querySelector("#reset-button");
const userInput = document.querySelector("#square-per-side");
const inputDisplay = document.querySelector("label");
const pencilBtn = document.querySelector("#pencil-btn");
const shadeBtn = document.querySelector("#shade-btn");
const rainbowBtn = document.querySelector("#rainbow-btn");


const containerSize = 450;
let squaresPerSide = 16;
container.style.width = container.style.height = `${containerSize}px`;
let currentMode = "pencil";

function setToShade() {
  (currentMode = "shade");
}

function setToRainbow() {
  (currentMode = "rainbow");
}

function setToPencil() {
  (currentMode = "pencil");
}

function toShade(e) {
  let incrementedNumber = parseInt(e.target.dataset.number);
  incrementedNumber++;
  e.target.dataset.number = incrementedNumber;
  let step = 40;

  let computedValue = 228 - incrementedNumber * step;
  let colorValue = Math.max(0, computedValue);
  e.target.style.backgroundColor = `rgba(${colorValue}, ${colorValue}, ${colorValue}, 0.738)`;
}

function toPencil(e) {
  e.target.style.backgroundColor = "rgb(0, 0, 0)";
}

function toRainbow(e) {
  let randomRed = Math.floor(Math.random() * 255) + 1;
  let randomGreen = Math.floor(Math.random() * 255) + 1;
  let randomBlue = Math.floor(Math.random() * 255) + 1;
  e.target.style.backgroundColor = `rgba(${randomRed}, ${randomGreen}, ${randomBlue}, 0.738)`;
}

function handleHover(e){
  if(currentMode === "pencil"){
    return toPencil(e);
  }
  else if(currentMode === "shade"){
    return toShade(e);
  }
  else if(currentMode === "rainbow"){
    return toRainbow(e);
  }
}

function createDivs(squaresPerSide) {
  const squaresNum = squaresPerSide ** 2;
  const cellSize = `${containerSize / squaresPerSide - 2}px`;

  for (let i = 0; i < squaresNum; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cells");
    cell.style.width = cell.style.height = cellSize;
    container.appendChild(cell);
    cell.dataset.number = "0";

    cell.addEventListener("mouseenter", handleHover)

  }
}
function resetDivs() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  createDivs(squaresPerSide);
}

userInput.addEventListener("input", function (e) {
  squaresPerSide = parseInt(e.target.value);
  inputDisplay.innerText = `Resolution: ${squaresPerSide} x ${squaresPerSide}`;
  resetDivs();
});

createDivs(squaresPerSide);
resetButton.addEventListener("click", resetDivs);
pencilBtn.addEventListener("click", setToPencil);
shadeBtn.addEventListener("click", setToShade);
rainbowBtn.addEventListener("click", setToRainbow)


