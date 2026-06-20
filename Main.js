const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let width, height;
function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight - document.getElementById("ui").offsetHeight;
  canvas.width = width;
  canvas.height = height;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Map settings
const gridSize = 50;

// Cannon position on map
const cannon = { x: 100, y: height - 100 };

// Target
let target = { x: 0, y: 0 };

// Shell types (fictional)
const shellStats = {
  light: { gravity: 6 },
  medium: { gravity: 9 },
  heavy: { gravity: 12 }
};

// UI
const angleInput = document.getElementById("angleInput");
const powerInput = document.getElementById("powerInput");
const shellType = document.getElementById("shellType");
const fireBtn = document.getElementById("fireBtn");
const newMissionBtn = document.getElementById("newMissionBtn");
const missionCoords = document.getElementById("missionCoords");

let projectiles = [];

function newMission() {
  target.x = Math.random() * (width - 200) + 150;
  target.y = Math.random() * (height - 200) + 100;

  missionCoords.textContent = `(${Math.floor(target.x)}, ${Math.floor(target.y)})`;
}
newMission();

newMissionBtn.onclick = newMission;

fireBtn.onclick = () => {
  const angle = parseFloat(angleInput.value);
  const power = parseFloat(powerInput.value);
  const shell = shellType.value;

  const rad = (angle * Math.PI) / 180;

  projectiles.push({
    x: cannon.x,
    y: cannon.y,
    vx: Math.cos(rad) * power,
    vy: -Math.sin(rad) * power,
    gravity: shellStats[shell].gravity,
    t: 0
  });
};

function update(dt) {
  projectiles.forEach(p => {
    p.t += dt;
    p.x += p.vx;
    p.y += p.vy + p.gravity * p.t;
  });

  projectiles = projectiles.filter(p => p.x < width && p.y < height);
}

function drawGrid() {
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 1;

  for (let x = 0; x < width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = 0; y < height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function drawCannon() {
  ctx.fillStyle = "#4caf50";
  ctx.beginPath();
  ctx.arc(cannon.x, cannon.y, 12, 0, Math.PI * 2);
  ctx.fill();
}

function drawTarget() {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(target.x, target.y, 10, 0, Math.PI * 2);
  ctx.fill();
}

function drawProjectiles() {
  ctx.fillStyle = "yellow";
  projectiles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
}

let last = 0;
function loop(ts) {
  const dt = (ts - last) / 1000;
  last = ts;

  ctx.clearRect(0, 0, width, height);

  drawGrid();
  drawCannon();
  drawTarget();
  update(dt);
  drawProjectiles();

  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
  update(dt);
  drawMap();
  drawCannon();
  drawTarget();
  drawProjectiles();

  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);let lastTime = 0;
function loop(timestamp) {
  const dt = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  ctx.clearRect(0, 0, width, height);

  update(dt);
  drawGround();
  drawCannon();
  drawProjectiles();

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
