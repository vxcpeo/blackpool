import { onBeforeUnmount, onMounted } from 'vue'
import { AGENT_PROMPT } from '../data/agentPrompt'

/**
 * Clipboard behaviour shared by the copy controls across the content pages:
 * the notice bar, the token contract row and the agent hand-off buttons.
 */
export function useCopyControls() {
  const timers = new WeakMap()

  const write = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      try {
        document.execCommand('copy')
      } catch {}
      textarea.remove()
    }
  }

  const flashLabel = (element, label) => {
    const previous = element.textContent
    element.textContent = label
    clearTimeout(timers.get(element))
    timers.set(
      element,
      setTimeout(() => {
        element.textContent = previous
      }, 1500),
    )
  }

  const onClick = async (event) => {
    const target = event.target instanceof Element ? event.target : null
    if (!target) return

    const noticeCopy = target.closest('.bp-ca')
    if (noticeCopy) {
      if (noticeCopy.closest('.lp')) return
      const address = noticeCopy.querySelector('.bp-ca-full')?.textContent?.trim()
      if (!address) return
      await write(address)
      const label = noticeCopy.querySelector('.bp-ca-act')
      if (label) flashLabel(label, 'Copied')
      return
    }

    const tokenCopy = target.closest('.tk-addr button')
    if (tokenCopy) {
      const code = tokenCopy.parentElement?.querySelector('code')?.textContent?.trim()
      if (!code) return
      await write(code)
      flashLabel(tokenCopy, 'Copied')
      return
    }

    const codeCopy = target.closest('button.hl-copy')
    if (codeCopy) {
      const code = codeCopy.parentElement?.querySelector('pre code')?.textContent
      if (!code) return
      await write(code)
      flashLabel(codeCopy, 'Copied')
      return
    }

    const agentButton = target.closest('button.ag-btn')
    if (agentButton) {
      const label = agentButton.textContent.trim()
      if (label === 'Copy for your agent') {
        await write(AGENT_PROMPT)
        flashLabel(agentButton, 'Copied')
      } else if (label === 'Copy URL') {
        await write(`${window.location.origin}/AGENTS.md`)
        flashLabel(agentButton, 'Copied')
      }
    }
  }

  onMounted(() => document.addEventListener('click', onClick))
  onBeforeUnmount(() => document.removeEventListener('click', onClick))
}
