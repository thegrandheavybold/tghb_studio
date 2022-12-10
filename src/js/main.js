//JS Support check and touch screen check
var html = document.querySelector("html");
  html.classList.remove("no-js");
  html.classList.add("js");

function is_touch_device() {
  return !!('ontouchstart' in window);
}

  if(is_touch_device()) {
    html.classList.add("touch");
  }
  else {
    html.classList.remove("touch");
  }


//Import Navigation
import 'navigation.js'

//Import Lazy Load Image
import 'lazy.js'


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

//Scroll & Parallax Function
window.addEventListener('scroll', function(e) {

  const target = document.querySelector('.parallax');

  var scrolled = window.pageYOffset;
  var rate = scrolled * .35;

    if (target){
      target.style.transform = 'translate3D(0px, '+rate+'px, 0px)';
    }

});

//Fade in when in view Function
const inViewport = (entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle("is_inview", entry.isIntersecting);
  });
};

const Obs = new IntersectionObserver(inViewport);
const obsOptions = {
  threshold: 1
};

// Attach observer to every [data-inview] element:
const ELs_inViewport = document.querySelectorAll('[data]');
ELs_inViewport.forEach(EL => {
  Obs.observe(EL, obsOptions);
});


//Custom Cursor
const cursor = document.querySelector(".c-cursor"),
      cursorDot = document.querySelector(".c-cursor__dot"),
      links = document.querySelectorAll("a,.menu-toggle,.fltrs li"),
      teaser = document.querySelector(".frnt_prjcts"),
      nvrtd = document.querySelectorAll(".c-nvrtd"),
      ttl = document.querySelectorAll(".ttl").innerHTML,
      prjcts = document.querySelectorAll(".prjct"),
      msg = document.querySelector(".c-cursor__msg"),
      drag = document.querySelectorAll(".swiper-slide");

window.addEventListener('mousemove', e => {
  cursor.setAttribute("style", "transform: matrix(1, 0, 0, 1, "+e.clientX+", "+e.clientY+")")
  });
    if (links.length)
      for (var n = 0; n < links.length; n++)
          (links[n].onmouseenter = function () {
            cursor.classList.add("c-cursor__hovering");
          }),
            (links[n].onmouseleave = function () {
              cursor.classList.remove("c-cursor__hovering");
            });

    if (nvrtd.length)
      for (var n = 0; n < nvrtd.length; n++)
          (nvrtd[n].onmouseenter = function () {
            cursorDot.classList.add("c-cursor__inverted");
          }),
            (nvrtd[n].onmouseleave = function () {
              cursorDot.classList.remove("c-cursor__inverted");
            });

    if (drag.length)
      for (var n = 0; n < drag.length; n++)
          (drag[n].onmouseenter = function () {
            cursor.classList.add("c-cursor__drag");
          }),
            (drag[n].onmouseleave = function () {
              cursor.classList.remove("c-cursor__drag");
            });

    prjcts.forEach(prjct => {
      prjct.addEventListener('mouseover', function () {
        msg.classList.add("visible")
        msg.innerHTML = prjct.querySelector('.ttl').innerHTML
      })
      prjct.addEventListener('mouseout', function () {
        msg.classList.remove("visible")
      })
    })


//projects Filtering
import mixitup from 'mixitup';
import mixitupMultifilter from 'mixitup-multifilter';

mixitup.use(mixitupMultifilter);

var containerEl = document.querySelector('.prjcts');
var mixer;

if (containerEl) {
  mixer = mixitup('.prjcts', {
    classNames: {
      block: 'prjcts',
      elementFilter: 'fltr',
      elementContainer: 'prjcts'
      },
    animation: {
        effects: 'fade scale(0.7)',
        easing: 'ease-in-out'
    },
    multifilter: {
        enable: true
      },
    controls: {
      toggleLogic: 'and'
    }
  });
}

const digiAll = document.querySelectorAll(".digital").length;
const postsAll = document.querySelectorAll(".prjct").length;
const interiorAll = document.querySelectorAll(".interior").length;
const identityAll = document.querySelectorAll(".identity").length;
const communicationyAll = document.querySelectorAll(".communication").length;

const allSpan = document.getElementById('all-prjcts');
const digiSpan = document.getElementById('dgtl-prjcts');
const interiorSpan = document.getElementById('ntrr-prjcts');
const identitySpan = document.getElementById('dntty-prjcts');
const communicationSpan = document.getElementById('cmmnctn-prjcts');

if(allSpan) {
  allSpan.textContent = postsAll;
}
if(digiSpan) {
  digiSpan.textContent = digiAll;
}
if(interiorSpan) {
  interiorSpan.textContent = interiorAll;
}
if(identitySpan) {
  identitySpan.textContent = identityAll;
}
if(communicationSpan) {
  communicationSpan.textContent = communicationyAll;
}


//gsap Magic
import  gsap  from 'gsap';
import  ScrollTrigger  from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

//gsap outofview imdb list items
const oov = gsap.utils.toArray('.oov');
oov.forEach(oov => {
  gsap.from(oov, {
  y: 150,
  opacity: 0,
    scrollTrigger: {
      trigger: oov,
      marker: true,
      scrub: 2,
      end: "bottom 90%"
    }
  })
});
