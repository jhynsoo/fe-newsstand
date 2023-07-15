import { BUTTON } from '../constants.js';
import Icon from './Icon.js';

const Button = ({ icon, isWhite, text, onClick }) => {
  const buttonElement = document.createElement('button');
  const surfaceClass = isWhite ? 'surface_default' : 'surface_alt';

  buttonElement.className = `button border_default ${surfaceClass}`;
  buttonElement.innerHTML = Icon[icon];
  if (text) {
    buttonElement.classList.add('text_button');
    buttonElement.appendChild(document.createTextNode(text));
  }
  buttonElement.addEventListener('click', onClick);

  return buttonElement;
};

const UnSubButton = ({ withText, onClick }) =>
  Button({
    icon: 'close',
    isWhite: false,
    text: withText ? BUTTON.UNSUBSCRIBE : null,
    onClick,
  });

const SubButton = ({ isSub, withText = true, onClick }) =>
  isSub
    ? UnSubButton({ withText, onClick })
    : Button({ icon: 'plus', isWhite: true, text: BUTTON.SUBSCRIBE, onClick });

const SubButtonArea = isSub => {
  const subButtonArea = document.createElement('div');

  subButtonArea.classList.add('media_hover', 'surface_alt');
  subButtonArea.appendChild(SubButton({ isSub }));
  return subButtonArea;
};

const ArrowButton = direction => {
  const arrowButton = document.createElement('button');

  arrowButton.id = `${direction}_arrow`;
  arrowButton.innerHTML = `<img src="assets/images/${direction}.svg" alt="${direction}">`;
  return arrowButton;
};

export default Button;
export { ArrowButton, SubButton, SubButtonArea };
