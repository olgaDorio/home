module.exports = () => {
  const navigationTrigger = document.querySelector('.navigation__trigger');
  const navigationPanel = document.querySelector('.navigation--mobile');

  navigationTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    navigationPanel.classList.remove('navigation--hidden');
    navigationPanel.classList.add('navigation--shown');

    const onanimationend = () => {
      navigationPanel.classList.remove('navigation--shown');
      navigationPanel.removeEventListener('animationend', onanimationend);
    };

    navigationPanel.addEventListener('animationend', onanimationend);
  });

  document.addEventListener('click', () => {
    if (navigationPanel.classList.contains('navigation--hidden')) {
      return;
    }

    navigationPanel.classList.add('navigation--hide');

    const onanimationend = () => {
      navigationPanel.classList.add('navigation--hidden');
      navigationPanel.classList.remove('navigation--hide');
      navigationPanel.removeEventListener('animationend', onanimationend);
    };

    navigationPanel.addEventListener('animationend', onanimationend);
  });
};
