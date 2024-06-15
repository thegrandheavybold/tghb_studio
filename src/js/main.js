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

//Import Swiper Sliders
import 'swiper_sliders.js'


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
      links = document.querySelectorAll("a,.menu-toggle,.fltrs li, button"),
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


//mixitup filtering
import 'mixitup-filtering.js'

//gsap magic
import 'gsap-triggers.js'