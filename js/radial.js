module.exports = (circle) => {
  let is_dragging = false;
  const pointer = circle.querySelector('.radial__pointer');

  const start = () => {
    is_dragging = true;
  };

  const stop = () => {
    is_dragging = false;
  };

  const move = (e) => {
    let angle, center_x, center_y, delta_x, delta_y, pos_x, pos_y, touch;

    if (is_dragging) {
      if (e.touches) {
        touch = e.touches[0];
      }

      center_x = (circle.offsetWidth / 2) + circle.offsetLeft;
      center_y = (circle.offsetHeight / 2) + circle.offsetTop;
      pos_x = e.pageX || touch.clientX;
      pos_y = e.pageY || touch.clientY;
      delta_y = center_y - pos_y;
      delta_x = center_x - pos_x;
      angle = Math.atan2(delta_y, delta_x) * (180 / Math.PI); // Calculate Angle between circle center and mouse pos
      angle -= 90;
      if (angle < 0) {
        angle = 360 + angle; // Always show angle positive
      }
      if (angle > 210 || angle < 150) {
        angle = Math.round(angle);
        pointer.style.transform = `rotate(${angle}deg)`;
      }
    }
  };

  circle.addEventListener('mousedown', start);
  circle.addEventListener('touchstart', start);

  document.addEventListener('mouseup', stop);
  document.addEventListener('touchend', stop);

  document.addEventListener('mousemove', move)
  document.addEventListener('touchmove', move)

};

