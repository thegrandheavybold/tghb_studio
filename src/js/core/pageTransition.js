import { gsap } from './gsapSetup.js'

import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initNextProjectTransition() {

  const link = document.querySelector('.next-project')
  if (!link) return

  link.addEventListener('click', e => {
    e.preventDefault()

    const url = link.href
    const hero = link.querySelector('.pg_hro')

    runTransition(hero, url)
  })

}

function runTransition(hero, url) {

  ScrollTrigger.getAll().forEach(t => t.kill())
  document.body.style.overflow = 'hidden'

  const rect = hero.getBoundingClientRect()

  const cloneContainer = document.getElementById('transition-clone')

  const clone = hero.cloneNode(true)

  cloneContainer.innerHTML = ''
  cloneContainer.appendChild(clone)

  gsap.set(clone, {
    position: 'absolute',
    top: rect.top,
    left: 0,
    width: '100%',
    height: rect.height
  })

  gsap.to(clone, {
    y: -rect.top,
    height: '100vh',
    duration: 1.4,
    ease: 'power4.inOut',
    onComplete: () => {
      window.location.href = url
    }
  })

}
