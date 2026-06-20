const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const angleSlider = document.getElementById("angle");
const powerSlider = document.getElementById("power");
const angleValue = document.getElementById("angleValue");
const powerValue = document.getElementById("powerValue");
const fireBtn = document.getElementById("fireBtn");

let width, height;
let projectiles = [];

const gravity = 9.8; // simple gravity

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight - document.getElementById("ui").offsetHeight;
  canvas.width = width;
  canvas.height = height;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Cannon position (bottom-left)
const cannon = {
  x: 80,
  y: height - 40
};

angleSlider.addEventListener("input", () => {
  angleValue.textContent = angleSlider.value + "°";
});

powerSlider.addEventListener("input", () => {
  powerValue.textContent = powerSlider.value;
});

fireBtn.addEventListener("click", () => {
  fireProjectile();
});

function fireProjectile() {
  const angleDeg = parseFloat(angleSlider.value);
  const power = parseFloat(powerSlider.value);

  const angleRad = (angleDeg * Math.PI) / 180;

  const speed = power; // simple mapping
  const vx = Math.cos(angleRad) * speed;
  const vy = -Math.sin(angleRad) * speed; // negative because canvas y grows downward

  projectiles.push({
    x: cannon.x,
    y: cannon.y,
    vx,
    vy,
    t: 0
  });
}

function update(dt) {
  // Update projectiles
  projectiles.forEach(p => {
    p.t += dt;
    p.x += p.vx;
    p.y += p.vy + gravity * p.t; // crude gravity effect
  });

  // Remove projectiles that leave screen
  projectiles = projectiles.filter(p => p.x >= 0 && p.x <= width && p.y <= height);
}

function drawCannon() {
  ctx.save();
  ctx.translate(cannon.x, cannon.y);

  const angleDeg = parseFloat(angleSlider.value);
  const angleRad = (-angleDeg * Math.PI) / 180;

  ctx.rotate(angleRad);

  ctx.fillStyle = "#ccc";
  ctx.fillRect(0, -8, 60, 16); // barrel

  ctx.restore();

  // base
  ctx.fillStyle = "#888";
  ctx.fillRect(cannon.x - 20, cannon.y, 40, 10);
}

function drawProjectiles() {
  ctx.fillStyle = "#ffeb3b";
  projectiles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawGround() {
  ctx.fillStyle = "#333";
  ctx.fillRect(0, height - 30, width, 30);
}

let lastTime = 0;
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
