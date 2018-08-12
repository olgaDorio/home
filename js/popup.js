import animate from './utils/animate';
import slider from './slider';
import radial from './radial';
import { create, createSlider, createControl, createPopupActions, createPopupFilters } from './utils/popupUtils';

module.exports = ({title, subtitle, value, min, max, type, sunny}) => {
  const valueHTML = sunny ? create.div('sun', ['sun', 'sun--big']) : value;

  const removePopup = () => {
    document.body.style.overflow = 'auto';
    animate.frombottom(popup);
    popup.addEventListener('animationend', () => {
      document.body.removeChild(popup);
    });
  };
  const popup = create.div('', 'popup');
  const popupBody = create.div('', 'popup__body');
  const popupTitle = create.div(title, 'popup__title');
  const popupValue = create.div(valueHTML, 'popup__value');
  const popupSubtitle = create.div(subtitle, 'popup__subtitle');
  const popupFilters = createPopupFilters(sunny); //
  const popupActions = createPopupActions(removePopup);
  // const popupControl = createControl({type: 'slider', sunny, min, max, value});
  const popupControl = createControl({type: 'radial', min, max, value});

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

  // filter: blur(4px);
  document.body.style.overflow = 'hidden';
  document.body.appendChild(popup);
  animate.fromtop(popup);
  // slider(popupControl, value / (max - min), console.log);
  radial(popupControl);
};
