import { gsap } from './gsapSetup.js'

export function initPageEntry() {

  const cloneContainer = document.getElementById('transition-clone')

  if (!cloneContainer || !cloneContainer.firstChild) return

  const clone = cloneContainer.firstChild

  // Warten bis alles geladen ist
  window.addEventListener('load', () => {

    gsap.to(clone, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => {
        cloneContainer.innerHTML = ''
      }
    })

  })

}
