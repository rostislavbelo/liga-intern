const initMainNav = () => {

  const button = document.querySelector('[data-btn-nav]');
  const header = document.querySelector('[data-header]');
  const mainNav = document.querySelector('[data-main-nav]');
  const body = document.querySelector('body');

  if (!button || !header || !mainNav || !body) {
    return;
  }

  let headerHeight = header.clientHeight;


  // -------------------------------------------------------------
  // Устанавливаем слежение за высотой хедера и передаём переменную в стили

  document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);

  window.addEventListener('resize', function () {
    headerHeight = header.clientHeight;
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
  });

  // -----------------------------------------------------------------


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

export { initMainNav };
