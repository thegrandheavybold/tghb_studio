import { gsap } from './gsapSetup.js'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function initParallax() {

  const elements = document.querySelectorAll('[data-parallax]');
  if (!elements.length) return;

  elements.forEach(el => {

    const factor = parseFloat(el.dataset.parallax) || 0.3;

    const movement = () => el.offsetHeight * factor;

    gsap.to(el, {
      y: movement,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: () => `+=${el.offsetHeight}`,
        scrub: true
      }
    });

  });

}

initParallax();
