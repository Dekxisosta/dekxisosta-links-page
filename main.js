const keychainEl = document.querySelector('.card--keychain');
const laceEl = document.querySelector('.card--lace');
const body = document.querySelector('body');

const card = document.querySelector('.card');
const cardRect = card.getBoundingClientRect();

const origin = { 
  x: cardRect.left, 
  y: cardRect.top +20
};


let angle = Math.PI / 4; 
let angleVel = 0;
let angleAcc = 0;
const length = 150;
const gravity = 0.9;
let isDragging = false;

function updateOrigin() {
  const cardRect = card.getBoundingClientRect();
  origin.x = cardRect.left;
  origin.y = cardRect.top + 20;
}

window.addEventListener('resize', updateOrigin);
window.visualViewport.addEventListener('resize', updateOrigin);

function getPointerPosition(e) {
  if (e.touches && e.touches.length > 0) {
    return { x: e.touches[0].x, y: e.touches[0].clientY };
  }
  return { x: e.clientX, y: e.clientY };
}

function handleDown(e) {
  const pos = getPointerPosition(e);
  const dx = pos.x - origin.x;
  const dy = pos.y - origin.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < length + 40 && dist > length - 40) {
      isDragging = true;
      body.classList.add('dragging');
  }
}

function handleMove(e) {
  if (isDragging) {
      const pos = getPointerPosition(e);
      const dx = pos.x - origin.x;
      const dy = pos.y - origin.y;
      angle = Math.atan2(dy, dx) - Math.PI / 2;
      laceEl.style.height = '${origin.x}px';
  }
}

function handleUp() {
  isDragging = false
  body.classList.remove('dragging');
}

// Mouse
window.addEventListener('mousedown', handleDown);
window.addEventListener('mousemove', handleMove);
window.addEventListener('mouseup', handleUp);


window.addEventListener('touchstart', handleDown);
window.addEventListener('touchmove', handleMove);
window.addEventListener('touchend', handleUp);


function animate() {
  requestAnimationFrame(animate);

  if (!isDragging) {
    angleAcc = (-1 * gravity / length) * Math.sin(angle);
    angleVel += angleAcc;
    angleVel *= 0.99; 
    angle += angleVel;
  }

  const x = origin.x + length * -Math.sin(angle);
  const y = origin.y + length * Math.cos(angle);

  // update lace
  const deg = (angle * 180) / Math.PI;
  laceEl.style.left = `${origin.x}px`;
  laceEl.style.top = `${origin.y}px`;
  laceEl.style.transform = `rotate(${deg}deg)`;

  keychainEl.style.left = `${x - 30}px`; // center adjustment
  keychainEl.style.top = `${y}px`;
}
animate();

window.addEventListener('wheel', (e) => {
  if (e.ctrlKey) e.preventDefault();
}, { passive: false });