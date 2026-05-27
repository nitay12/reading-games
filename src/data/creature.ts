import type { CreatureStage } from './types'

// היצור גדל מביצה לחד-קרן קסום ככל שצוברים כוכבים.
export const creatureStages: CreatureStage[] = [
  { level: 0, name: 'בֵּיצָה', icon: 'egg-easter.svg', starsRequired: 0, color: '#f4c95d' },
  { level: 1, name: 'בּוֹקֵעַ', icon: 'egg-outline.svg', starsRequired: 8, color: '#f0a868' },
  { level: 2, name: 'גּוֹזָל', icon: 'duck.svg', starsRequired: 20, color: '#ffd166' },
  { level: 3, name: 'חֲבֵרוֹן', icon: 'bird.svg', starsRequired: 36, color: '#7ac74f' },
  { level: 4, name: 'חַד-קֶרֶן צָעִיר', icon: 'unicorn-variant.svg', starsRequired: 58, color: '#5aa9e6' },
  { level: 5, name: 'חַד-קֶרֶן קָסוּם', icon: 'unicorn.svg', starsRequired: 84, color: '#9b5de5' },
]

export function creatureForStars(totalStars: number): CreatureStage {
  let current = creatureStages[0]
  for (const s of creatureStages) {
    if (totalStars >= s.starsRequired) current = s
  }
  return current
}

export function nextCreature(totalStars: number): CreatureStage | null {
  return creatureStages.find((s) => s.starsRequired > totalStars) ?? null
}
