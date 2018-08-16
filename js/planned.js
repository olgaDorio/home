import mountNodes from './utils/mountNodes';
import animate from './utils/animate';

module.exports = (data, container, parent) => {
  let down = true;
  const button = container.querySelector('.button');

  const checkButton = () => {
    button.disabled = data.length < 3;
  };

  const scroll = () => {
    const { scrollTop, scrollHeight, offsetHeight } = parent;

    const hasReachedBottom = scrollTop + offsetHeight === scrollHeight;
    const hasReachedTop = !scrollTop;

    if (hasReachedBottom) {
      down = false;
    } else if (hasReachedTop) {
      down = true;
    }

    parent.scrollTop = down ? scrollTop + 135 : scrollTop - 135; // eslint-disable no-param-reassign

    [...parent.children].forEach((child) => {
      animate.reset(child);
      animate[down ? 'fromtop' : 'frombottom'](child);
    });
  };

  button.addEventListener('click', scroll);

  checkButton();
  mountNodes(parent, data);
  parent.scrollTop = 0;
};
