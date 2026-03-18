import { gsap } from './gsapSetup.js'

export function initWipeEntry() {

  const wipe = document.getElementById('wipe-layer')
  if (!wipe) return

  window.addEventListener('load', () => {

    gsap.to(wipe, {
      y: '-100%',
      duration: 1.2,
      ease: 'power4.inOut'
    })

  })

}
