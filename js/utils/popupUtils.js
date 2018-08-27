import create from './create';

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
  createPopupActions,
  createPopupFilters,
};
