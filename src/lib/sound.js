let ctx
const audio = () => {
  try { return (ctx ||= new (window.AudioContext || window.webkitAudioContext)()) } catch { return null }
}

function tone(freq, start, dur, type = 'sine', gain = 0.15) {
  const c = audio()
  if (!c) return
  const o = c.createOscillator()
  const g = c.createGain()
  o.type = type
  o.frequency.value = freq
  g.gain.setValueAtTime(gain, c.currentTime + start)
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + dur)
  o.connect(g).connect(c.destination)
  o.start(c.currentTime + start)
  o.stop(c.currentTime + start + dur)
}

export const sounds = {
  correct: () => { tone(523, 0, 0.12); tone(659, 0.1, 0.12); tone(784, 0.2, 0.2) },
  wrong: () => { tone(220, 0, 0.25, 'triangle'); tone(180, 0.15, 0.3, 'triangle') },
  combo: () => [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, i * 0.08, 0.18, 'square', 0.08)),
  win: () => [523, 659, 784, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.12, 0.2)),
}
