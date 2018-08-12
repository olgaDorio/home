import createPopup from './popup';
import mountNodes from './utils/mountNodes';
import animate from './utils/animate';

module.exports = (data, container, parent) => {
  const nextPageButton = container.querySelector('.devices__controls .button:last-child');
  const prevPageButton = container.querySelector('.devices__controls .button:first-child');
  const filterButtons = container.querySelector('.filter');

  const checkPaginationButtons = () => {
    const { width, left } = parent.lastElementChild.getBoundingClientRect();
    nextPageButton.disabled = parent.offsetWidth + parent.scrollLeft > width + left; // buggy
    prevPageButton.disabled = !parent.scrollLeft;
  };

  const goForward = () => {
    const { width, left } = parent.lastElementChild.getBoundingClientRect(); // buggy

    if (parent.offsetWidth + parent.scrollLeft > width + left) {
      return;
    }

    const newval = parent.scrollLeft + 215;
    const edge = parent.scrollWidth;
    const value = Math.min(edge, newval);

    parent.scrollLeft = value; // eslint-disable-line no-param-reassign

    [...parent.children].forEach((child) => {
      animate.reset(child);
      animate.fromright(child);
    });

    checkPaginationButtons();
  };

  const goBack = () => {
    if (!parent.scrollLeft) {
      return;
    }

    const newval = parent.scrollLeft - 215;
    const edge = 0;
    const value = Math.max(edge, newval);

    parent.scrollLeft = value;

    [...parent.children].forEach((child) => {
      animate.reset(child);
      animate.fromleft(child);
    });

    checkPaginationButtons();
  };

  const filter = (e) => {
    if (!e.target.classList.contains('button')) {
      return;
    }

    const { name } = e.target.dataset;
    const currentlyActive = filterButtons.querySelector('.button--active');
    const filtered = data.filter(object => (
      name === 'all' || object.filterType === name
    ));

    currentlyActive.classList.remove('button--active');
    e.target.classList.add('button--active');

    mountNodes(parent, filtered, 'appear');
    checkPaginationButtons();
  };

  const initPopup = (card) => {
    const { title, subtitle, value, min, max } = card;
    const sunny = card.icon.includes('sun')

    createPopup({
      title, subtitle, sunny, value, min, max,
    });
  };

  const cards = mountNodes(parent, data);
  checkPaginationButtons();

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const index = cards.indexOf(card);
      initPopup(data[index]); // TODO get from data
    });
  });

  nextPageButton.addEventListener('click', goForward);
  prevPageButton.addEventListener('click', goBack);
  filterButtons.addEventListener('click', filter);
  window.addEventListener('resize', checkPaginationButtons);
};
