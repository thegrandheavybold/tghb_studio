import { gsap } from './gsapSetup.js'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function initScrollAnimations() {

  const elements = document.querySelectorAll('[data-animate]');
  if (!elements.length) return;

  elements.forEach(el => {

    const rawType = el.dataset.animate || "";
    const type = rawType.trim().split(/\s+/)[0];

    // ===== DEFAULTS =====
    const defaults = {
      distance: 60,
      start: "top 96%",
      end: "top 75%",
      scrub: 2,
      ease: "none",
      stagger: 0.12
    };

    const distance = parseFloat(el.dataset.distance) || defaults.distance;
    const start = el.dataset.start || defaults.start;
    const end = el.dataset.end || defaults.end;
    const delay = el.dataset.delay
      ? parseFloat(el.dataset.delay)
      : 0;
    const scrubAttr = el.dataset.scrub;
    let scrub = defaults.scrub;

    if (typeof scrubAttr !== "undefined") {
      if (scrubAttr === "false" || scrubAttr === "0") {
        scrub = false;
      } else if (scrubAttr === "true") {
        scrub = true;
      } else {
        const parsed = parseFloat(scrubAttr);
        scrub = Number.isNaN(parsed) ? defaults.scrub : parsed;
      }
    }
    const ease = el.dataset.ease || defaults.ease;
    const once = el.hasAttribute("data-once");
    const group = el.dataset.group;

    // =========================
    // GROUP MODE (STAGGER)
    // =========================
    if (group) {

      const children = el.querySelectorAll(group);
      if (!children.length) return;

      gsap.fromTo(children,
        { opacity: 0, y: distance },
        {
          opacity: 1,
          y: 0,
          stagger: defaults.stagger,
          delay,
          ease,
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub,
            once,
            markers: false
          }
        }
      );

      return;
    }

    // =========================
    // NORMAL MODE
    // =========================

    let fromVars = { opacity: 0 };
    let toVars   = { opacity: 1 };

    if (type === "fade-up") {
      fromVars = { opacity: 0, y: distance };
      toVars   = { opacity: 1, y: 0 };
    }

    if (type === "scale-in") {
      fromVars = { opacity: 0, scale: 0.95 };
      toVars   = { opacity: 1, scale: 1 };
    }

    gsap.fromTo(el,
      fromVars,
      {
        ...toVars,
        delay,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub,
          once,
          markers: false
        }
      }
    );

  });

}

initScrollAnimations();

window.addEventListener('tghb:filter-updated', () => {
  ScrollTrigger.refresh(true)
})
