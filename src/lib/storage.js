import { TOPICS } from '../data/questions.js'

const KEY = 'erne-english-quest-v1'

export const todayStr = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

const yesterdayStr = () => {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return todayStr(d)
}

const fresh = () => ({
  xp: 0, stars: 0, streak: 0, lastDay: null, dailyDone: null,
  bestCombo: 0, examBest: 0, sessions: 0, muted: false,
  topics: {}, badges: [],
})

export function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY))
    return { ...fresh(), ...s }
  } catch {
    return fresh()
  }
}

export function save(state) {
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* sin almacenamiento */ }
}

// La racha cuenta como "viva" si practicó hoy o ayer.
export const streakAlive = (s) => s.lastDay === todayStr() || s.lastDay === yesterdayStr()

export const BADGES = [
  ...TOPICS.map((t) => ({
    id: `topic-${t.id}`, emoji: t.emoji, name: t.badge,
    desc: `Acertá 6 preguntas de ${t.title} (${t.sub})`,
    check: (s) => (s.topics[t.id]?.correct || 0) >= 6,
  })),
  { id: 'streak3', emoji: '🔥', name: 'Llama Encendida', desc: 'Practicá 3 días seguidos', check: (s) => s.streak >= 3 },
  { id: 'streak5', emoji: '🌋', name: 'Volcán de Inglés', desc: 'Practicá 5 días seguidos', check: (s) => s.streak >= 5 },
  { id: 'combo5', emoji: '⚡', name: 'Combo Master', desc: 'Lográ 5 respuestas correctas seguidas', check: (s) => s.bestCombo >= 5 },
  { id: 'exam', emoji: '🏆', name: 'Campeona del Examen', desc: 'Sacá 80% o más en un Simulacro', check: (s) => s.examBest >= 80 },
]

// Aplica el resultado de una sesión y devuelve { state, newBadges }.
export function applySession(prev, result, mode) {
  const s = { ...prev, topics: { ...prev.topics } }
  const today = todayStr()

  if (s.lastDay !== today) {
    s.streak = s.lastDay === yesterdayStr() ? s.streak + 1 : 1
    s.lastDay = today
  }
  if (mode === 'daily') s.dailyDone = today

  const pct = Math.round((result.correct / result.total) * 100)
  const stars = pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 50 ? 1 : 0
  s.xp += result.points
  s.stars += stars
  s.bestCombo = Math.max(s.bestCombo, result.maxCombo)
  s.sessions += 1
  if (mode === 'exam') s.examBest = Math.max(s.examBest, pct)

  for (const [id, r] of Object.entries(result.perTopic)) {
    const cur = s.topics[id] || { correct: 0, total: 0 }
    s.topics[id] = { correct: cur.correct + r.correct, total: cur.total + r.total }
  }

  const newBadges = BADGES.filter((b) => !s.badges.includes(b.id) && b.check(s))
  s.badges = [...s.badges, ...newBadges.map((b) => b.id)]
  return { state: s, newBadges, stars, pct }
}
