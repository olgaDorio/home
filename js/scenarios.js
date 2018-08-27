import animate from './utils/animate';
import mountNodes from './utils/mountNodes';

module.exports = (data, container, parent) => {
  const prevButton = container.querySelector('.scenarios__controls .button:nth-child(1)');
  const nextButton = container.querySelector('.scenarios__controls .button:nth-child(2)');
  const cardHeight = 115;
  const scrollStep = 3 * cardHeight;

  const canOpenNextPage = () => {
    const { scrollHeight, offsetHeight, scrollTop } = parent;
    return scrollHeight <= offsetHeight || scrollTop + offsetHeight >= scrollHeight;
  };

  const canOpenPrevPage = () => (
    parent.scrollTop < cardHeight
  );

  const checkButtons = () => {
    prevButton.disabled = canOpenPrevPage();
    nextButton.disabled = canOpenNextPage();
  };

  const animateChildren = (animationName) => {
    [...parent.children].forEach((child) => {
      animate.reset(child);
      animate[animationName](child);
    });
  };

  const onPrevButtonClick = () => {
    const { scrollTop } = parent;
    parent.scrollTop = scrollTop - scrollStep;
    animateChildren('fromright');
    checkButtons();
  };

  const onNextButtonClick = () => {
    const { scrollTop } = parent;
    parent.scrollTop = scrollTop + scrollStep;
    animateChildren('fromleft');
    checkButtons();
  };

  mountNodes(parent, data);
  checkButtons();
  window.addEventListener('resize', checkButtons);
  prevButton.addEventListener('click', onPrevButtonClick);
  nextButton.addEventListener('click', onNextButtonClick);
};
