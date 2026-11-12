import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

/**
 * The original site is a multi-page Next.js app. We keep the same anchors in the
 * markup and let the router take over same-origin navigations, which preserves the
 * exact DOM that the design was built against.
 */
export function useLinkInterception() {
  const router = useRouter()

  const onClick = (event) => {
    if (event.defaultPrevented || event.button !== 0) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    const anchor = event.target instanceof Element ? event.target.closest('a') : null
    if (!anchor) return

    const href = anchor.getAttribute('href')
    if (!href) return
    if (anchor.hasAttribute('download')) return
    if (anchor.getAttribute('target') && anchor.getAttribute('target') !== '_self') return

    if (href.startsWith('#')) {
      const id = decodeURIComponent(href.slice(1))
      const el = document.getElementById(id)
      if (!el) return
      event.preventDefault()
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      history.replaceState(null, '', href)
      return
    }

    if (!href.startsWith('/')) return
    if (href.startsWith('//')) return

    event.preventDefault()
    router.push(href)
  }

  onMounted(() => document.addEventListener('click', onClick))
  onUnmounted(() => document.removeEventListener('click', onClick))
}
