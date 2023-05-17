// Swiper 7.4.1
// import './vendor/swiper';
import './vendor/focus-visible-polyfill';
import './vendor/splitting';
import splitting from './vendor/splitting';

import {gsap} from './vendor/gsap.min.js';
import {ScrollTrigger} from './vendor/scroll-trigger.min.js';


gsap.registerPlugin(ScrollTrigger);
splitting({by: 'lines'});
