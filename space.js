const canvas = document.getElementById('space-canvas');
const ctx = canvas.getContext('2d');

let width = 0;
let height = 0;
let dpr = 1;
let tick = 0;
const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

const palette = {
  cyan: '#73f3da',
  gold: '#f3c25b',
  coral: '#ff7d68',
  violet: '#bda3ff',
  green: '#9be36f',
  blue: '#5fb5ff',
  cream: '#f7f2e8'
};

function mulberry32(seed) {
  return function random() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

const random = mulberry32(861312);

function range(min, max) {
  return min + random() * (max - min);
}

function pick(items) {
  return items[Math.floor(random() * items.length)];
}

const stars = Array.from({ length: 360 }, () => ({
  x: random(),
  y: random(),
  radius: range(0.45, 1.9),
  alpha: range(0.24, 0.96),
  depth: range(0.05, 0.8),
  hue: pick([palette.cream, palette.cyan, palette.gold, palette.violet, '#9fc9ff']),
  pulse: range(0.001, 0.006)
}));

const dust = Array.from({ length: 92 }, () => ({
  x: random(),
  y: random(),
  radius: range(8, 34),
  alpha: range(0.018, 0.055),
  depth: range(0.1, 0.45),
  color: pick([palette.cyan, palette.coral, palette.violet, palette.green])
}));

const asteroids = Array.from({ length: 52 }, () => {
  const sides = Math.floor(range(6, 10));
  return {
    x: random(),
    y: random(),
    radius: range(4, 16),
    depth: range(0.45, 1.25),
    rotation: range(0, Math.PI * 2),
    speed: range(-0.002, 0.002),
    sides,
    bumps: Array.from({ length: sides }, () => range(0.64, 1.22))
  };
});

const planets = [
  {
    x: 0.13,
    y: 0.2,
    radius: 62,
    depth: 0.16,
    color: palette.blue,
    shade: '#17324d',
    glow: 'rgba(95, 181, 255, 0.18)',
    rings: false
  },
  {
    x: 0.84,
    y: 0.26,
    radius: 92,
    depth: 0.24,
    color: palette.coral,
    shade: '#501d24',
    glow: 'rgba(255, 125, 104, 0.22)',
    rings: true
  },
  {
    x: 0.68,
    y: 0.72,
    radius: 38,
    depth: 0.58,
    color: palette.green,
    shade: '#17341f',
    glow: 'rgba(155, 227, 111, 0.16)',
    rings: false
  }
];

const suns = [
  {
    x: 0.72,
    y: 0.08,
    radius: 120,
    depth: 0.08,
    core: palette.gold,
    glow: 'rgba(243, 194, 91, 0.34)'
  },
  {
    x: 0.07,
    y: 0.78,
    radius: 70,
    depth: 0.4,
    core: palette.violet,
    glow: 'rgba(189, 163, 255, 0.22)'
  }
];

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function wrap(value, max) {
  return ((value % max) + max) % max;
}

function layerOffset(depth) {
  const scroll = window.scrollY || 0;
  return {
    x: pointer.x * depth * 44,
    y: pointer.y * depth * 30 - scroll * depth * 0.08
  };
}

function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#07080d');
  gradient.addColorStop(0.48, '#0d1120');
  gradient.addColorStop(1, '#06070c');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function drawSun(sun) {
  const offset = layerOffset(sun.depth);
  const x = sun.x * width + offset.x;
  const y = sun.y * height + offset.y;
  const glow = ctx.createRadialGradient(x, y, sun.radius * 0.05, x, y, sun.radius * 2.4);
  glow.addColorStop(0, sun.core);
  glow.addColorStop(0.18, sun.glow);
  glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(x, y, sun.radius * 2.4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = sun.core;
  ctx.globalAlpha = 0.76;
  ctx.beginPath();
  ctx.arc(x, y, sun.radius * 0.22, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
}

function drawDust() {
  for (const mote of dust) {
    const offset = layerOffset(mote.depth);
    const x = wrap(mote.x * width + offset.x, width + 80) - 40;
    const y = wrap(mote.y * height + offset.y, height + 80) - 40;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, mote.radius);
    gradient.addColorStop(0, mote.color);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.globalAlpha = mote.alpha;
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, mote.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawStars() {
  for (const star of stars) {
    const offset = layerOffset(star.depth);
    const drift = tick * star.depth * 0.006;
    const x = wrap(star.x * width + offset.x - drift, width);
    const y = wrap(star.y * height + offset.y, height);
    const flicker = 0.74 + Math.sin(tick * star.pulse + star.x * 20) * 0.26;
    ctx.globalAlpha = star.alpha * flicker;
    ctx.fillStyle = star.hue;
    ctx.beginPath();
    ctx.arc(x, y, star.radius * (0.8 + star.depth), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawPlanet(planet) {
  const offset = layerOffset(planet.depth);
  const x = planet.x * width + offset.x;
  const y = planet.y * height + offset.y;
  const r = planet.radius * Math.min(1.18, Math.max(0.7, width / 1200));

  const glow = ctx.createRadialGradient(x, y, r * 0.2, x, y, r * 2.8);
  glow.addColorStop(0, planet.glow);
  glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(x, y, r * 2.8, 0, Math.PI * 2);
  ctx.fill();

  if (planet.rings) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-0.28);
    ctx.strokeStyle = 'rgba(247, 242, 232, 0.28)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, 0, r * 1.72, r * 0.44, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(115, 243, 218, 0.22)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(0, 0, r * 2.05, r * 0.54, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  const sphere = ctx.createRadialGradient(x - r * 0.36, y - r * 0.42, r * 0.1, x, y, r * 1.15);
  sphere.addColorStop(0, '#fff4cc');
  sphere.addColorStop(0.18, planet.color);
  sphere.addColorStop(1, planet.shade);
  ctx.fillStyle = sphere;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = 'rgba(247, 242, 232, 0.16)';
  ctx.lineWidth = 1;
  for (let i = -2; i <= 2; i += 1) {
    ctx.beginPath();
    ctx.ellipse(x, y + i * r * 0.18, r * 0.82, r * 0.08, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawAsteroid(asteroid) {
  const offset = layerOffset(asteroid.depth);
  const beltDrift = tick * asteroid.depth * 0.012;
  const x = wrap(asteroid.x * width + offset.x - beltDrift, width + 120) - 60;
  const y = wrap(asteroid.y * height + offset.y + Math.sin(tick * 0.002 + asteroid.x * 12) * 8, height + 120) - 60;
  const rotation = asteroid.rotation + tick * asteroid.speed;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.beginPath();
  for (let i = 0; i < asteroid.sides; i += 1) {
    const angle = (i / asteroid.sides) * Math.PI * 2;
    const radius = asteroid.radius * asteroid.bumps[i];
    const px = Math.cos(angle) * radius;
    const py = Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fillStyle = 'rgba(187, 178, 158, 0.42)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(247, 242, 232, 0.18)';
  ctx.stroke();
  ctx.restore();
}

function render() {
  tick += 1;
  pointer.x += (pointer.tx - pointer.x) * 0.055;
  pointer.y += (pointer.ty - pointer.y) * 0.055;

  drawBackground();
  suns.forEach(drawSun);
  drawDust();
  drawStars();
  planets.forEach(drawPlanet);
  asteroids.forEach(drawAsteroid);

  requestAnimationFrame(render);
}

window.addEventListener('resize', resize);
window.addEventListener('pointermove', (event) => {
  pointer.tx = (event.clientX / Math.max(width, 1) - 0.5) * -1;
  pointer.ty = (event.clientY / Math.max(height, 1) - 0.5) * -1;
});
window.addEventListener('pointerleave', () => {
  pointer.tx = 0;
  pointer.ty = 0;
});

resize();
render();
