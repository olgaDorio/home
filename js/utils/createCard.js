import createIcon from './createIcon.js';

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
