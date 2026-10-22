import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { Star } from 'lucide-react'
import { sounds } from '../lib/sound.js'

export default function Results({ result, outcome, state, muted, onHome, onAgain }) {
  const { stars, pct, newBadges } = outcome

  useEffect(() => {
    if (stars >= 2 || newBadges.length) {
      if (!muted) sounds.win()
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const title = pct >= 90 ? '¡Fantástico, Erne! 🌟' : pct >= 70 ? '¡Muy bien, Erne! 🎉' : pct >= 50 ? '¡Buen intento! 💪' : '¡Sigamos practicando! 📚'

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 space-y-5 text-center">
      <h2 className="text-4xl font-bold text-fuchsia-700">{title}</h2>
      <div className="flex justify-center gap-2">
        {[1, 2, 3].map((n) => (
          <Star key={n} size={64} className={n <= stars ? 'text-yellow-400 fill-yellow-300 animate-pop' : 'text-slate-300'} />
        ))}
      </div>
      <div className="bg-white rounded-3xl shadow-xl p-5 space-y-1 text-xl">
        <p><b>{result.correct}</b> de <b>{result.total}</b> correctas ({pct}%)</p>
        <p>⚡ <b>+{result.points}</b> XP · Mejor combo: <b>{result.maxCombo}x</b></p>
        <p>🔥 Racha: <b>{state.streak}</b> {state.streak === 1 ? 'día' : 'días'}</p>
      </div>
      {newBadges.map((b) => (
        <div key={b.id} className="bg-yellow-100 border-4 border-yellow-300 rounded-3xl p-4 animate-pop">
          <div className="text-6xl">{b.emoji}</div>
          <p className="text-xl font-bold">¡Nueva medalla: {b.name}!</p>
        </div>
      ))}
      <div className="flex gap-3 justify-center flex-wrap">
        <button onClick={onAgain} className="btn-big bg-emerald-500 text-white">Otra vez 🔁</button>
        <button onClick={onHome} className="btn-big bg-sky-500 text-white">Inicio 🏠</button>
      </div>
    </div>
  )
}
