export function initNncStickyChrome() {
  const html = document.documentElement
  const shell = document.querySelector('.nnc-filter-shell')

  if (!shell || html.id !== 'nevernotcooking') return

  const className = 'nnc-filter-is-stuck'

  const update = () => {
    const topPx = parseFloat(getComputedStyle(shell).top) || 0
    const rectTop = shell.getBoundingClientRect().top
    const isStuck = window.scrollY > 0 && rectTop <= topPx + 0.5

    html.classList.toggle(className, isStuck)
  }

  update()
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
}
