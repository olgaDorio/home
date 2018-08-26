import createIcon from './createIcon';

const create = {
  element(tag, innerHTML, classList) {
    const element = document.createElement(tag);
    const classArray = typeof classList === 'object' ? classList : [classList];
    if (classArray) element.classList.add(...classArray);
    if (typeof innerHTML !== 'object') element.innerHTML = innerHTML;
    else element.appendChild(innerHTML);
    return element;
  },
  div(innerHTML, classList) {
    return this.element('div', innerHTML, classList);
  },
  button(innerHTML, classList) {
    return this.element('button', innerHTML, classList);
  },
};

const createSlider = ({ sunny }) => {
  const controlClassList = ['slider'];
  controlClassList.push(sunny ? 'slider--sun' : 'slider--temperature');
  const popupControl = create.div('', controlClassList);
  const sliderMin = !sunny ? create.div(-10, 'slider__min') :
    create.div(createIcon('sun-white', 'bigger'), 'slider__min');

  const sliderMax = !sunny ? create.div('+33', 'slider__max') :
    create.div(createIcon('sun-white', 'bigger'), 'slider__max');

  const sliderCircle = create.div('', 'slider__circle');

  popupControl.appendChild(sliderMin);
  popupControl.appendChild(sliderCircle);
  popupControl.appendChild(sliderMax);

  return popupControl;
};

const createRadial = () => { // and do something with them
  const wrapper = create.div('', 'radial');
  const linesWrapper = create.div('', 'radial__lines');
  const lines = Array.from({ length: 120 }, (v, i) => {
    const line = create.div('', 'radial__line');
    const angle = i * 3;
    line.style.transform = `rotate(${angle <= 180 ? angle : angle - 360}deg)`;
    return line;
  });
  const value = create.div('+23', 'radial__value');
  const pointer = create.div('', 'radial__pointer');

  lines.forEach((line) => {
    linesWrapper.appendChild(line);
  });
  wrapper.appendChild(linesWrapper);
  wrapper.appendChild(value);
  wrapper.appendChild(pointer);
  return wrapper;
};

const createControl = (options) => {
  if (options.type === 'slider') {
    return createSlider(options);
  }

  return createRadial();
};

const createPopupActions = (callback) => {
  const actions = create.div('', 'popup__actions');

  ['Применить', 'Закрыть'].forEach((innerHTML, i) => {
    const classList = ['button', 'button--round', `button--${i ? 'white' : 'yellow'}`];
    const button = create.button(innerHTML, classList);
    actions.appendChild(button);
    button.addEventListener('click', callback);
  });

  return actions;
};

const createPopupFilters = (sunny) => {
  const filterTitles = [
    ['Вручную', 'Холодно', 'Тепло'],
    ['Вручную', 'Дневной свет', 'Вечерний свет', 'Рассвет'],
  ];
  const popupFilters = create.div('', 'popup__filters');
  filterTitles[Number(!!sunny)].forEach((innerHTML, i) => {
    const classList = ['button', 'button--filter'];
    if (!i) classList.push('button--active');
    const button = create.button(innerHTML, classList);
    popupFilters.appendChild(button);
  });
  return popupFilters;
};

module.exports = {
  create,
  createControl,
  createPopupActions,
  createPopupFilters,
};
