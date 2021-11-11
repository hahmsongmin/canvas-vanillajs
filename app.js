const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

// Canvas는 픽셀을 다룸
// context는 canvas 안에서 픽셀을 다룸
// path 선, 라인
// 클릭한 곳이 시작점, 클릭한 상태로 드래그 => 시작점부터 클릭한 곳까지 선을 만듬

let painting = false;
let filling = false;

const stopPainting = () => {
  painting = false;
};

const startPainting = () => {
  painting = true;
};

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    console.log("Not Painting");
    // 선의 시작점을 만듬
    ctx.beginPath(); // 클릭하지 않은 상태에서 떠 다님(path를 만들겠다는 것)
    ctx.moveTo(x, y);
  } else {
    // 클릭을 하면, 시작점부터 클릭한 곳까지 선을 만든다.
    ctx.lineTo(x, y); // 현재 sub-path의 마지막 점을 특정 좌표와 직선으로 연결한다.
    ctx.stroke(); // 현재 stroke style로 현재의 sub-path에 획을 그음
  }
}

function handleClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

// canvas 에 관련된 위치 값 offsetX, offsetY
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseout", stopPainting);
  canvas.addEventListener("click", handleClick);
  // ⭐️ 마우스 우클릭 방지
  canvas.addEventListener("contextmenu", handleCM);
}

function handleColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color; // override
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const lineWitdh = event.target.value;
  ctx.lineWidth = lineWitdh;
}

function handleModeClick() {
  if (filling) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

// canvas image 가져옴 ( a 링크에 download 있음 )
function handleSaveClick() {
  const image = canvas.toDataURL("image/png"); // base 64
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click();
}

Array.from(colors).forEach((color) => color.addEventListener("click", handleColor));

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
