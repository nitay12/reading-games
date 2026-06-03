import { useEffect, useState } from 'react'
import './styles/app.css'
import {
  awardStars,
  loadProgress,
  resetProgress,
  saveProgress,
  type Progress,
} from './storage/progress'
import { curriculum } from './data/curriculum'
import { HomeMap } from './screens/HomeMap'
import { GameScreen } from './screens/GameScreen'
import { CreatureScreen } from './screens/CreatureScreen'
import { SettingsScreen } from './screens/SettingsScreen'
import { OnboardingScreen } from './screens/OnboardingScreen'
import { CreatureAvatar } from './components/CreatureAvatar'

type Screen =
  | { name: 'home' }
  | { name: 'game'; stageId: string }
  | { name: 'creature' }
  | { name: 'settings' }
  | { name: 'onboarding' }

export default function App() {
  const [progress, setProgress] = useState<Progress>(() => loadProgress())
  const [screen, setScreen] = useState<Screen>(() =>
    loadProgress().onboardingSeen ? { name: 'home' } : { name: 'onboarding' },
  )
  const [nonce, setNonce] = useState(0)

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  function handleCorrect(stageId: string) {
    const stage = curriculum.stages.find((s) => s.id === stageId)
    if (!stage) return
    setProgress((p) => awardStars(p, stageId, stage.starsToComplete, 1).progress)
  }

  function finishOnboarding() {
    setProgress((p) => ({ ...p, onboardingSeen: true }))
    setScreen({ name: 'home' })
  }

  if (screen.name === 'onboarding') {
    return (
      <div className="app">
        <OnboardingScreen onFinish={finishOnboarding} />
      </div>
    )
  }

  return (
    <div className="app">
      <header className="topbar">
        <button
          className="brand"
          onClick={() => setScreen({ name: 'creature' })}
          style={{ background: 'none' }}
        >
          <CreatureAvatar totalStars={progress.totalStars} size={42} />
          <span>חֲבֵרִי הַקָּסוּם</span>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="stars-badge">⭐ {progress.totalStars}</span>
          {screen.name !== 'home' && (
            <button
              className="icon-btn"
              onClick={() => setScreen({ name: 'home' })}
              aria-label="בית"
            >
              🏠
            </button>
          )}
          {screen.name !== 'settings' && (
            <button
              className="icon-btn"
              onClick={() => setScreen({ name: 'settings' })}
              aria-label="הגדרות"
            >
              ⚙️
            </button>
          )}
        </div>
      </header>

      {screen.name === 'home' && (
        <HomeMap
          progress={progress}
          onPlay={(stageId) => setScreen({ name: 'game', stageId })}
          onCreature={() => setScreen({ name: 'creature' })}
        />
      )}

      {screen.name === 'game' && (
        <GameScreen
          key={`${screen.stageId}:${nonce}`}
          stageId={screen.stageId}
          progress={progress}
          onCorrect={handleCorrect}
          onExit={() => setScreen({ name: 'home' })}
          onReplay={() => setNonce((n) => n + 1)}
        />
      )}

      {screen.name === 'creature' && <CreatureScreen progress={progress} />}

      {screen.name === 'settings' && (
        <SettingsScreen
          progress={progress}
          onChange={(settings) => setProgress((p) => ({ ...p, settings }))}
          onReset={() => setProgress(resetProgress())}
          onShowOnboarding={() => setScreen({ name: 'onboarding' })}
        />
      )}
    </div>
  )
}
