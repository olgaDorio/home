module.exports = (node, initial=0, callback = () => {}) => {
  const circle = node.querySelector('.slider__circle');
  const min = 0;
  const isHorizontal = () => node.offsetWidth > node.offsetHeight;
  const max = () => {
    if (isHorizontal()) {
      return node.offsetWidth - circle.offsetWidth;
    }
    return node.offsetHeight - circle.offsetHeight;
  };

  circle.style[isHorizontal() ? 'left': 'right'] = `${initial * max()}px`;

  let down = false;
  let diff = 0;

  const getPercentage = (currentPosition) => {
    callback(currentPosition / max());
  };

  const getPosition = (e) => {
    const event = e[isHorizontal() ? 'x' : 'y'] || e.changedTouches[0][isHorizontal() ? 'clientX' : 'clientY'];
    const slider = node.getBoundingClientRect()[isHorizontal() ? 'x' : 'y'];
    const relative = event - slider;

    return Math.min(Math.max(relative - diff, min), max());
  };

  const move = (e) => {
    e.preventDefault();
    if (!down) return;
    const currentPosition = getPosition(e);
    circle.style[isHorizontal() ? 'left' : 'top'] = `${currentPosition}px`;
    getPercentage(currentPosition);
  };

  const stop = (e) => {
    if (!down) {
      diff = circle.offsetWidth / 2;
    }
    down = false;
    const currentPosition = getPosition(e);
    circle.style[isHorizontal() ? 'left' : 'top'] = `${currentPosition}px`;
    getPercentage(currentPosition);
    diff = 0;
  };

  const start = (e) => {
    down = true;
    console.log(e.offsetX);
    diff = e.offsetX || 30; // TODO
    console.log(diff);
  };

  circle.addEventListener("touchstart", start);
  node.addEventListener("touchend", stop);
  node.addEventListener("touchmove", move);

  circle.addEventListener('mousedown', start);
  node.addEventListener('mousemove', move);
  node.addEventListener('mouseup', stop);
};
