import { useEffect, useRef } from 'react'
import { creatureForStars, nextCreature } from '../data/creature'
import { stageStatuses } from '../logic/progression'
import type { Progress } from '../storage/progress'
import { CreatureAvatar } from '../components/CreatureAvatar'

const MAP_HEIGHT = 1440

// [xPercent, yPx] — stage 0 at bottom, stage 11 at top
const POSITIONS: [number, number][] = [
  [50, 1380],
  [20, 1260],
  [78, 1140],
  [20, 1020],
  [78,  900],
  [50,  780],
  [20,  660],
  [78,  540],
  [50,  420],
  [20,  300],
  [78,  180],
  [50,   60],
]

const DECORATIONS: { x: number; y: number; icon: string }[] = [
  { x: 88, y: 1320, icon: '🌲' },
  { x: 6,  y: 1190, icon: '🌸' },
  { x: 91, y: 1060, icon: '🌲' },
  { x: 7,  y:  840, icon: '⭐' },
  { x: 92, y:  700, icon: '🌼' },
  { x: 5,  y:  500, icon: '🌈' },
  { x: 89, y:  360, icon: '🌲' },
  { x: 7,  y:  200, icon: '☁️' },
  { x: 91, y:  110, icon: '🌟' },
]

function buildPath(pts: [number, number][]): string {
  if (pts.length < 2) return ''
  let d = `M ${pts[0][0]} ${pts[0][1]}`
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1]
    const [x1, y1] = pts[i]
    const midY = (y0 + y1) / 2
    d += ` C ${x0} ${midY}, ${x1} ${midY}, ${x1} ${y1}`
  }
  return d
}

export function HomeMap({
  progress,
  onPlay,
  onCreature: _onCreature,
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

  const mapRef = useRef<HTMLDivElement>(null)

  const currentIdx = (() => {
    const first = statuses.findIndex((s) => s.unlocked && !s.completed)
    return first >= 0 ? first : statuses.length - 1
  })()

  const [charX, charY] = POSITIONS[Math.min(currentIdx, POSITIONS.length - 1)]

  useEffect(() => {
    const el = mapRef.current
    if (!el) return
    const scrollTarget = charY - el.clientHeight / 2
    el.scrollTo({ top: Math.max(0, scrollTarget), behavior: 'smooth' })
  }, [currentIdx])

  const pathD = buildPath(POSITIONS)

  return (
    <div>
      {/* creature progress strip */}
      <div className="map-creature-strip">
        <CreatureAvatar totalStars={progress.totalStars} size={44} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 800, fontSize: '0.92rem', marginBottom: 4 }}>
            {creature.name}
          </div>
          <div className="bar">
            <span style={{ width: `${pct}%` }} />
          </div>
        </div>
        <span style={{ fontSize: '0.82rem', color: 'var(--muted)', fontWeight: 700, whiteSpace: 'nowrap' }}>
          {toNext > 0 ? `עוד ${toNext} ⭐` : '🎉 שיא!'}
        </span>
      </div>

      {/* scrollable map */}
      <div className="game-map-wrapper" ref={mapRef}>
        <div className="game-map" style={{ height: MAP_HEIGHT }}>

          {/* SVG path */}
          <svg
            className="map-path-svg"
            viewBox={`0 0 100 ${MAP_HEIGHT}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* shadow stripe */}
            <path
              d={pathD}
              fill="none"
              stroke="rgba(0,0,0,0.13)"
              strokeWidth="7"
              strokeLinecap="round"
              transform="translate(0.5,4)"
              vectorEffect="non-scaling-stroke"
            />
            {/* main road */}
            <path
              d={pathD}
              fill="none"
              stroke="#d4900a"
              strokeWidth="7"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            {/* bright dashes */}
            <path
              d={pathD}
              fill="none"
              stroke="#ffd166"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="12 8"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* decorations */}
          {DECORATIONS.map((d, i) => (
            <span
              key={i}
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: `${d.x}%`,
                top: d.y,
                fontSize: '1.5rem',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              {d.icon}
            </span>
          ))}

          {/* stage nodes */}
          {statuses.map(({ stage, stars, completed, unlocked }, i) => {
            const [x, y] = POSITIONS[i] ?? [50, 0]
            const isCurrent = i === currentIdx && unlocked
            const cls = [
              'map-node',
              completed ? 'completed' : '',
              !unlocked ? 'locked' : '',
              isCurrent ? 'current' : '',
            ]
              .filter(Boolean)
              .join(' ')

            return (
              <button
                key={stage.id}
                className={cls}
                style={{ left: `${x}%`, top: y }}
                disabled={!unlocked}
                onClick={() => unlocked && onPlay(stage.id)}
                title={stage.title}
              >
                {completed ? (
                  <span style={{ fontSize: '1.4rem' }}>✓</span>
                ) : !unlocked ? (
                  <span style={{ fontSize: '1.1rem' }}>🔒</span>
                ) : (
                  <>
                    <span style={{ fontSize: '1.2rem', fontWeight: 900, lineHeight: 1 }}>
                      {i + 1}
                    </span>
                    {stars > 0 && (
                      <span style={{ fontSize: '0.5rem', color: '#ffd166', letterSpacing: '1px', lineHeight: 1 }}>
                        {'★'.repeat(Math.min(stars, stage.starsToComplete))}
                      </span>
                    )}
                  </>
                )}
              </button>
            )
          })}

          {/* character — wrapper handles position+transition, inner div handles walk animation */}
          <div
            className="map-char-pos"
            style={{ left: `${charX}%`, top: charY - 60 }}
            aria-hidden="true"
          >
            <div className="map-char-anim">
              <CreatureAvatar totalStars={progress.totalStars} size={62} />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
