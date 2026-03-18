import '../sass/style.sass'

// Core
import './core/base.js'
import './core/menu.js'

const onDomReady = (callback) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback, { once: true })
    return
  }

  callback()
}

// Cursor nur Desktop
const isTouch = matchMedia('(hover: none)').matches
if (!isTouch) {
  import('./core/cursor.js')
}

// Scroll animations
if (document.querySelector('[data-animate]')) {
  import('./core/animations.js')
}

// Parallax separat
if (document.querySelector('[data-parallax]')) {
  import('./core/parallax.js')
}

// Slider
if (document.querySelector('.swiper')) {
  import('./features/slider.js')
}

// Mixitup
if (document.querySelector('[data-logic]')) {
  import('./features/mixitup-filtering.js')
}

// Page Transition
import { initDoubleWipeEntry } from './core/doubleWipeEntry.js'
import { initDoubleWipeTransition } from './core/doubleWipeTransition.js'

onDomReady(() => {
  initDoubleWipeEntry()
  initDoubleWipeTransition()
})

// NNC Video Hover: only load on pages that actually render NNC preview videos
if (document.querySelector('.nnc-video-preview')) {
  import('./utils/nncVideoHover.js').then(({ initNncVideoHover }) => {
    onDomReady(() => {
      initNncVideoHover()
    })
  })
}

// NNC Lightbox: only load on pages with NNC triggers/lightbox markup
if (document.querySelector('.nnc-trigger') || document.getElementById('nncLightbox')) {
  import('./features/nncLightbox.js').then(({ initNncLightbox }) => {
    onDomReady(() => {
      initNncLightbox()
    })
  })
}

// NNC sticky chrome: single blur surface for header + filter once filter is sticky
if (document.documentElement.id === 'nevernotcooking' && document.querySelector('.nnc-filter-shell')) {
  import('./features/nncStickyChrome.js').then(({ initNncStickyChrome }) => {
    onDomReady(() => {
      initNncStickyChrome()
    })
  })
}
