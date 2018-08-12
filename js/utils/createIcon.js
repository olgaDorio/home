module.exports = (name, type) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  svg.appendChild(use);
  svg.classList.add('icon');
  if (type) svg.classList.add(`icon--${type}`);
  use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#${name}`);
  return svg;
};
