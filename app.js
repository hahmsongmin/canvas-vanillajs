const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

// context는 canvas 안에서 픽셀을 다룸
// path 선, 라인
// 클릭한 곳이 시작점, 클릭한 상태로 드래그 => 시작점부터 클릭한 곳까지 선을 만듬

let painting = false;

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
    ctx.stroke();
  }
}

// canvas 에 관련된 위치 값 offsetX, offsetY
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseout", stopPainting);
}
