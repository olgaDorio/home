import animate from './animate';
import createCard from './createCard';

module.exports = (container, data, animationName) => {
  while (container.children.length) {
    container.removeChild(container.firstChild);
  }

  data.forEach((object) => {
    const node = createCard(object);
    if (animationName) animate[animationName](node);

    container.appendChild(node);
  });
};
