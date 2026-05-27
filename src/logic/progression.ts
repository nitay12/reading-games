import { curriculum } from '../data/curriculum'
import type { Stage } from '../data/types'
import type { Progress } from '../storage/progress'

export interface StageStatus {
  stage: Stage
  index: number
  stars: number
  completed: boolean
  unlocked: boolean
}

// שלב נפתח כשהשלב הקודם הושלם (הגיע ל-starsToComplete). הראשון פתוח תמיד.
export function stageStatuses(progress: Progress): StageStatus[] {
  const result: StageStatus[] = []
  let prevCompleted = true
  curriculum.stages.forEach((stage, index) => {
    const stars = progress.stageStars[stage.id] ?? 0
    const completed = stars >= stage.starsToComplete
    const unlocked = prevCompleted
    result.push({ stage, index, stars, completed, unlocked })
    prevCompleted = completed
  })
  return result
}

export function currentStageId(progress: Progress): string {
  const statuses = stageStatuses(progress)
  const firstOpen = statuses.find((s) => s.unlocked && !s.completed)
  return (firstOpen ?? statuses[statuses.length - 1]).stage.id
}

export function isStageUnlocked(progress: Progress, stageId: string): boolean {
  return stageStatuses(progress).find((s) => s.stage.id === stageId)?.unlocked ?? false
}
