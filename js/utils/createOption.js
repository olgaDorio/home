module.exports = (value, text, checked) => {
  const label = document.createElement('label');
  const input = document.createElement('input');
  const span = document.createElement('span');
  input.type = 'radio';
  input.name = 'select';
  input.value = value;
  input.checked = checked;
  label.classList.add('radio');
  input.classList.add('radio__input');
  span.classList.add('radio__checkmark');
  label.innerHTML = text;
  label.appendChild(input);
  label.appendChild(span);
  return label;
};
