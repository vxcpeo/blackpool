import { onBeforeUnmount, onMounted } from 'vue'

/**
 * The status snapshot is captured at build time. "Check again" replays the
 * check animation and refreshes the "Checked …" timestamp locally.
 */
export function useStatusRefresh() {
  let timer
  let teardown = () => {}

  onMounted(() => {
    const button = document.querySelector('.st-refresh')
    if (!button) return
    const meta = document.querySelector('.st-meta')
    const label = button.textContent

    const onClick = () => {
      if (button.disabled) return
      button.disabled = true
      button.textContent = 'Checking…'
      clearTimeout(timer)
      timer = setTimeout(() => {
        button.disabled = false
        button.textContent = label
        if (meta) {
          const stamp = new Date().toISOString().slice(0, 16).replace('T', ' ')
          meta.textContent = `Checked ${stamp} UTC from your browser. If the API is down, funds stay safe in the pools and on burners; private operations resume when it is back.`
        }
      }, 1200)
    }

    button.addEventListener('click', onClick)
    teardown = () => {
      button.removeEventListener('click', onClick)
      clearTimeout(timer)
    }
  })

  onBeforeUnmount(() => teardown())
}
