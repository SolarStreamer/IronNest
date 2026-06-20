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

// Cannon position (bottom-left)
const cannon = { x: 80, y: height - 80 };

// Mission target
let target = { x: 0, y: 0 };

// Shell types (fictional, game-safe)
const shellStats = {
  light: { gravity: 7 },
  medium: { gravity: 9 },
  heavy: { gravity: 12 }
};

// UI elements
const angleInput = document.getElementById("angleInput");
const powerInput = document.getElementById("powerInput");
const shellType = document.getElementById("shellType");
const fireBtn = document.getElementById("fireBtn");
const newMissionBtn = document.getElementById("newMissionBtn");
const missionCoords = document.getElementById("missionCoords");

let projectiles = [];

function newMission() {
  target.x = Math.random() * (width - 200) + 200;
  target.y = Math.random() * (height - 200) + 50;

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

function drawMap() {
  ctx.fillStyle = "#333";
  ctx.fillRect(0, height - 40, width, 40);
}

function drawCannon() {
  ctx.fillStyle = "#ccc";
  ctx.fillRect(cannon.x - 20, cannon.y, 40, 20);
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
