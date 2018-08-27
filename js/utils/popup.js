import create from './create';
import Slider from './slider';
import Radial from './radial';
import { createPopupActions, createPopupFilters } from './popupUtils';

module.exports = (options) => {
  const {
    title, subtitle, type, sunny,
  } = options;

  const getPopupValue = () => {
    if (sunny && type === 'slider') {
      return create.icon('sun2', 'biggest');
    }

    const div = create.div('', 'flex-container');
    const span = create.element('span', '+23');
    span.innerHTML = '+23';
    div.appendChild(span);
    div.appendChild(create.icon('temperature2', 'biggest'));
    return div;
  };

  const popup = create.div('', 'popup');
  const popupBody = create.div('', 'popup__body');
  const popupTitle = create.div(title, 'popup__title');
  const popupValue = create.div(getPopupValue(), 'popup__value');
  const popupSubtitle = create.div(subtitle, 'popup__subtitle');

  const popupControl = type === 'slider' ? new Slider(options.sunny) : new Radial();

  const removePopup = () => {
    document.body.style.overflow = 'auto';
    document.body.removeChild(popup);
    popupControl.destroyed();
  };

  const popupActions = createPopupActions(removePopup);

  popup.appendChild(popupBody);
  popup.appendChild(popupActions);
  popupBody.appendChild(popupTitle);
  popupBody.appendChild(popupSubtitle);
  if (options.type === 'slider') {
    popupBody.appendChild(createPopupFilters(sunny));
  }
  popupBody.appendChild(popupControl.node);
  popupTitle.appendChild(popupValue);

  popup.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup')) {
      removePopup();
    }
  });

  document.body.style.overflow = 'hidden';
  document.body.prepend(popup);
  popupControl.mounted();
};
