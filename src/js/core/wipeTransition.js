import { gsap } from './gsapSetup.js'

export function initWipeTransition() {

  const links = document.querySelectorAll('.next-project')
  if (!links.length) return

  links.forEach(link => {

    link.addEventListener('click', e => {
      e.preventDefault()

      const url = link.href
      const wipe = document.getElementById('wipe-layer')

      gsap.to(wipe, {
        y: 0,
        duration: 1.2,
        ease: 'power4.inOut',
        onComplete: () => {
          window.location.href = url
        }
      })

    })

  })

}
