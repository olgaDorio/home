module.exports = {
  appear: node => node.classList.add('appear'),
  fromtop: node => node.classList.add('fromtop'),
  frombottom: node => node.classList.add('frombottom'),
  fromright: node => node.classList.add('fromright'),
  fromleft: node => node.classList.add('fromleft'),
  reset: (node) => {
    node.classList.remove('appear');
    node.classList.remove('fromright');
    node.classList.remove('fromleft');
    node.classList.remove('fromtop');
    node.classList.remove('frombottom');
    void node.offsetWidth; // eslint-disable-line
  },
};
