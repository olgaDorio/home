module.exports = (circle) => {
  let isDragging = false;
  const pointer = circle.querySelector('.radial__pointer');
  const lines = circle.querySelectorAll('.radial__line');
  const black = 'rgba(0, 0, 0, 0.7)';
  const yellow = 'rgba(245, 166, 35, 0.7)';

  const getAngle = transform => (
    parseInt(transform.replace('rotate(', ''), 10)
  );

  const colorizeLines = (angle) => {
    lines.forEach((line) => {
      const isLess = getAngle(line.style.transform) <= angle;
      line.style.backgroundColor = isLess ? yellow : black;
    });
  };

  colorizeLines(0);

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
    const posX = e.clientX || touch.clientX;
    const posY = e.clientY || touch.clientY;
    const deltaY = centerY - posY;
    const deltaX = centerX - posX;
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    angle -= 90;

    if (angle < -180) {
      angle = 360 + angle;
    }

    if (angle >= -151 && angle <= 151) {
      angle = Math.round(angle);
      pointer.style.transform = `rotate(${angle}deg)`;
      colorizeLines(angle);
    }
  };

  const start = (e) => {
    isDragging = true;
    move(e);
  };

  const stop = () => {
    isDragging = false;
  };

  circle.addEventListener('mousedown', start);
  circle.addEventListener('touchstart', start);
  document.addEventListener('mouseup', stop);
  document.addEventListener('touchend', stop);
  document.addEventListener('mousemove', move);
  document.addEventListener('touchmove', move);
};

