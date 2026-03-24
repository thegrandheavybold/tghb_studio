//Custom Cursor
import { gsap } from "./gsapSetup.js";

export function initCursor() {

  const cursor = document.querySelector('.c-cursor');
  const cursorDot = document.querySelector('.c-cursor__dot');
  const msg = document.querySelector('.c-cursor__msg');

  if (!cursor || !cursorDot) return;

  const renderCursorMessage = (title, options = {}) => {
    const { light = false } = options;
    const safeTitle = (title || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

    msg.classList.toggle('c-cursor__msg--light', light);
    msg.innerHTML = `
      <span class="c-cursor__headline">${safeTitle}</span>
      <svg class="teaser_btn">
        <use xlink:href="#teaser_btn"></use>
      </svg>
    `;
  };

  // Smooth movement
  window.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.2,
      ease: "power3.out"
    });
  });

  // Hover states
  document.querySelectorAll('a, button, .menu-toggle, .fltrs li')
    .forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('c-cursor__hovering');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('c-cursor__hovering');
      });
    });

  // Inverted elements
  document.querySelectorAll('.c-nvrtd')
    .forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('c-cursor__inverted');
      });
      el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('c-cursor__inverted');
      });
    });

  // Drag state (Swiper)
  document.querySelectorAll('.swiper-slide')
    .forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('c-cursor__drag');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('c-cursor__drag');
      });
    });

  // Project title preview
  document.querySelectorAll('.prjct')
    .forEach(prjct => {

      const title = prjct.querySelector('.ttl');

      if (!title || !msg) return;

      prjct.addEventListener('mouseenter', () => {
        msg.classList.add('visible');
        msg.classList.remove('c-cursor__msg--light');
        msg.innerHTML = title.innerHTML;
      });

      prjct.addEventListener('mouseleave', () => {
        msg.classList.remove('visible');
      });

    });

  // Generic title preview
  document.querySelectorAll('[data-cursor-title]')
    .forEach(el => {
      const cursorTitle = (el.dataset.cursorTitle || '').trim();

      if (!cursorTitle || !msg) return;

      el.addEventListener('mouseenter', () => {
        msg.classList.add('visible');
        renderCursorMessage(cursorTitle, { light: true });
      });

      el.addEventListener('mouseleave', () => {
        msg.classList.remove('visible');
        msg.classList.remove('c-cursor__msg--light');
      });
    });
}

initCursor();
