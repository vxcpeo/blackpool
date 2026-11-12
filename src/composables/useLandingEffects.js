import { onBeforeUnmount, onMounted } from 'vue'

/**
 * Page-level motion wiring, ported from the original landing bundle:
 *  - `anim-ready` turns on the entrance animations,
 *  - `data-inview` is applied once an element with `data-anim` scrolls into view,
 *  - the sticker bricks replay their demo (`data-play="a" | "b"`) on hover and on a timer,
 *  - a pointer-position custom property drives the card glow.
 */
export function useLandingEffects(root) {
  let teardown = () => {}

  onMounted(() => {
    const page = root.value
    if (!page) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      page.querySelectorAll('[data-anim]').forEach((node) => node.setAttribute('data-inview', ''))
      return
    }

    page.classList.add('anim-ready')

    const playCounts = new WeakMap()
    const visibleCards = new Set()
    let rotation = 0

    const playCard = (card) => {
      const count = (playCounts.get(card) ?? 0) + 1
      playCounts.set(card, count)
      card.setAttribute('data-play', count % 2 ? 'a' : 'b')
    }

    const trackPointer = (event) => {
      const card = event.currentTarget
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--sx', `${event.clientX - rect.left}px`)
      card.style.setProperty('--sy', `${event.clientY - rect.top}px`)
    }

    const cards = Array.from(page.querySelectorAll('.toy-brick'))
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => playCard(card))
      card.addEventListener('mousemove', trackPointer)
    })

    const bentoObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visibleCards.add(entry.target)
          else visibleCards.delete(entry.target)
        }
      },
      { threshold: 0.5 },
    )
    cards.forEach((card) => bentoObserver.observe(card))

    const bentoInterval = setInterval(() => {
      const candidates = cards.filter((card) => visibleCards.has(card) && !card.matches(':hover'))
      if (!candidates.length) return
      playCard(candidates[rotation % candidates.length])
      rotation += 1
    }, 2600)

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-inview', '')
          revealObserver.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    page.querySelectorAll('[data-anim]').forEach((node) => revealObserver.observe(node))

    teardown = () => {
      bentoObserver.disconnect()
      revealObserver.disconnect()
      clearInterval(bentoInterval)
      cards.forEach((card) => card.removeEventListener('mousemove', trackPointer))
    }
  })

  onBeforeUnmount(() => teardown())
}
