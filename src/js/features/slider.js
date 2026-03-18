import Swiper from 'swiper'
import { Pagination, Autoplay, EffectFade } from 'swiper/modules'

const baseConfig = {
  loop: true,
  slidesPerView: 1,
  watchSlidesProgress: true,
  preloadImages: false
}

function initSlider(selector, options = {}) {

  const elements = document.querySelectorAll(selector)

  if (!elements.length) return

  elements.forEach(el => {

    const config = {
      ...baseConfig,
      ...options
    }

    if (config.pagination) {
      config.pagination = {
        ...config.pagination,
        el: el.querySelector('.swiper-bullets')
      }
    }

    new Swiper(el, config)
  })
}

/* =========================
   HERO SLIDER
========================= */

if (document.querySelector('.hro__sldr')) {
  initSlider('.hro__sldr', {
    modules: [Autoplay, EffectFade],
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 800,
    autoplay: {
      delay: 8000
    }
  })
}

/* =========================
   STANDARD SLIDERS
========================= */

if (document.querySelector(`
  .qts_swiper,
  .ppl_sldr,
  .mintandthings_01__sldr,
  .mintandthings_02__sldr,
  .mintandthings_03__sldr,
  .mintandthings_04__sldr,
  .emporium_01__sldr,
  .emporium_02__sldr,
  .shyndirty_01__sldr,
  .shyndirty_02__sldr,
  .shyndirty_03__sldr,
  .snd_01__sldr,
  .snd_02__sldr,
  .snd_03__sldr,
  .snd_04__sldr,
  .snd_05__sldr,
  .gumbrecht_01__sldr,
  .gumbrecht_02__sldr,
  .gumbrecht_03__sldr,
  .gumbrecht_04__sldr,
  .gumbrecht_05__sldr,
  .lvr_01__sldr,
  .lvr_02__sldr
`)) {

  initSlider(`
    .qts_swiper,
    .ppl_sldr,
    .mintandthings_01__sldr,
    .mintandthings_02__sldr,
    .mintandthings_03__sldr,
    .mintandthings_04__sldr,
    .emporium_01__sldr,
    .emporium_02__sldr,
    .shyndirty_01__sldr,
    .shyndirty_02__sldr,
    .shyndirty_03__sldr,
    .snd_01__sldr,
    .snd_02__sldr,
    .snd_03__sldr,
    .snd_04__sldr,
    .snd_05__sldr,
    .gumbrecht_01__sldr,
    .gumbrecht_02__sldr,
    .gumbrecht_03__sldr,
    .gumbrecht_04__sldr,
    .gumbrecht_05__sldr,
    .lvr_01__sldr,
    .lvr_02__sldr
  `, {
    modules: [Pagination, Autoplay],
    speed: 800,
    autoplay: {
      delay: 2500
    },
    pagination: {
      clickable: true
    }
  })
}
