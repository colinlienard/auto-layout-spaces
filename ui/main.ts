console.log('test');

document.querySelector('button')?.addEventListener('click', () => {
  parent.postMessage({ pluginMessage: 'salut' }, '*');
});