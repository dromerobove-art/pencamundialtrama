import { ArrowLeft } from 'lucide-react'
import { TOPICS } from '../data/questions.js'

export default function Topics({ state, start, back }) {
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-4">
      <button onClick={back} className="flex items-center gap-2 text-lg font-semibold text-fuchsia-700"><ArrowLeft /> Volver</button>
      <h2 className="text-3xl font-bold">Elegí un tema 📚</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {TOPICS.map((t) => {
          const r = state.topics[t.id]
          return (
            <button key={t.id} onClick={() => start('topic', t.id)}
              className={`btn-big bg-gradient-to-br ${t.color} text-white text-left flex items-center gap-4`}>
              <span className="text-5xl">{t.emoji}</span>
              <span>
                <span className="block text-2xl">{t.title}</span>
                <span className="block text-base font-normal">{t.sub}</span>
                <span className="block text-sm font-normal opacity-90">{r ? `${r.correct}/${r.total} correctas` : 'Nuevo ✨'}</span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
