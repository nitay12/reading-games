import { creatureForStars } from '../data/creature'

export function CreatureAvatar({ totalStars, size = 72 }: { totalStars: number; size?: number }) {
  const c = creatureForStars(totalStars)
  const url = `${import.meta.env.BASE_URL}images/creature/${c.icon}`
  return (
    <div
      className="creature-disc"
      style={{ width: size, height: size, background: `${c.color}33` }}
    >
      <img src={url} alt={c.name} className="creature-img" />
    </div>
  )
}

export function CreatureImage({
  icon,
  color,
  alt,
  size = 64,
}: {
  icon: string
  color: string
  alt: string
  size?: number
}) {
  const url = `${import.meta.env.BASE_URL}images/creature/${icon}`
  return (
    <div className="creature-disc" style={{ width: size, height: size, background: `${color}33` }}>
      <img src={url} alt={alt} className="creature-img" />
    </div>
  )
}
