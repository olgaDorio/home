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

const createSlider = ({sunny, min, max}) => {
  const controlClassList = ['slider'];
  controlClassList.push(sunny ? 'slider--sun' : 'slider--temperature');
  const popupControl = create.div('', controlClassList);
  const sliderMin = create.div(min, 'slider__min');
  const sliderMax = create.div(max, 'slider__max');
  const sliderCircle = create.div('', 'slider__circle');

  popupControl.appendChild(sliderMin);
  popupControl.appendChild(sliderCircle);
  popupControl.appendChild(sliderMax);

  return popupControl;
};

const createRadial = () => {
  const wrapper = create.div('', 'radial');
  const value = create.div('19', 'radial__value');
  const pointer = create.div('', 'radial__pointer');
  wrapper.appendChild(value);
  wrapper.appendChild(pointer);
  return wrapper;
}

const createControl = ({type, sunny, min, max}) => {
  if (type === 'slider') {
    return createSlider({sunny, min, max});
  } else {
    return createRadial();
  }
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
    ['Вручную', 'Дневной свет', 'Вечерний свет', 'Рассвет'],
    ['Вручную', 'Холодно', 'Тепло', 'Жарко'],
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
  createSlider,
  createControl,
  createPopupActions,
  createPopupFilters,
};
