import { Flame, Star, Trophy, BookOpen, Zap, GraduationCap, Volume2, VolumeX } from 'lucide-react'
import { streakAlive, todayStr } from '../lib/storage.js'

export default function Home({ state, go, start, toggleMute }) {
  const alive = streakAlive(state)
  const doneToday = state.dailyDone === todayStr()
  const streak = alive ? state.streak : 0

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl sm:text-4xl font-bold text-fuchsia-700">Erne's English Quest ⭐</h1>
        <button onClick={toggleMute} aria-label="Sonido" className="p-3 rounded-full bg-white/70 shadow">
          {state.muted ? <VolumeX /> : <Volume2 />}
        </button>
      </header>

      <section className="grid grid-cols-3 gap-3 text-center">
        <Stat icon={<Flame className={`mx-auto ${streak ? 'text-orange-500 animate-flame' : 'text-slate-400'}`} size={44} />}
          big={streak} label={streak === 1 ? 'día de racha' : 'días de racha'} />
        <Stat icon={<Star className="mx-auto text-yellow-400 fill-yellow-300" size={44} />} big={state.stars} label="estrellas" />
        <Stat icon={<Zap className="mx-auto text-sky-500 fill-sky-300" size={44} />} big={state.xp} label="puntos XP" />
      </section>

      <p className="text-center text-xl font-semibold bg-white/70 rounded-2xl p-3 shadow">
        {streak > 0
          ? `🔥 ¡Racha de ${streak} ${streak === 1 ? 'día' : 'días'}, Erne!`
          : '¡Hola, Erne! Practicá hoy para encender tu llama 🔥'}
        {streak > 0 && !doneToday && <span className="block text-base font-normal text-slate-600">Hacé el Reto Diario para mantenerla viva.</span>}
        {doneToday && <span className="block text-base font-normal text-green-600">✅ ¡Reto Diario completado hoy!</span>}
      </p>

      <div className="space-y-4">
        <BigButton color="from-orange-400 to-red-500" icon={<Zap size={40} />} title="Reto Diario" sub="10 preguntas · 5 minutos" onClick={() => start('daily')} />
        <BigButton color="from-sky-400 to-indigo-500" icon={<BookOpen size={40} />} title="Práctica por Temas" sub="Repasá lo que más te cuesta" onClick={() => go('topics')} />
        <BigButton color="from-emerald-400 to-teal-500" icon={<GraduationCap size={40} />} title="Simulacro de Examen" sub="15 preguntas mixtas · sin tiempo" onClick={() => start('exam')} />
        <BigButton color="from-yellow-400 to-amber-500" icon={<Trophy size={40} />} title="Mis Medallas" sub={`${state.badges.length} desbloqueadas`} onClick={() => go('badges')} />
      </div>
    </div>
  )
}

const Stat = ({ icon, big, label }) => (
  <div className="bg-white/80 rounded-3xl p-3 shadow-lg">
    {icon}
    <div className="text-3xl font-bold">{big}</div>
    <div className="text-sm text-slate-600">{label}</div>
  </div>
)

const BigButton = ({ color, icon, title, sub, onClick }) => (
  <button onClick={onClick} className={`btn-big w-full bg-gradient-to-r ${color} text-white flex items-center gap-4 text-left`}>
    {icon}
    <span>
      <span className="block text-2xl">{title}</span>
      <span className="block text-base font-normal opacity-90">{sub}</span>
    </span>
  </button>
)
