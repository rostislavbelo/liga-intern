const initMainNav = () => {

  const button = document.querySelector('[data-btn-nav]');
  const header = document.querySelector('[data-header]');
  const mainNav = document.querySelector('[data-main-nav]');
  const body = document.querySelector('body');

  if (!button || !header || !mainNav || !body) {
    return;
  }

  let headerHeight = header.clientHeight;

  const toggleActive = () => {
    header.classList.toggle('is-active');
    mainNav.style['padding-top'] = `${headerHeight}px`;
    if (body.classList.contains('scroll-lock')) {
      window.scrollLock.enableScrolling();
    } else {
      window.scrollLock.disableScrolling();
    }
  };

  button.addEventListener('click', toggleActive);

};

export {initMainNav};
