const initLoader = () => {
  const loader = document.querySelector('[data-loader]');
  const body = document.querySelector('body');


  if (!loader || !body) {
    return;
  }

  loader.classList.add('is-hidden');

  setTimeout(() => body.classList.remove('scroll-lock-ios'), 1000);


};

export {initLoader};
