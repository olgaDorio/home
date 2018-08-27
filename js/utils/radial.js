import create from './create';

const getAngle = transform => (
  parseInt(transform.replace('rotate(', ''), 10)
);

class Radial {
  constructor(initialAngle = 0, initialValue = '+23') {
    this.isDragging = false;
    this.lines = [];
    this.black = 'rgba(0, 0, 0, 0.7)';
    this.yellow = 'rgba(245, 166, 35, 0.7)';

    this.node = create.div('', 'radial');
    const linesWrapper = create.div('', 'radial__lines');
    const value = create.div(initialValue, 'radial__value');
    this.pointer = create.div('', 'radial__pointer');
    this.pointer.style.transform = `rotate(${initialAngle}deg)`;

    this.createLines(linesWrapper);
    this.colorizeLines(initialAngle);

    this.node.appendChild(linesWrapper);
    this.node.appendChild(value);
    this.node.appendChild(this.pointer);

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.move = this.move.bind(this);
  }

  createLines(linesWrapper) {
    Array.from({ length: 120 }, () => '').forEach((v, i) => {
      const line = create.div('', 'radial__line');
      const angle = i * 3;
      line.style.transform = `rotate(${angle <= 180 ? angle : angle - 360}deg)`;
      linesWrapper.appendChild(line);
      this.lines.push(line);
    });
  }

  mounted() {
    this.node.addEventListener('mousedown', this.start);
    this.node.addEventListener('touchstart', this.start);
    document.addEventListener('mouseup', this.stop);
    document.addEventListener('touchend', this.stop);
    document.addEventListener('mousemove', this.move);
    document.addEventListener('touchmove', this.move);
  }

  destroyed() {
    this.node.removeEventListener('mousedown', this.start);
    this.node.removeEventListener('touchstart', this.start);
    document.removeEventListener('mouseup', this.stop);
    document.removeEventListener('touchend', this.stop);
    document.removeEventListener('mousemove', this.move);
    document.removeEventListener('touchmove', this.move);
  }

  colorizeLines(angle) {
    this.lines.forEach((line) => {
      const isLess = getAngle(line.style.transform) <= angle;
      line.style.backgroundColor = isLess ? this.yellow : this.black;
    });
  }

  move(e) {
    let touch;

    if (!this.isDragging) {
      return;
    }

    if (e.touches) {
      [touch] = e.touches;
    }

    const centerX = (this.node.offsetWidth / 2) + this.node.offsetLeft;
    const centerY = (this.node.offsetHeight / 2) + this.node.offsetTop;
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
      this.pointer.style.transform = `rotate(${angle}deg)`;
      this.colorizeLines(angle);
    }
  }

  start(e) {
    this.isDragging = true;
    this.move(e);
  }

  stop() {
    this.isDragging = false;
  }
}

module.exports = Radial;
