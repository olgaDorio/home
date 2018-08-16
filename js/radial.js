module.exports = (circle) => {
  let isDragging = false;
  const pointer = circle.querySelector('.radial__pointer');

  const start = () => {
    isDragging = true;
  };

  const stop = () => {
    isDragging = false;
  };

  const move = (e) => {
    let touch;

    if (!isDragging) {
      return;
    }

    if (e.touches) {
      [touch] = e.touches;
    }

    const centerX = (circle.offsetWidth / 2) + circle.offsetLeft;
    const centerY = (circle.offsetHeight / 2) + circle.offsetTop;
    const posX = e.pageX || touch.clientX;
    const posY = e.pageY || touch.clientY;
    const deltaY = centerY - posY;
    const deltaX = centerX - posX;
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    angle -= 90;

    if (angle < -180) {
      angle = 360 + angle;
    }

    if (angle > -150 && angle < 150) {
      angle = Math.round(angle);
      pointer.style.transform = `rotate(${angle}deg)`;
    }
  };

  circle.addEventListener('mousedown', start);
  circle.addEventListener('touchstart', start);
  document.addEventListener('mouseup', stop);
  document.addEventListener('touchend', stop);
  document.addEventListener('mousemove', move);
  document.addEventListener('touchmove', move);
};

