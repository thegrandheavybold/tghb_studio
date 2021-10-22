import 'navigation.js'
import 'lazy.js'

// import Swiper bundle with all modules installed
import Swiper from 'swiper/swiper-bundle.js';
const qts_swiper = new Swiper('.qts_swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,
  //autoHeight: true,
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

const ppl_sldr = new Swiper('.ppl_sldr', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,
  //autoHeight: true,
  speed: 800,
  autoplay: {
   delay: 8000
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

const hro__sldr = new Swiper('.hro__sldr', {
  // Optional parameters
  direction: 'fade',
  loop: true,
  slidesPerView: 1,
  //autoHeight: true,
  speed: 800,
  autoplay: {
   delay: 8000
  },

});

import $ from 'jquery'
  $(document).ready(function()
  {

});
