import { gsap } from './gsapSetup.js'

const STORAGE_KEY = 'tghb_double_wipe'

export function initDoubleWipeTransition() {

  const back = document.querySelector('.wipe-back')
  const front = document.querySelector('.wipe-front')

  if (!back || !front) return

  const links = document.querySelectorAll('a[href]')

  links.forEach((link) => {

    link.addEventListener('click', (e) => {

      if (e.defaultPrevented) return
      if (link.matches('.nnc-trigger, [data-no-transition]')) return

      const href = link.getAttribute('href')

      if (
        !href ||
        href === 'undefined' ||
        href === 'null' ||
        href.startsWith('#') ||
        href.startsWith('javascript:') ||
        link.target === '_blank' ||
        e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
      ) return

      let targetUrl
      try {
        targetUrl = new URL(href, window.location.href)
      } catch {
        return
      }

      if (targetUrl.origin !== window.location.origin) return

      e.preventDefault()

      // ALWAYS start from bottom
      gsap.set(back, { yPercent: 130 })
      gsap.set(front, { yPercent: 100 })

      sessionStorage.setItem(STORAGE_KEY, '1')

      const tl = gsap.timeline({
        onComplete: () => window.location.href = targetUrl.href
      })

      tl.to(back, {
        yPercent: 0,
        duration: 1.2,
        ease: 'power2.inOut'
      })

      tl.to(front, {
        yPercent: 0,
        duration: 1,
        ease: 'power4.inOut'
      }, '-=0.9')

    })

  })
}
