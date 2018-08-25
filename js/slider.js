module.exports = (node) => {
  let currentValue = 0.3;
  const circle = node.querySelector('.slider__circle');
  const min = 0;
  const isHorizontal = () => node.offsetWidth > node.offsetHeight;
  const max = () => {
    if (isHorizontal()) {
      return node.offsetWidth - circle.offsetWidth;
    }
    return node.offsetHeight - circle.offsetHeight;
  };

  const setStyle = () => {
    const now = isHorizontal() ? 'left' : 'top';
    const prev = isHorizontal() ? 'top' : 'left';
    circle.style[prev] = 0;
    circle.style[now] = `${currentValue * max()}px`;
  };

  let down = false;
  let diff = 0;

  const updatePosition = (currentPosition) => {
    currentValue = currentPosition / max();
    setStyle();
  };

  const getPosition = (e) => {
    const event = e[isHorizontal() ? 'x' : 'y'] || e.changedTouches[0][isHorizontal() ? 'clientX' : 'clientY'];
    const slider = node.getBoundingClientRect()[isHorizontal() ? 'left' : 'top'];
    const relative = event - slider;

    return Math.min(Math.max(relative - diff, min), max());
  };

  const move = (e) => {
    e.preventDefault();
    if (!down) return;
    const currentPosition = getPosition(e);

    updatePosition(currentPosition);
  };

  const stop = (e) => {
    if (!down) {
      diff = circle.offsetWidth / 2;
    }
    down = false;
    const currentPosition = getPosition(e);
    updatePosition(currentPosition);
    diff = 0;
  };

  const start = (e) => {
    down = true;
    diff = e.target === circle ? e.offsetX || 30 : 30;
  };

  setStyle();

  window.addEventListener('resize', setStyle);
  node.addEventListener('touchstart', start);
  node.addEventListener('touchend', stop);
  node.addEventListener('touchmove', move);

  node.addEventListener('mousedown', start);
  node.addEventListener('mousemove', move);
  node.addEventListener('mouseup', stop);
};
