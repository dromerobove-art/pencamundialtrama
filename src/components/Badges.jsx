import { ArrowLeft, Lock } from 'lucide-react'
import { BADGES } from '../lib/storage.js'

export default function Badges({ state, back }) {
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-4">
      <button onClick={back} className="flex items-center gap-2 text-lg font-semibold text-fuchsia-700"><ArrowLeft /> Volver</button>
      <h2 className="text-3xl font-bold">Mis Medallas 🏅</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {BADGES.map((b) => {
          const got = state.badges.includes(b.id)
          return (
            <div key={b.id} className={`rounded-3xl p-4 shadow-lg flex items-center gap-4 ${got ? 'bg-white' : 'bg-white/40'}`}>
              <div className={`text-5xl ${got ? '' : 'grayscale opacity-40'}`}>{got ? b.emoji : <Lock size={44} />}</div>
              <div>
                <div className="text-xl font-bold">{b.name}</div>
                <div className="text-sm text-slate-600">{b.desc}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
