const initAnimateIntro = () => {

  const intro = document.querySelector('[data-animate="intro"]');

  if (!intro) {
    return;
  }

  intro.classList.add('is-shown');

  const content = document.querySelector('[data-animate="intro-content"]');

  const animateToScroll = gsap.to(content, {
    opacity: 0.5,
    scale: 0.75,
    y: '-10vh',
  });

  ScrollTrigger.create({
    trigger: intro,
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    animation: animateToScroll,
  });


};

export {initAnimateIntro};
