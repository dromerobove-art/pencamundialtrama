import { Volume2 } from 'lucide-react'
import { speak, speechSupported } from '../lib/speech.js'

export default function SpeakButton({ text, big = false }) {
  if (!speechSupported()) return null
  return (
    <button
      type="button"
      onClick={() => speak(text)}
      aria-label="Escuchar"
      className={`btn-big bg-sky-500 text-white flex items-center gap-2 ${big ? 'text-2xl px-8 py-5' : 'px-4 py-2 text-base'}`}
    >
      <Volume2 size={big ? 36 : 22} /> {big ? 'Listen 🔊' : 'Listen'}
    </button>
  )
}
