import { useState } from 'react'
import Home from './components/Home.jsx'
import Topics from './components/Topics.jsx'
import Quiz from './components/Quiz.jsx'
import Results from './components/Results.jsx'
import Badges from './components/Badges.jsx'
import { buildSession } from './lib/session.js'
import { load, save, applySession } from './lib/storage.js'

export default function App() {
  const [state, setState] = useState(load)
  const [screen, setScreen] = useState('home')
  const [session, setSession] = useState(null)
  const [end, setEnd] = useState(null) // { result, outcome }

  const update = (next) => { setState(next); save(next) }

  const start = (mode, topicId) => {
    setSession(buildSession(mode, topicId))
    setScreen('quiz')
  }

  const finish = (result) => {
    const outcome = applySession(state, result, session.mode)
    update(outcome.state)
    setEnd({ result, outcome })
    setScreen('results')
  }

  const home = () => { setScreen('home'); window.speechSynthesis?.cancel() }

  return (
    <>
      {screen === 'home' && <Home state={state} go={setScreen} start={start} toggleMute={() => update({ ...state, muted: !state.muted })} />}
      {screen === 'topics' && <Topics state={state} start={start} back={home} />}
      {screen === 'badges' && <Badges state={state} back={home} />}
      {screen === 'quiz' && <Quiz key={session.uid} session={session} muted={state.muted} onFinish={finish} onExit={home} />}
      {screen === 'results' && (
        <Results result={end.result} outcome={end.outcome} state={state} muted={state.muted}
          onHome={home} onAgain={() => start(session.mode, session.topicId)} />
      )}
    </>
  )
}
