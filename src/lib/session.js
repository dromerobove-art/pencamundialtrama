import { QUESTIONS } from '../data/questions.js'

export const shuffle = (arr) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const prepare = (q) => ({ ...q, options: q.type === 'tf' ? q.options : shuffle(q.options) })

// Reparte las preguntas de forma pareja entre temas (round-robin).
function mixed(n) {
  const byTopic = {}
  shuffle(QUESTIONS).forEach((q) => (byTopic[q.topic] ||= []).push(q))
  const queues = shuffle(Object.values(byTopic))
  const out = []
  while (out.length < n && queues.some((q) => q.length)) {
    for (const q of queues) if (q.length && out.length < n) out.push(q.pop())
  }
  return shuffle(out)
}

export function buildSession(mode, topicId) {
  let qs
  if (mode === 'daily') qs = mixed(10)
  else if (mode === 'exam') qs = mixed(15)
  else qs = shuffle(QUESTIONS.filter((q) => q.topic === topicId)).slice(0, 8)
  return { uid: Date.now(), mode, topicId, questions: qs.map(prepare) }
}
