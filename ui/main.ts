import { UIMessage } from '../figma/types';

const showButton = document.querySelector('#show') as HTMLButtonElement;
const hideButton = document.querySelector('#hide') as HTMLButtonElement;

const postMessage = (message: UIMessage) => {
  parent.postMessage({ pluginMessage: message }, '*');
};

showButton.addEventListener('click', () => {
  postMessage('show');
  showButton.classList.add('disabled');
  hideButton.classList.remove('disabled');
});

hideButton.addEventListener('click', () => {
  postMessage('hide');
  hideButton.classList.add('disabled');
  showButton.classList.remove('disabled');
});
