//import Swiper bundle with all modules installed
import Swiper, { Lazy, Pagination, Autoplay, EffectFade } from 'swiper';

const qtsSwiper = new Swiper('.qts_swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,
  watchSlidesProgress: true,

  modules: [Pagination, Autoplay],

  speed: 800,
  autoplay: {
    delay: 8500
  },
  // If we need pagination
  pagination: {
    el: '.swiper-bullets',
    type: 'bullets',
    clickable: true
  },
  renderBullet: function (index, className) {
    return '<span class="' + className + '">' + (index + 1) + '</span>';
  }

});

const pplSldr = new Swiper('.ppl_sldr', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  preloadImages: false,
  lazy: true,
  slidesPerView: 1,
  watchSlidesProgress: true,

  modules: [Pagination, Autoplay, Lazy],

  lazy: {
    loadPrevNext: true
   },

  speed: 800,
  autoplay: {
    delay: 8000
  },

  pagination: {
    el: '.swiper-bullets',
    type: 'bullets',
    clickable: true
  },

  renderBullet: function (index, className) {
    return '<span class="' + className + '">' + (index + 1) + '</span>';
  }

});

const hroSldr = new Swiper('.hro__sldr', {
  // Optional parameters
  loop: true,
  preloadImages: false,
  lazy: true,
  slidesPerView: 1,
  watchSlidesProgress: true,

  modules: [Autoplay, Lazy, EffectFade],

  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },

  lazy: {
      loadPrevNext: true
     },

  speed: 800,
  autoplay: {
    delay: 8000
  },

  observer: true,
  observeParents: true

});
const mintSldr1 = new Swiper('.mintandthings_01__sldr', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  preloadImages: false,
  lazy: true,
  slidesPerView: 1,
  watchSlidesProgress: true,

  modules: [Pagination, Autoplay, Lazy],

 lazy: {
    loadPrevNext: true
   },

  pagination: {
    el: '.swiper-bullets',
    type: 'bullets',
    clickable: true
  },

  renderBullet: function (index, className) {
    return '<span class="' + className + '">' + (index + 1) + '</span>';
  }

});
const mintSldr2 = new Swiper('.mintandthings_02__sldr', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  preloadImages: false,
  lazy: true,
  slidesPerView: 1,
  watchSlidesProgress: true,

  modules: [Pagination, Autoplay, Lazy],

  lazy: {
    loadPrevNext: true
   },

  pagination: {
    el: '.swiper-bullets',
    type: 'bullets',
    clickable: true
  },

  renderBullet: function (index, className) {
    return '<span class="' + className + '">' + (index + 1) + '</span>';
  }

});
const mintSldr3 = new Swiper('.mintandthings_03__sldr', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  preloadImages: false,
  lazy: true,
  slidesPerView: 1,
  watchSlidesProgress: true,

  modules: [Pagination, Autoplay, Lazy],

  lazy: {
    loadPrevNext: true
   },

  pagination: {
    el: '.swiper-bullets',
    type: 'bullets',
    clickable: true
  },

  renderBullet: function (index, className) {
    return '<span class="' + className + '">' + (index + 1) + '</span>';
  }

});
const mintSldr4 = new Swiper('.mintandthings_04__sldr', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  preloadImages: false,
  lazy: true,
  slidesPerView: 1,
  watchSlidesProgress: true,

  modules: [Pagination, Autoplay, Lazy],

  lazy: {
    loadPrevNext: true
   },

  pagination: {
    el: '.swiper-bullets',
    type: 'bullets',
    clickable: true
  },

  renderBullet: function (index, className) {
    return '<span class="' + className + '">' + (index + 1) + '</span>';
  }

});

const emporiumSldr1 = new Swiper('.emporium_01__sldr', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  preloadImages: false,
  lazy: true,
  slidesPerView: 1,
  watchSlidesProgress: true,

  modules: [Pagination, Autoplay, Lazy],

  lazy: {
    loadPrevNext: true
   },

  pagination: {
    el: '.swiper-bullets',
    type: 'bullets',
    clickable: true
  },

  renderBullet: function (index, className) {
    return '<span class="' + className + '">' + (index + 1) + '</span>';
  }

});

const emporiumSldr2 = new Swiper('.emporium_02__sldr', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  preloadImages: false,
  lazy: true,
  slidesPerView: 1,
  watchSlidesProgress: true,

  modules: [Pagination, Autoplay, Lazy],

  lazy: {
    loadPrevNext: true
   },

  pagination: {
    el: '.swiper-bullets',
    type: 'bullets',
    clickable: true
  },

  renderBullet: function (index, className) {
    return '<span class="' + className + '">' + (index + 1) + '</span>';
  }

});

const shyndirtySldr1 = new Swiper('.shyndirty_01__sldr', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  preloadImages: false,
  lazy: true,
  slidesPerView: 1,
  watchSlidesProgress: true,

  modules: [Pagination, Autoplay, Lazy],

  lazy: {
    loadPrevNext: true
   },
   speed: 800,
   autoplay: {
     delay: 8000
   },
  pagination: {
    el: '.swiper-bullets',
    type: 'bullets',
    clickable: true
  },

  renderBullet: function (index, className) {
    return '<span class="' + className + '">' + (index + 1) + '</span>';
  }

});

const shyndirtySldr2 = new Swiper('.shyndirty_02__sldr', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  preloadImages: false,
  lazy: true,
  slidesPerView: 1,
  watchSlidesProgress: true,

  modules: [Pagination, Autoplay, Lazy],

  lazy: {
    loadPrevNext: true
   },
   speed: 800,
   autoplay: {
     delay: 8200
   },
  pagination: {
    el: '.swiper-bullets',
    type: 'bullets',
    clickable: true
  },

  renderBullet: function (index, className) {
    return '<span class="' + className + '">' + (index + 1) + '</span>';
  }

});

const shyndirtySldr3 = new Swiper('.shyndirty_03__sldr', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  preloadImages: false,
  lazy: true,
  slidesPerView: 1,
  watchSlidesProgress: true,

  modules: [Pagination, Autoplay, Lazy],

  lazy: {
    loadPrevNext: true
   },
   speed: 800,
   autoplay: {
     delay: 7800
   },
  pagination: {
    el: '.swiper-bullets',
    type: 'bullets',
    clickable: true
  },

  renderBullet: function (index, className) {
    return '<span class="' + className + '">' + (index + 1) + '</span>';
  }

});
