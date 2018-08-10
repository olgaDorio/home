const createIcon = (name, type) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  svg.appendChild(use);
  svg.classList.add('icon');
  if (type) svg.classList.add(`icon--${type}`);
  use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#${name}`);
  return svg;
};

module.exports = ({ icon, title, subtitle, cardType }) => { // eslint-disable-line
  const _card = document.createElement('div'); // eslint-disable-line
  const _icon = createIcon(icon); // eslint-disable-line
  const _title = document.createElement('div'); // eslint-disable-line

  _title.innerHTML = title;
  _card.appendChild(_icon);
  _card.appendChild(_title);
  _card.classList.add('card');
  _title.classList.add('card__title');

  if (cardType) {
    _card.classList.add(`card--${cardType}`);
  }

  if (subtitle) {
    const _subtitle = document.createElement('div'); // eslint-disable-line
    _subtitle.classList.add('card__subtitle');
    _subtitle.innerHTML = subtitle;
    _card.appendChild(_subtitle);
  }

  return _card;
};
