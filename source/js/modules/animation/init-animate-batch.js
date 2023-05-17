const initAnimateBatch = () => {

  gsap.set('[data-animate="fade"]', {opacity: 0});
  gsap.set('[data-animate="fade-in"]', {opacity: 0, y: 25});
  gsap.set('[data-animate="fade-scale"]', {opacity: 0, scale: 0});

  ScrollTrigger.batch('[data-animate="fade"]', {
    onEnter: (batch) => gsap.to(batch, {opacity: 1, stagger: {each: 0.25}}),
    start: 'center center',
    end: 'bottom top',
    scrub: true,
  });

  ScrollTrigger.batch('[data-animate="fade-in"]', {
    onEnter: (batch) => gsap.to(batch, {opacity: 1, y: 0, stagger: {each: 0.25}}),
    start: 'center center',
    end: 'bottom top',
    scrub: true,
  });

  ScrollTrigger.batch('[data-animate="fade-scale"]', {
    onEnter: (batch) => gsap.to(batch, {opacity: 1, scale: 1, stagger: {each: 0.25}}),
    start: 'center center', end: 'bottom top',
    scrub: true,
  });

  // ScrollTrigger.batch('[data-animate="fade-scale-reverce"]', {
  //   onEnter: (batch) => gsap.to(batch, {opacity: 1, stagger: {each: 0.25}}),
  //   onLeave: (batch) => gsap.set(batch, {opacity: 0, stagger: {each: 0.25}}),
  //   onEnterBack: (batch) => gsap.to(batch, {opacity: 1, stagger: {each: 0.25}}),
  //   onLeaveBack: (batch) => gsap.set(batch, {opacity: 0, stagger: {each: 0.25}}),
  //   scrub: true,
  // });


  gsap.set('[data-animate="fade-scale-reverce"]', {opacity: 0, scale: 0.5});

  const setParallax = gsap.timeline({paused: true});
  setParallax.to('[data-animate="fade-scale-reverce"]', {
    opacity: 1,
    scale: 1,
  });

  ScrollTrigger.create({
    trigger: '[data-animate="fade-scale-reverce"]',
    start: 'center bottom',
    end: 'bottom center',
    scrub: true,
    onUpdate: (self) => {
      setParallax.progress(self.progress).paused();
    },
  });


  gsap.set('[data-animate="transform-y"]', {y: 100});
  gsap.set('[data-animate="transform-y"]:last-child', {y: 50});

  const setAnimateY = gsap.timeline({paused: true});
  setAnimateY.to('[data-animate="transform-y"]', {
    y: 0,
  });

  ScrollTrigger.create({
    trigger: '[data-animate="transform-y"]',
    start: 'center bottom',
    end: 'bottom center',
    scrub: true,
    onUpdate: (self) => {
      setAnimateY.progress(self.progress).paused();
    },
  });


};

export {initAnimateBatch};
