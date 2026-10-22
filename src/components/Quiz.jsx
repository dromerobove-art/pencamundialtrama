import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { X, ArrowRight, Flame } from 'lucide-react'
import SpeakButton from './SpeakButton.jsx'
import { speak } from '../lib/speech.js'
import { sounds } from '../lib/sound.js'

const CHEERS = ['¡Increíble, Erne! 🌟', '¡Estás encendida! ⚡', '¡Qué crack! 🚀', '¡Imparable! 🔥', '¡Wow, sos una campeona! 🏆']
const GOOD = ['¡Muy bien! 🎉', '¡Excelente! ⭐', '¡Perfecto! 👏', 'Great job! 💪']
const pick = (a) => a[Math.floor(Math.random() * a.length)]

export default function Quiz({ session, muted, onFinish, onExit }) {
  const { questions } = session
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState(null)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [points, setPoints] = useState(0)
  const [log, setLog] = useState([])
  const [msg, setMsg] = useState('')

  const q = questions[idx]
  const answered = picked !== null
  const isRight = picked === q.answer
  const spokenText = q.type === 'listen' ? q.speak : q.prompt

  // Los ejercicios de escucha leen la palabra al aparecer.
  useEffect(() => {
    if (q.type === 'listen') speak(q.speak)
  }, [idx]) // eslint-disable-line react-hooks/exhaustive-deps

  const choose = (opt) => {
    if (answered) return
    setPicked(opt)
    const ok = opt === q.answer
    const nextCombo = ok ? combo + 1 : 0
    setLog((l) => [...l, { topic: q.topic, ok }])
    setCombo(nextCombo)
    if (ok) {
      setMaxCombo((m) => Math.max(m, nextCombo))
      setPoints((p) => p + 10 + (nextCombo >= 2 ? Math.min(nextCombo, 5) * 2 : 0))
      if (nextCombo > 0 && nextCombo % 5 === 0) {
        setMsg(pick(CHEERS))
        if (!muted) sounds.combo()
        confetti({ particleCount: 140, spread: 90, origin: { y: 0.6 } })
      } else {
        setMsg(pick(GOOD))
        if (!muted) sounds.correct()
        if (nextCombo === 3) confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } })
      }
    } else {
      setMsg('')
      if (!muted) sounds.wrong()
    }
  }

  const next = () => {
    if (idx + 1 < questions.length) {
      setIdx(idx + 1)
      setPicked(null)
      return
    }
    const perTopic = {}
    log.forEach((l) => {
      const t = (perTopic[l.topic] ||= { correct: 0, total: 0 })
      t.total++
      if (l.ok) t.correct++
    })
    onFinish({ correct: log.filter((l) => l.ok).length, total: log.length, points, maxCombo, perTopic })
  }

  const comboLabel = combo >= 2 ? `${Math.min(combo, 5)}x Combo!` : 'Combo'

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={onExit} aria-label="Salir" className="p-2 rounded-full bg-white/70 shadow"><X /></button>
        <div className="flex-1 h-4 bg-white/70 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-400 transition-all" style={{ width: `${(idx / questions.length) * 100}%` }} />
        </div>
        <span className="font-bold">{idx + 1}/{questions.length}</span>
      </div>

      <div className="flex items-center gap-3 bg-white/70 rounded-2xl p-2 px-3">
        <Flame className={combo >= 2 ? 'text-orange-500 animate-flame' : 'text-slate-400'} />
        <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 transition-all"
            style={{ width: `${(Math.min(combo, 5) / 5) * 100}%` }} />
        </div>
        <span className={`font-bold ${combo >= 2 ? 'text-orange-600' : 'text-slate-500'}`}>{comboLabel}</span>
        <span className="font-bold text-sky-600">⚡{points}</span>
      </div>

      <div key={idx} className="bg-white rounded-3xl shadow-xl p-6 text-center space-y-4 animate-pop">
        {q.emoji && <div className="text-7xl leading-tight">{q.emoji}</div>}
        {q.type === 'listen'
          ? <SpeakButton text={spokenText} big />
          : (
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <h2 className="text-3xl font-bold">{q.prompt}</h2>
              <SpeakButton text={spokenText} />
            </div>
          )}
        {q.type === 'fill' && <p className="text-slate-500">Elegí la palabra que falta</p>}
        {q.type === 'tf' && <p className="text-slate-500">¿Verdadero o falso?</p>}
        {q.type === 'listen' && <p className="text-slate-500">Escuchá y elegí lo correcto</p>}
      </div>

      <div className={`grid gap-3 ${q.type === 'tf' ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}>
        {q.options.map((opt) => {
          let cls = 'bg-white hover:bg-sky-50'
          if (answered && opt === q.answer) cls = 'bg-green-400 text-white'
          else if (answered && opt === picked) cls = 'bg-red-400 text-white animate-shake'
          else if (answered) cls = 'bg-white/60 opacity-60'
          const tfColor = !answered && q.type === 'tf' ? (opt === 'True' ? 'bg-green-100' : 'bg-red-100') : ''
          return (
            <button key={opt} disabled={answered} onClick={() => choose(opt)}
              className={`btn-big ${tfColor || cls} ${answered ? cls : ''} ${q.options.every((o) => o.length <= 2 || /^\p{Extended_Pictographic}/u.test(o)) ? 'text-5xl' : ''}`}>
              {q.type === 'tf' ? (opt === 'True' ? '✅ True' : '❌ False') : opt}
            </button>
          )
        })}
      </div>

      {answered && (
        <div className={`rounded-3xl p-4 text-center space-y-3 animate-pop ${isRight ? 'bg-green-100' : 'bg-red-100'}`}>
          <p className="text-2xl font-bold">
            {isRight ? msg : `Casi... La respuesta es: ${q.type === 'tf' ? q.answer : q.answer}`}
          </p>
          {!isRight && <p>¡Tranquila, la próxima sale! 💪</p>}
          {q.tip && <p className="text-slate-600">{q.tip}</p>}
          <button onClick={next} className="btn-big bg-fuchsia-500 text-white inline-flex items-center gap-2">
            {idx + 1 < questions.length ? 'Siguiente' : 'Ver resultados'} <ArrowRight />
          </button>
        </div>
      )}
    </div>
  )
}
