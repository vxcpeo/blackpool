
<template>
  <div ref="root" class="toy-wordmark toy-wordmark-live" aria-hidden="true"><canvas ref="canvas"></canvas><span class="toy-wordmark-fallback">Agpool</span></div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const root = ref(null)
const canvas = ref(null)

let frameId = 0
let resizeObserver = null
let intersectionObserver = null
let hasGeometry = false
let imageLoaded = false
let teardown = () => {}

onMounted(() => {
  const host = root.value
  const surface = canvas.value
  const ctx = surface?.getContext('2d')
  if (!host || !surface || !ctx) return

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const dpr = Math.min(2, window.devicePixelRatio || 1)
  let width = 0
  let height = 0
  let cell = 6
  let particles = []
  const pointer = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4 }
  let revealStart = -1

  const mark = new Image()
  mark.src = '/mark.svg'
  mark.onload = () => {
    imageLoaded = true
    measure()
  }

  function measure() {
    width = host.clientWidth
    if (!host.isConnected || width < 2) return
    height = Math.max(80, Math.round(0.235 * width))
    cell = width < 600 ? 4 : 6
    surface.width = Math.round(width * dpr)
    surface.height = Math.round(height * dpr)
    surface.style.height = `${height}px`

    const cols = Math.ceil(width / cell)
    const rows = Math.ceil(height / cell)
    const offscreen = document.createElement('canvas')
    offscreen.width = cols
    offscreen.height = rows
    const off = offscreen.getContext('2d')
    if (!off) return
    off.clearRect(0, 0, cols, rows)

    const fontSize = 1.02 * rows
    off.font = `600 ${fontSize}px Inter, system-ui, sans-serif`
    off.textBaseline = 'alphabetic'
    off.fillStyle = '#fff'

    const label = 'Agpool'
    const textWidth = off.measureText(label).width
    const markSize = imageLoaded && width >= 600 ? 0.78 * fontSize : 0
    const gap = markSize ? 0.06 * fontSize : 0
    const contentWidth = textWidth + markSize + gap
    const scale = Math.min(1, (cols - 2) / contentWidth)

    off.save()
    off.translate((cols - contentWidth * scale) / 2, rows - 0.04 * rows)
    off.scale(scale, scale)
    if (markSize) off.drawImage(mark, 0, -markSize - 0.02 * fontSize, markSize, markSize)
    off.fillText(label, markSize + gap, 0)
    off.restore()

    const pixels = off.getImageData(0, 0, cols, rows).data
    particles = []
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const alpha = pixels[(y * cols + x) * 4 + 3] / 255
        if (alpha < 0.25) continue
        const px = (x + 0.5) * cell
        const py = (y + 0.5) * cell
        const shade = 0.35 + 0.65 * Math.min(1, y / (0.75 * rows))
        particles.push({
          ox: px,
          oy: py,
          r: 0.33 * cell * Math.min(1, alpha + 0.15),
          a: shade,
          vx: 0,
          vy: 0,
          dx: 0,
          dy: 0,
        })
      }
    }
    hasGeometry = true
  }

  function frame(now) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, width, height)
    const t = now / 1000
    pointer.x += (pointer.tx - pointer.x) * 0.22
    pointer.y += (pointer.ty - pointer.y) * 0.22
    const reveal = revealStart < 0 ? 0 : Math.min(1.4, (now - revealStart) / 1000)

    for (const p of particles) {
      const front = (reveal * (width + 160)) / 1.1 - 120
      let appear = reducedMotion ? 1 : Math.max(0, Math.min(1, (front - p.ox) / 140))
      appear = 1 - (1 - appear) * (1 - appear)
      if (appear <= 0) continue

      const dx = p.ox - pointer.x
      const dy = p.oy - pointer.y
      const distance = Math.hypot(dx, dy)
      let hover = 0
      if (distance < 120) {
        hover = 1 - distance / 120
        const force = 14 * (hover *= hover)
        p.vx += ((dx / (distance || 1)) * force - p.dx) * 0.18
        p.vy += ((dy / (distance || 1)) * force - p.dy) * 0.18
      }
      p.vx += -(0.12 * p.dx)
      p.vy += -(0.12 * p.dy)
      p.vx *= 0.78
      p.vy *= 0.78
      p.dx += p.vx
      p.dy += p.vy

      const shimmer = reducedMotion ? 1 : 0.82 + 0.18 * Math.sin(1.1 * t + 0.012 * p.ox + 0.02 * p.oy)
      const radius = p.r * appear * (1 + 0.9 * hover) * (0.92 + 0.08 * shimmer)
      ctx.globalAlpha = Math.min(1, p.a * shimmer + 0.6 * hover)
      ctx.fillStyle = hover > 0.35 ? '#ffffff' : '#EBECEC'
      ctx.beginPath()
      ctx.arc(p.ox + p.dx, p.oy + p.dy, radius, 0, 2 * Math.PI)
      ctx.fill()
    }
    ctx.globalAlpha = 1
    frameId = requestAnimationFrame(frame)
  }

  const onPointerMove = (event) => {
    const rect = surface.getBoundingClientRect()
    pointer.tx = event.clientX - rect.left
    pointer.ty = event.clientY - rect.top
  }
  const onPointerLeave = () => {
    pointer.tx = -1e4
    pointer.ty = -1e4
  }

  intersectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && revealStart < 0) {
          revealStart = performance.now()
          host.setAttribute('data-ready', '')
        }
      }
    },
    { threshold: 0.2 },
  )
  intersectionObserver.observe(host)

  host.addEventListener('pointermove', onPointerMove)
  host.addEventListener('pointerleave', onPointerLeave)

  resizeObserver = new ResizeObserver(() => {
    if (hasGeometry || imageLoaded) measure()
  })
  resizeObserver.observe(host)

  measure()
  if (document.fonts?.ready) document.fonts.ready.then(() => measure())
  frameId = requestAnimationFrame(frame)

  teardown = () => {
    cancelAnimationFrame(frameId)
    intersectionObserver?.disconnect()
    resizeObserver?.disconnect()
    host.removeEventListener('pointermove', onPointerMove)
    host.removeEventListener('pointerleave', onPointerLeave)
  }
})

onBeforeUnmount(() => teardown())
</script>
