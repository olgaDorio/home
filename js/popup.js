import radial from './radial';
import slider from './slider';
import { create, createControl, createPopupActions, createPopupFilters } from './utils/popupUtils';
import createIcon from './utils/createIcon';

module.exports = (options) => {
  const {
    title, subtitle, type, sunny,
  } = options;

  const getPopupValue = () => {
    if (sunny && type === 'slider') {
      return createIcon('sun2', 'biggest');
    }

    const div = create.div('', 'flex-container');
    const span = create.element('span', '+23');
    span.innerHTML = '+23';
    div.appendChild(span);
    div.appendChild(createIcon('temperature2', 'biggest'));
    return div;
  };

  const popup = create.div('', 'popup');
  const popupBody = create.div('', 'popup__body');
  const popupTitle = create.div(title, 'popup__title');
  const popupValue = create.div(getPopupValue(), 'popup__value');
  const popupSubtitle = create.div(subtitle, 'popup__subtitle');
  const popupFilters = createPopupFilters(sunny);

  const removePopup = () => {
    document.body.style.overflow = 'auto';
    document.body.removeChild(popup);
  };

  const popupActions = createPopupActions(removePopup);
  const popupControl = createControl(options);

  popup.appendChild(popupBody);
  popup.appendChild(popupActions);
  popupBody.appendChild(popupTitle);
  popupBody.appendChild(popupSubtitle);
  popupBody.appendChild(popupFilters);
  popupBody.appendChild(popupControl);
  popupTitle.appendChild(popupValue);

  popup.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup')) {
      removePopup();
    }
  });

  document.body.style.overflow = 'hidden';
  document.body.prepend(popup);

  if (type === 'slider') {
    slider(popupControl);
  } else {
    radial(popupControl);
  }
};
