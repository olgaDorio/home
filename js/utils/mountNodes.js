import animate from './animate';
import createCard from './createCard';

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
