//projects Filtering
import mixitup from 'mixitup';
import mixitupMultifilter from '../../mixitup-multifilter';

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