import { creatureForStars, creatureStages, nextCreature } from '../data/creature'
import type { Progress } from '../storage/progress'
import { CreatureImage } from '../components/CreatureAvatar'

export function CreatureScreen({ progress }: { progress: Progress }) {
  const current = creatureForStars(progress.totalStars)
  const next = nextCreature(progress.totalStars)

  return (
    <div>
      <div className="center-screen" style={{ paddingTop: 8, paddingBottom: 8 }}>
        <CreatureImage icon={current.icon} color={current.color} alt={current.name} size={180} />
        <h1>{current.name}</h1>
        <p className="note">
          אָסַפְתָּ {progress.totalStars} כּוֹכָבִים ⭐
          {next && (
            <>
              <br />
              עוֹד {next.starsRequired - progress.totalStars} כְּדֵי לְהִתְפַּתֵּחַ לְ"{next.name}"
            </>
          )}
        </p>
      </div>

      <div className="section-title">שְׁלָבֵי הַהִתְפַּתְּחוּת</div>
      <div className="stage-grid">
        {creatureStages.map((c) => {
          const reached = progress.totalStars >= c.starsRequired
          return (
            <div key={c.level} className={`stage-card ${reached ? '' : 'locked'}`}>
              <CreatureImage icon={c.icon} color={c.color} alt={c.name} size={72} />
              <span className="name">{c.name}</span>
              <span className="sub">{c.starsRequired} ⭐</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
