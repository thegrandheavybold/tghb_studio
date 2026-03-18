import { gsap } from "./gsapSetup.js";

function initMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  if (!toggle || !menu) return;

  const links = menu.querySelectorAll(".menu__links li");
  const lang = menu.querySelectorAll(".lg_nav li");
  const infoBlocks = menu.querySelectorAll(".menu__info ul");

  const elements = [...links, ...lang, ...infoBlocks];

  // -----------------------------
  // INITIAL STATE
  // -----------------------------

  gsap.set(menu, {
    autoAlpha: 0
  });

  gsap.set(elements, {
    opacity: 0,
    y: 120
  });

  // -----------------------------
  // TIMELINE
  // -----------------------------

  const tl = gsap.timeline({
    paused: true,
    defaults: {
      ease: "expo.out"
    }
  });

  // Overlay Fade
  tl.to(menu, {
    autoAlpha: 1,
    duration: 0.8
  })

  // Main Links
  .to(links, {
    opacity: 1,
    y: 0,
    duration: 1.6,
    stagger: 0.18
  }, "-=0.4")

  // Language Switcher
  .to(lang, {
    opacity: 1,
    y: 0,
    duration: 1.4,
    stagger: 0.15
  }, "-=1.2")

  // Info Blocks
  .to(infoBlocks, {
    opacity: 1,
    y: 0,
    duration: 1.6,
    stagger: 0.2
  }, "-=1.1");

  tl.eventCallback("onReverseComplete", () => {
    document.body.classList.remove("menu-open");
  });


  // -----------------------------
  // TOGGLE LOGIC
  // -----------------------------

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";

    if (!isOpen) {
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("menu-open");
      tl.play(0);
    } else {
      toggle.setAttribute("aria-expanded", "false");
      tl.reverse();
    }
  });

}

document.addEventListener("DOMContentLoaded", initMenu);

export { initMenu };
