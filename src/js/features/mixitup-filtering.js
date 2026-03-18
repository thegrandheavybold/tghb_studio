import mixitup from 'mixitup'
import mixitupMultifilter from 'mixitup-multifilter/dist/mixitup-multifilter.js'

mixitup.use(mixitupMultifilter)

function updateFilterCounts(filterList, container, itemSelector) {
  if (!filterList || !container) return

  const filters = filterList.querySelectorAll('li[data-filter]')
  const total = container.querySelectorAll(itemSelector).length

  filters.forEach((filterEl) => {
    const counterEl = filterEl.querySelector('sub[id]')
    if (!counterEl) return

    const filter = filterEl.getAttribute('data-filter')
    if (!filter || filter === 'all') {
      counterEl.textContent = String(total)
      return
    }

    const selector = `${itemSelector}${filter}`
    counterEl.textContent = String(container.querySelectorAll(selector).length)
  })
}

function refreshAnimationsAfterFilter() {
  // Let DOM/layout settle after MixItUp writes inline styles, then refresh GSAP observers.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent('tghb:filter-updated'))
    })
  })
}

function fixHiddenAnimatedTargets(state) {
  if (!state || !Array.isArray(state.show)) return

  state.show.forEach((el) => {
    if (!el || !el.hasAttribute('data-animate')) return

    const styles = window.getComputedStyle(el)
    if (styles.opacity === '0') {
      el.style.removeProperty('opacity')
    }
  })
}

var containerEl = document.querySelector('.prjcts');
var nncContainerEl = document.querySelector('.nnc-feed');
var projectsFilterList = document.querySelector('.fltrs:not(.nnc-filter)');
var nncFilterList = document.querySelector('.nnc-filter');

if (containerEl) {
  mixitup('.prjcts', {
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
    },
    callbacks: {
      onMixEnd: (state) => {
        fixHiddenAnimatedTargets(state)
        refreshAnimationsAfterFilter()
      }
    }
  });

  updateFilterCounts(projectsFilterList, containerEl, '.prjct')
}

if (nncContainerEl) {
  mixitup(nncContainerEl, {
    selectors: {
      target: '.nnc-item'
    },
    animation: {
      effects: 'fade',
      easing: 'ease-in-out'
    },
    multifilter: {
      enable: true
    },
    controls: {
      toggleLogic: 'and'
    },
    callbacks: {
      onMixEnd: (state) => {
        fixHiddenAnimatedTargets(state)
        refreshAnimationsAfterFilter()
      }
    }
  });

  updateFilterCounts(nncFilterList, nncContainerEl, '.nnc-item')
}
