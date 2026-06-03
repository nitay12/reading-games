export type GameMode = 'picture' | 'word'

export interface Progress {
  schemaVersion: 1
  totalStars: number
  stageStars: Record<string, number>
  onboardingSeen: boolean
  settings: {
    ttsRate: number
    showTranslit: boolean
  }
}

const KEY = 'reading-games:v1'

const defaultProgress = (): Progress => ({
  schemaVersion: 1,
  totalStars: 0,
  stageStars: {},
  onboardingSeen: false,
  settings: { ttsRate: 0.85, showTranslit: false },
})

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaultProgress()
    const parsed = JSON.parse(raw) as Partial<Progress>
    if (parsed.schemaVersion !== 1) return defaultProgress()
    const base = defaultProgress()
    return {
      ...base,
      ...parsed,
      stageStars: { ...parsed.stageStars },
      settings: { ...base.settings, ...parsed.settings },
    }
  } catch {
    return defaultProgress()
  }
}

export function saveProgress(p: Progress): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(p))
  } catch {
    // אחסון מלא / מצב פרטי — מתעלמים בשקט
  }
}

// מוסיף כוכבים לשלב (עד התקרה) ומחזיר Progress מעודכן + כמה כוכבים נוספו בפועל
export function awardStars(
  p: Progress,
  stageId: string,
  cap: number,
  earned: number,
): { progress: Progress; added: number } {
  const current = p.stageStars[stageId] ?? 0
  const next = Math.min(cap, current + earned)
  const added = next - current
  if (added <= 0) return { progress: p, added: 0 }
  const progress: Progress = {
    ...p,
    totalStars: p.totalStars + added,
    stageStars: { ...p.stageStars, [stageId]: next },
  }
  return { progress, added }
}

export function resetProgress(): Progress {
  const fresh = defaultProgress()
  saveProgress(fresh)
  return fresh
}
