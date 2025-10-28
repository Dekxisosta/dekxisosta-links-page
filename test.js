function getPointerPosition(e) {
    if (e.touches && e.touches.length > 0) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  }
  
  function handleDown(e) {
    const pos = getPointerPosition(e);
    const dx = pos.clientX - origin.x;
    const dy = pos.clientY - origin.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < length + 40 && dist > length - 40) {
        isDragging = true;
        body.classList.add('dragging');
    }
  }
  
  function handleMove(e) {
    if (isDragging) {
        const pos = getPointerPosition(e);
        const dx = pos.clientX - origin.x;
        const dy = pos.clientY - origin.y;
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
  
  // Touch
  window.addEventListener('touchstart', handleDown);
  window.addEventListener('touchmove', handleMove);
  window.addEventListener('touchend', handleUp);
  