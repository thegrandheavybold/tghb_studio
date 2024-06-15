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
        scrub: 2,
        end: "bottom 90%",
        markers: true
      }
    })
});
