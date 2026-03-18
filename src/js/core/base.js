const html = document.documentElement;

// JS detection
html.classList.remove('no-js');
html.classList.add('js');

// Touch detection
if ('ontouchstart' in window) {
  html.classList.add('touch');
}

window.addEventListener('DOMContentLoaded', () => {

  // Page identifier safety
  if (!document.body.dataset.page) {
    document.body.dataset.page = 'default';
  }

  // UI ready state
  document.body.classList.add('is-ready');
});