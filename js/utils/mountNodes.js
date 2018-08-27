import create from './create';
import animate from './animate';

const createCard = ({ icon, title, subtitle, cardType, isActive }) => { // eslint-disable-line
  const _card = document.createElement('div'); // eslint-disable-line
  const _icon = create.icon(icon); // eslint-disable-line
  const _title = document.createElement('div'); // eslint-disable-line

  _title.innerHTML = title;
  _card.appendChild(_icon);
  _card.appendChild(_title);
  _card.classList.add('card');
  _title.classList.add('card__title');

  if (isActive) {
    _card.classList.add('card--active');
  }

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

module.exports = (container, data, animationName) => {
  while (container.children.length) {
    container.removeChild(container.firstChild);
  }

  return data.map((object) => {
    const node = createCard(object);
    if (animationName) animate[animationName](node);

    container.appendChild(node);
    return container.lastElementChild;
  });
};
