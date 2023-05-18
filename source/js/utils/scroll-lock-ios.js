const addScrollLock = () => {
  const body = document.querySelector('body');
  const loader = document.querySelector('[data-loader]');

  if (!body || !loader) {
    return;
  }

  body.classList.add('scroll-lock-ios');

};

export {addScrollLock};
