const create = {
  element(tag, innerHTML, classList) {
    const element = document.createElement(tag);
    const classArray = typeof classList === 'object' ? classList : [classList];
    if (classArray) element.classList.add(...classArray);
    if (typeof innerHTML !== 'object') element.innerHTML = innerHTML;
    else element.appendChild(innerHTML);
    return element;
  },

  div(innerHTML, classList) {
    return this.element('div', innerHTML, classList);
  },

  button(innerHTML, classList) {
    return this.element('button', innerHTML, classList);
  },

  icon(name, type) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    svg.appendChild(use);
    svg.classList.add('icon');
    if (type) svg.classList.add(`icon--${type}`);
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#${name}`);
    return svg;
  },

  radioInput(value, text, checked) {
    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');
    input.type = 'radio';
    input.name = 'select';
    input.value = value;
    input.checked = checked;
    label.classList.add('radio');
    input.classList.add('radio__input');
    span.classList.add('radio__checkmark');
    label.innerHTML = text;
    label.appendChild(input);
    label.appendChild(span);
    return label;
  },
};

module.exports = create;
