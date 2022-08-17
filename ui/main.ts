document.querySelector('button')?.addEventListener('click', () => {
  parent.postMessage({ pluginMessage: 'salut' }, '*');
});
