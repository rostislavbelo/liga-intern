const initStickySlider = () => {
  const section = document.querySelector('[data-scroll-slider="parent"]');

  // section.style.minHeight = content.getBoundingClientRect().width + 'px'; // задаем высоту обертке, опираясь на ширину контента

  if (!section) {
    return;
  }

  const content = section.querySelectorAll('[data-scroll-slider="slide"]');

  section.style.minHeight = window.innerWidth * (content.length - 1) + 'px';


  const toggleSlideActive = (progress) => {
    const coeffCountSlides = 1 / content.length;

    for (let i = 0; i < content.length; i++) {

      if (progress >= coeffCountSlides * i) {
        section.querySelector('.is-active').classList.remove('is-active');
        content[i].classList.add('is-active');
      }
    }
  };

  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      toggleSlideActive(self.progress);
    },
  });

};

export {initStickySlider};
