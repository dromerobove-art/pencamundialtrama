let voice = null

function pickVoice() {
  const voices = window.speechSynthesis?.getVoices?.() || []
  voice =
    voices.find((v) => /en-GB/i.test(v.lang)) ||
    voices.find((v) => /^en/i.test(v.lang)) ||
    null
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  pickVoice()
  window.speechSynthesis.onvoiceschanged = pickVoice
}

export const speechSupported = () => typeof window !== 'undefined' && 'speechSynthesis' in window

// Lee texto en inglés. Quita emojis y reemplaza los huecos "____" por una pausa.
export function speak(text, rate = 0.85) {
  if (!speechSupported()) return
  const clean = text
    .replace(/_{2,}/g, '... ')
    .replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}\u{2B06}\u{2B07}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
  if (!clean) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(clean)
  u.lang = 'en-GB'
  u.rate = rate
  u.pitch = 1.1
  if (voice) u.voice = voice
  window.speechSynthesis.speak(u)
}
