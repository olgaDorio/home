import create from './create';

class Slider {
  constructor(sunny, value = 0.3, min = '-10', max = '+33') {
    this.currentValue = value || 0.3;

    this.down = false;
    this.diff = 0;

    const classList = ['slider', sunny ? 'slider--sun' : 'slider--temperature'];

    this.node = create.div('', classList);
    this.minC = create.div(sunny ? create.icon('sun-white', 'bigger') : min, 'slider__min');
    this.maxC = create.div(sunny ? create.icon('sun-white', 'bigger') : max, 'slider__max');
    this.circle = create.div('', 'slider__circle');

    this.node.appendChild(this.minC);
    this.node.appendChild(this.circle);
    this.node.appendChild(this.maxC);

    this.stop = this.stop.bind(this);
    this.move = this.move.bind(this);
    this.start = this.start.bind(this);
    this.mounted = this.mounted.bind(this);
    this.setStyle = this.setStyle.bind(this);
    this.destroyed = this.destroyed.bind(this);
  }

  mounted() {
    this.min = 0;
    this.wasHorizontal = this.isHorizontal();
    this.setStyle();

    window.addEventListener('resize', this.setStyle);
    this.node.addEventListener('touchstart', this.start);
    this.node.addEventListener('touchend', this.stop);
    this.node.addEventListener('touchmove', this.move);
    this.node.addEventListener('mousedown', this.start);
    this.node.addEventListener('mousemove', this.move);
    this.node.addEventListener('mouseup', this.stop);
  }

  destroyed() {
    window.removeEventListener('resize', this.setStyle);
    this.node.removeEventListener('touchstart', this.start);
    this.node.removeEventListener('touchend', this.stop);
    this.node.removeEventListener('touchmove', this.move);
    this.node.removeEventListener('mousedown', this.start);
    this.node.removeEventListener('mousemove', this.move);
    this.node.removeEventListener('mouseup', this.stop);
  }

  updatePosition(currentPosition) {
    this.currentValue = currentPosition / this.max();
    this.setStyle();
  }

  getPosition(e) {
    const event = e[this.isHorizontal() ? 'x' : 'y'] || e.changedTouches[0][this.isHorizontal() ? 'clientX' : 'clientY'];
    const slider = this.node.getBoundingClientRect()[this.isHorizontal() ? 'left' : 'top'];
    const relative = event - slider;

    return Math.min(Math.max(relative - this.diff, this.min), this.max());
  }

  move(e) {
    e.preventDefault();
    if (!this.down) return;
    const currentPosition = this.getPosition(e);

    this.updatePosition(currentPosition);
  }

  stop(e) {
    if (!this.down) {
      this.diff = this.circle.offsetWidth / 2;
    }

    this.move(e);
    this.down = false;
    this.diff = 0;
  }

  start(e) {
    this.down = true;
    this.diff = e.target === this.circle ? e.offsetX || 30 : 30;
  }

  isHorizontal() {
    return this.node.offsetWidth > this.node.offsetHeight;
  }

  max() {
    if (this.isHorizontal()) {
      return this.node.offsetWidth - this.circle.offsetWidth;
    }
    return this.node.offsetHeight - this.circle.offsetHeight;
  }

  setStyle() {
    const invert = this.wasHorizontal !== this.isHorizontal();

    if (invert) {
      this.currentValue = 1 - this.currentValue;
    }

    const now = this.isHorizontal() ? 'left' : 'top';
    const prev = this.isHorizontal() ? 'top' : 'left';
    this.circle.style[prev] = 0;
    this.circle.style[now] = `${this.currentValue * this.max()}px`;

    this.wasHorizontal = this.isHorizontal();
  }
}

module.exports = Slider;
