import mountNodes from './mountNodes';
import animate from './animate';

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

    parent.scrollTop = down ? scrollTop + 135 : scrollTop - 135;

    [...parent.children].forEach((child) => {
      animate.reset(child);
      animate[down ? 'fromtop' : 'frombottom'](child);
    });
  };

  button.addEventListener('click', scroll);

  checkButton();
  mountNodes(parent, data);
};
