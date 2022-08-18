import { UIMessage } from '../figma/types';

const postMessage = (message: UIMessage) => {
  parent.postMessage({ pluginMessage: message }, '*');
};

document.querySelector('#show')?.addEventListener('click', () => {
  postMessage('show');
});

document.querySelector('#hide')?.addEventListener('click', () => {
  postMessage('hide');
});
