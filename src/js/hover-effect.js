/// Projekt Hover Effect Displacement
import hoverEffect from 'hover-effect'
  var pegasusClub = new hoverEffect({
    parent: document.getElementById('pegasus-club'),
    intensity: 0.3,
    image1: '/assets/img/tghb.studio_pegasus-club__feat_01.jpg',
    image2: '/assets/img/tghb.studio_pegasus-club__feat_02.jpg',
    displacementImage: '/assets/img/dis__06.jpg'
  });

  var emporium = new hoverEffect({
    parent: document.getElementById('emporium'),
    intensity: 0.2,
    angle1 : Math.PI / 9,
    angle2 : -Math.PI / 9 * 3,
    image1: '/assets/img/tghb.studio_emporium__16.jpg',
    image2: '/assets/img/tghb.studio_emporium__05.jpg',
    displacementImage: '/assets/img/dis__04.jpg'
  });

  var kbw = new hoverEffect({
    parent: document.getElementById('kbw'),
    intensity: 0.2,
    angle1 : Math.PI / 3,
    angle2 : -Math.PI / 3 * 3,
    image1: '/assets/img/tghb.studio_kbw__feat_01.gif',
    image2: '/assets/img/tghb.studio_kbw__feat_02.jpg',
    displacementImage: '/assets/img/dis__07.jpg'
  });

  var mintandthings = new hoverEffect({
    parent: document.getElementById('mintandthings'),
    intensity: 0.2,
    image1: '/assets/img/tghb.studio_mintandthings__27.svg',
    image2: '/assets/img/tghb.studio_mintandthings__07.jpg',
    displacementImage: '/assets/img/dis__03.jpg'
  });
