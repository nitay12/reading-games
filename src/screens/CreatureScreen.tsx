import { creatureForStars, creatureStages, nextCreature } from '../data/creature'
import type { Progress } from '../storage/progress'
import { Pic } from '../components/Pic'

export function CreatureScreen({ progress }: { progress: Progress }) {
  const current = creatureForStars(progress.totalStars)
  const next = nextCreature(progress.totalStars)

  return (
    <div>
      <div className="center-screen" style={{ paddingTop: 8, paddingBottom: 8 }}>
        <div
          className="creature-disc"
          style={{ width: 160, height: 160, background: `${current.color}22` }}
        >
          <Pic file={current.icon} color={current.color} size={104} />
        </div>
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
              <div
                className="creature-disc"
                style={{ width: 64, height: 64, background: `${c.color}22` }}
              >
                <Pic file={c.icon} color={c.color} size={40} />
              </div>
              <span className="name">{c.name}</span>
              <span className="sub">{c.starsRequired} ⭐</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
