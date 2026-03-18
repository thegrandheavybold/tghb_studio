import { gsap } from './gsapSetup.js'

const STORAGE_KEY = 'tghb_double_wipe'

export function initDoubleWipeEntry() {

  const back = document.querySelector('.wipe-back')
  const front = document.querySelector('.wipe-front')

  if (!back || !front) return

  const shouldPlay = sessionStorage.getItem(STORAGE_KEY) === '1'

  if (!shouldPlay) {
    // normal page load
    gsap.set(back, { yPercent: 130 })
    gsap.set(front, { yPercent: 100 })
    return
  }

  sessionStorage.removeItem(STORAGE_KEY)

  // exit left them at 0
  gsap.set(back, { yPercent: 0 })
  gsap.set(front, { yPercent: 0 })

  const tl = gsap.timeline({
    onComplete: () => {
      // RESET to bottom so next exit always starts identical
      gsap.set(back, { yPercent: 130 })
      gsap.set(front, { yPercent: 100 })
    }
  })

  tl.to(front, {
    yPercent: -100,
    duration: 1.2,
    ease: 'power3.out'
  })

  tl.to(back, {
    yPercent: -130,
    duration: 1.4,
    ease: 'power2.out'
  }, '-=0.9')
}