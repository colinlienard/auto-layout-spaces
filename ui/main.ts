import { UIMessage } from '../figma/types';

const showButton = document.querySelector('#show') as HTMLButtonElement;
const hideButton = document.querySelector('#hide') as HTMLButtonElement;

const postMessage = (message: UIMessage) => {
  parent.postMessage({ pluginMessage: message }, '*');
};

showButton.addEventListener('click', () => {
  postMessage({ type: 'show' });
  showButton.classList.add('disabled');
  hideButton.classList.remove('disabled');
});

hideButton.addEventListener('click', () => {
  postMessage({ type: 'hide' });
  hideButton.classList.add('disabled');
  showButton.classList.remove('disabled');
});

const radios = document.querySelectorAll(
  '.radio'
) as NodeListOf<HTMLInputElement>;
const customRatioInput = document.querySelector(
  '#custom-ratio-input'
) as HTMLInputElement;

const postCustomRatio = () => {
  postMessage({
    type: 'unit',
    value: parseInt(customRatioInput.value, 10),
  });
};

radios.forEach((radio) => {
  radio.addEventListener('change', () => {
    radios.forEach((r) => {
      // eslint-disable-next-line no-param-reassign
      r.checked = r === radio;
    });

    switch (radio.id) {
      case 'px':
      case 'rem':
        postMessage({ type: 'unit', value: radio.id });
        if (!customRatioInput.classList.contains('hidden')) {
          customRatioInput.classList.add('hidden');
        }
        break;
      case 'custom':
        postCustomRatio();
        if (customRatioInput.classList.contains('hidden')) {
          customRatioInput.classList.remove('hidden');
        }
        break;
      default:
        throw new Error();
    }
  });
});

customRatioInput.addEventListener('change', () => {
  postCustomRatio();
});
