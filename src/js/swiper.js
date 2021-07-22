// import Swiper bundle with all modules installed
import Swiper from 'swiper/swiper-bundle.js';
const swiper = new Swiper('.qts_swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,
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
