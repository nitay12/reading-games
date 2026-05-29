import type { CreatureStage } from './types'

// היצור גדל מביצה לדרקון אמיתי. כל שלב הוא איור CC0 מ-public/images/creature/
// (מקור: Superpowers Asset Packs — Sparklin Labs, CC0).
export const creatureStages: CreatureStage[] = [
  { level: 0, name: 'בֵּיצָה', icon: '0-egg.png', starsRequired: 0, color: '#f4c95d' },
  { level: 1, name: 'סְלַיים קָטָן', icon: '1-slime.gif', starsRequired: 8, color: '#7ac74f' },
  { level: 2, name: 'נָחָשׁ', icon: '2-snake.gif', starsRequired: 20, color: '#5aa9e6' },
  { level: 3, name: 'זוֹחֵל', icon: '3-reptile.gif', starsRequired: 36, color: '#9b5de5' },
  { level: 4, name: 'דַּיְנוֹ', icon: '4-dino.gif', starsRequired: 58, color: '#f0a868' },
  { level: 5, name: 'דְּרָקוֹן אַדִּיר', icon: '5-dragon.gif', starsRequired: 84, color: '#ef476f' },
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
