const addScrollLock = () => {
  const body = document.querySelector('body');

  if (!body) {
    return;
  }

  body.classList.add('scroll-lock-ios');

};

export {addScrollLock};
