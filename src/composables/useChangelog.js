import { onBeforeUnmount, onMounted } from 'vue'

const AREAS = {
  All: 'all',
  Shield: 'shield',
  'Private send': 'send',
  Swap: 'swap',
  'Private bridge': 'bridge',
  Recovery: 'recovery',
  Analytics: 'analytics',
  CLI: 'cli',
  Docs: 'docs',
}

const PAGE_SIZE = 5

/**
 * Client-side filtering and pagination for the changelog, mirroring the
 * production page: five entries per page, filter tabs by area.
 */
export function useChangelog() {
  let cleanup = () => {}

  onMounted(() => {
    const wrap = document.querySelector('.leaf-sheet')
    if (!wrap) return
    const list = wrap.querySelector('.leaf-list')
    const entries = Array.from(list.querySelectorAll('.leaf-entry'))
    const filters = Array.from(wrap.querySelectorAll('.leaf-filter button'))
    const pager = wrap.querySelector('.leaf-pager')
    const numbers = Array.from(pager.querySelectorAll('.leaf-page-nums button'))
    const newer = pager.querySelector('.leaf-page-step[aria-label="Newer entries"]')
    const older = pager.querySelector('.leaf-page-step[aria-label="Older entries"]')
    const empty = wrap.querySelector('.leaf-empty')

    let area = 'all'
    let page = 1

    const apply = () => {
      const filtered = entries.filter(
        (entry) => area === 'all' || (entry.dataset.areas || '').split(/\s+/).includes(area),
      )
      const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
      if (page > totalPages) page = totalPages

      entries.forEach((entry) => {
        entry.hidden = true
        entry.removeAttribute('data-first')
      })
      const start = (page - 1) * PAGE_SIZE
      filtered.slice(start, start + PAGE_SIZE).forEach((entry, index) => {
        entry.hidden = false
        if (index === 0) entry.setAttribute('data-first', '')
      })

      list.toggleAttribute('data-empty', filtered.length === 0)
      if (empty) empty.hidden = filtered.length !== 0

      filters.forEach((button) => {
        const on = (AREAS[button.textContent.trim()] || 'all') === area
        button.classList.toggle('leaf-on', on)
        button.setAttribute('aria-selected', on ? 'true' : 'false')
      })

      numbers.forEach((button, index) => {
        const value = index + 1
        button.hidden = value > totalPages
        button.classList.toggle('leaf-on', value === page)
        if (value === page) button.setAttribute('aria-current', 'page')
        else button.removeAttribute('aria-current')
      })

      newer.disabled = page <= 1
      older.disabled = page >= totalPages
    }

    const onFilterClick = (event) => {
      const button = event.currentTarget
      area = AREAS[button.textContent.trim()] || 'all'
      page = 1
      apply()
    }

    const onPageClick = (event) => {
      page = numbers.indexOf(event.currentTarget) + 1
      apply()
      list.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const onNewer = () => {
      if (page <= 1) return
      page -= 1
      apply()
    }

    const onOlder = () => {
      page += 1
      apply()
    }

    filters.forEach((button) => button.addEventListener('click', onFilterClick))
    numbers.forEach((button) => button.addEventListener('click', onPageClick))
    newer.addEventListener('click', onNewer)
    older.addEventListener('click', onOlder)

    apply()

    cleanup = () => {
      filters.forEach((button) => button.removeEventListener('click', onFilterClick))
      numbers.forEach((button) => button.removeEventListener('click', onPageClick))
      newer.removeEventListener('click', onNewer)
      older.removeEventListener('click', onOlder)
    }
  })

  onBeforeUnmount(() => cleanup())
}
