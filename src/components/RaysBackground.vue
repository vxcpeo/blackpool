
<template>
  <canvas ref="canvas" aria-hidden="true"></canvas>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const canvas = ref(null)

const VERTEX_SHADER = `attribute vec2 position; varying vec2 vUv;
void main(){ vUv = position*0.5+0.5; gl_Position = vec4(position,0.,1.); }`

const FRAGMENT_SHADER = `precision highp float;
uniform float iTime; uniform vec2 iResolution;
uniform vec2 rayPos; uniform vec2 rayDir; uniform vec3 raysColor;
uniform float raysSpeed; uniform float lightSpread; uniform float rayLength;
uniform float fadeDistance; uniform float saturation;
uniform vec2 mousePos; uniform float mouseInfluence;
varying vec2 vUv;
float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed){
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);
  float spreadFactor = pow(max(cosAngle, 0.0), 1.0 / max(lightSpread, 0.001));
  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
  float baseStrength = clamp(
    (0.45 + 0.15 * sin(cosAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-cosAngle * seedB + iTime * speed)), 0.0, 1.0);
  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor;
}
void main(){
  vec2 fragCoord = vUv * iResolution;
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
  vec2 finalRayDir = rayDir;
  if (mouseInfluence > 0.0){
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }
  vec4 rays1 = vec4(1.0) * rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349, 1.5 * raysSpeed);
  vec4 rays2 = vec4(1.0) * rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234, 1.1 * raysSpeed);
  vec4 fragColor = rays1 * 0.5 + rays2 * 0.4;
  float brightness = 1.0 - (coord.y / iResolution.y);
  fragColor.x *= 0.1 + brightness * 0.8;
  fragColor.y *= 0.3 + brightness * 0.6;
  fragColor.z *= 0.5 + brightness * 0.5;
  if (saturation != 1.0){
    float gray = dot(fragColor.rgb, vec3(0.299,0.587,0.114));
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
  }
  fragColor.rgb *= raysColor;
  gl_FragColor = fragColor;
}`

let cleanup = () => {}

onMounted(() => {
  const surface = canvas.value
  if (!surface) return
  const gl = surface.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: false })
  if (!gl) return

  const compile = (type, source) => {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    return shader
  }

  const program = gl.createProgram()
  gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX_SHADER))
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER))
  gl.linkProgram(program)
  gl.useProgram(program)

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const position = gl.getAttribLocation(program, 'position')
  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

  const raysColor = [168 / 255, 185 / 255, 202 / 255]
  gl.uniform3f(gl.getUniformLocation(program, 'raysColor'), raysColor[0], raysColor[1], raysColor[2])
  gl.uniform1f(gl.getUniformLocation(program, 'raysSpeed'), 1)
  gl.uniform1f(gl.getUniformLocation(program, 'lightSpread'), 0.7)
  gl.uniform1f(gl.getUniformLocation(program, 'rayLength'), 3)
  gl.uniform1f(gl.getUniformLocation(program, 'fadeDistance'), 1)
  gl.uniform1f(gl.getUniformLocation(program, 'saturation'), 1)
  gl.uniform1f(gl.getUniformLocation(program, 'mouseInfluence'), 0.1)

  const timeLocation = gl.getUniformLocation(program, 'iTime')
  const resolutionLocation = gl.getUniformLocation(program, 'iResolution')
  const rayPosLocation = gl.getUniformLocation(program, 'rayPos')
  const rayDirLocation = gl.getUniformLocation(program, 'rayDir')
  const mousePosLocation = gl.getUniformLocation(program, 'mousePos')

  let mouseX = 0.5
  let mouseY = 0.5
  const onMouseMove = (event) => {
    mouseX = event.clientX / window.innerWidth
    mouseY = event.clientY / window.innerHeight
  }
  window.addEventListener('mousemove', onMouseMove)

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    const width = surface.clientWidth * ratio
    const height = surface.clientHeight * ratio
    surface.width = width
    surface.height = height
    gl.viewport(0, 0, width, height)
    gl.uniform2f(resolutionLocation, width, height)
    gl.uniform2f(rayPosLocation, 0.5 * width, -0.2 * height)
    gl.uniform2f(rayDirLocation, 0, 1)
  }
  resize()
  window.addEventListener('resize', resize)

  let frame = 0
  const render = (timestamp) => {
    frame = requestAnimationFrame(render)
    gl.uniform1f(timeLocation, 0.001 * timestamp)
    gl.uniform2f(mousePosLocation, mouseX, mouseY)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }
  frame = requestAnimationFrame(render)

  cleanup = () => {
    cancelAnimationFrame(frame)
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('resize', resize)
    const loseContext = gl.getExtension('WEBGL_lose_context')
    if (loseContext) loseContext.loseContext()
  }
})

onBeforeUnmount(() => cleanup())
</script>
