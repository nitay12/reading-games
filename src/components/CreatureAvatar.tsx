import { creatureForStars } from '../data/creature'
import { Pic } from './Pic'

export function CreatureAvatar({ totalStars, size = 72 }: { totalStars: number; size?: number }) {
  const c = creatureForStars(totalStars)
  return (
    <div
      className="creature-disc"
      style={{ width: size, height: size, background: `${c.color}22` }}
    >
      <Pic file={c.icon} color={c.color} size={Math.round(size * 0.62)} />
    </div>
  )
}
