const initAnimateIntro = () => {

  const intro = document.querySelector('[data-animate="intro"]');

  if (!intro) {
    return;
  }

  const content = document.querySelector('[data-animate="intro-content"]');

  setTimeout(() => intro.classList.add('is-shown'), 800);


  const horizontalTween = gsap.to(content, {
    opacity: 0.5,
    scale: 0.75,
    y: '-10vh',
  });
  ScrollTrigger.create({ // привязываем анимацию к скролл тригеру
    trigger: intro,
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    animation: horizontalTween,
  });


};

export {initAnimateIntro};
