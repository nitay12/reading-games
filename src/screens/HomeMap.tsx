import { creatureForStars, nextCreature } from '../data/creature'
import { NIKUD_INFO, COMPLEXITY_INFO } from '../data/types'
import { stageStatuses } from '../logic/progression'
import type { Progress } from '../storage/progress'
import { CreatureAvatar } from '../components/CreatureAvatar'

export function HomeMap({
  progress,
  onPlay,
  onCreature,
}: {
  progress: Progress
  onPlay: (stageId: string) => void
  onCreature: () => void
}) {
  const statuses = stageStatuses(progress)
  const creature = creatureForStars(progress.totalStars)
  const next = nextCreature(progress.totalStars)
  const toNext = next ? next.starsRequired - progress.totalStars : 0
  const span = next ? next.starsRequired - creature.starsRequired : 1
  const pct = next
    ? Math.min(100, Math.round(((progress.totalStars - creature.starsRequired) / span) * 100))
    : 100

  return (
    <div>
      <button
        className="creature-banner"
        onClick={onCreature}
        style={{ width: '100%', textAlign: 'start' }}
      >
        <CreatureAvatar totalStars={progress.totalStars} size={76} />
        <div className="meta">
          <h2>{creature.name}</h2>
          <p>
            {next
              ? `עוֹד ${toNext} כּוֹכָבִים לְשָׁלָב הַבָּא ✨`
              : 'הִגַּעְתָּ לַשִּׂיא! 🎉'}
          </p>
          <div className="bar">
            <span style={{ width: `${pct}%` }} />
          </div>
        </div>
      </button>

      <div className="section-title">בְּחַר מִשְׂחָק</div>
      <div className="stage-grid">
        {statuses.map(({ stage, stars, completed, unlocked }) => (
          <button
            key={stage.id}
            className={`stage-card ${unlocked ? '' : 'locked'}`}
            disabled={!unlocked}
            onClick={() => unlocked && onPlay(stage.id)}
          >
            {completed && <span className="done-badge">✓</span>}
            <span className="vowel">{NIKUD_INFO[stage.nikud].sound}</span>
            <span className="name">{stage.title}</span>
            <span className="sub">{COMPLEXITY_INFO[stage.complexity]}</span>
            {unlocked ? (
              <span className="stage-stars">
                {'★'.repeat(Math.min(stars, stage.starsToComplete))}
                {'☆'.repeat(Math.max(0, stage.starsToComplete - stars))}
              </span>
            ) : (
              <span className="lock">🔒</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
