import createOption from './utils/createOption';
import createPopup from './popup';
import mountNodes from './utils/mountNodes';
import animate from './utils/animate';
import { create } from './utils/popupUtils';

const mobileSelect = document.querySelector('.select');

const filterOptions = {
  all: 'Все',
  kitchen: 'Кухня',
  livingRoom: 'Зал',
  lights: 'Лампочки',
  cameras: 'Камеры',
};

let selectedFilter = 'all';

module.exports = (data, container, parent) => {
  const nextPageButton = container.querySelector('.devices__controls .button:last-child');
  const prevPageButton = container.querySelector('.devices__controls .button:first-child');
  const filterButtons = container.querySelector('.filter');

  const checkPaginationButtons = () => {
    const { offsetWidth, scrollWidth, scrollLeft } = parent;

    nextPageButton.disabled = scrollWidth - scrollLeft === offsetWidth;
    prevPageButton.disabled = !scrollLeft;
  };

  const goForward = () => {
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

  const mountCards = (cardsData) => {
    const nodes = mountNodes(parent, cardsData, 'appear');
    nodes.forEach((node) => {
      node.addEventListener('click', () => {
        const index = nodes.indexOf(node);
        const cardData = cardsData[index];
        const sunny = cardData.icon.includes('sun');
        createPopup(Object.assign({ sunny }, cardData));
      });
    });
    checkPaginationButtons();
  };

  const filterCards = (location) => {
    const currentButton = [...filterButtons.children].find(b => b.dataset.name === location);
    const activeButton = filterButtons.querySelector('.button--active');
    const filteredData = data.filter(object => (
      location === 'all' || object.filterType === location
    ));
    currentButton.classList.add('button--active');
    activeButton.classList.remove('button--active');
    selectedFilter = location;
    mountCards(filteredData);
    mobileSelect.innerHTML = filterOptions[location];
  };

  const filter = (e) => {
    if (!e.target.classList.contains('button')) {
      return;
    }

    filterCards(e.target.dataset.name);
  };

  const createFilterPopup = () => {
    const popup = create.div('', 'popup');
    const popupBody = create.div('', ['popup__body', 'popup--small']);
    const removePopup = () => { document.body.removeChild(popup); };
    const onClick = (e) => { if (e.target.classList.contains('popup')) removePopup(); };

    Object.keys(filterOptions).forEach((key) => {
      const label = createOption(key, filterOptions[key], key === selectedFilter);
      const input = label.querySelector('input');

      const onChange = () => {
        filterCards(input.value);
        removePopup();
      };

      input.addEventListener('change', onChange);
      popupBody.appendChild(label);
    });

    popup.appendChild(popupBody);
    popup.addEventListener('click', onClick);
    document.body.prepend(popup);
  };

  mountCards(data);

  nextPageButton.addEventListener('click', goForward);
  prevPageButton.addEventListener('click', goBack);
  filterButtons.addEventListener('click', filter);
  window.addEventListener('resize', checkPaginationButtons);
  document.querySelector('.select').addEventListener('click', createFilterPopup);
};
