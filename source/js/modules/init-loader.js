const initLoader = () => {
  const loader = document.querySelector('[data-loader]');
  const body = document.querySelector('body');


  if (!loader || !body) {
    return;
  }

  const getEvent = () => {
    window.dispatchEvent(new Event('loaderOff'));
  };

  const timeline = gsap.timeline();
  timeline.call(() => loader.classList.add('is-hidden'), null);
  timeline.call(() => body.classList.remove('scroll-lock-ios'), null, 1);
  timeline.call(getEvent, null, 1);
};

export {initLoader};
