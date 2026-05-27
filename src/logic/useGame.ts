import { useCallback, useMemo, useState } from 'react'
import type { Stage } from '../data/types'
import type { GameMode } from '../storage/progress'
import { buildRound, type Round } from './round'
import { shuffle } from './shuffle'

export type RoundResult = 'idle' | 'correct' | 'wrong'

function modeForIndex(stage: Stage, i: number): GameMode {
  if (stage.complexity >= 4) return 'picture'
  return i % 2 === 1 ? 'word' : 'picture'
}

export interface GameState {
  round: Round
  index: number
  total: number
  result: RoundResult
  starsThisSession: number
  finished: boolean
  answer: (choiceKey: string) => boolean
  next: () => void
}

export function useGame(stage: Stage, onCorrect: () => void): GameState {
  const queue = useMemo(() => shuffle(stage.words), [stage])
  const [index, setIndex] = useState(0)
  const [result, setResult] = useState<RoundResult>('idle')
  const [stars, setStars] = useState(0)
  const [scoredThisRound, setScoredThisRound] = useState(false)

  const finished = index >= queue.length
  const safeIndex = Math.min(index, queue.length - 1)

  const round = useMemo(
    () => buildRound(stage, queue[safeIndex], modeForIndex(stage, safeIndex)),
    [stage, queue, safeIndex],
  )

  const answer = useCallback(
    (choiceKey: string): boolean => {
      const choice = round.choices.find((c) => c.key === choiceKey)
      if (!choice) return false
      if (choice.isCorrect) {
        if (!scoredThisRound) {
          setStars((s) => s + 1)
          onCorrect()
        }
        setResult('correct')
        return true
      }
      setResult('wrong')
      setScoredThisRound(true) // אחרי טעות, אין כוכב לסבב הזה
      return false
    },
    [round, scoredThisRound, onCorrect],
  )

  const next = useCallback(() => {
    setResult('idle')
    setScoredThisRound(false)
    setIndex((i) => i + 1)
  }, [])

  return {
    round,
    index,
    total: queue.length,
    result,
    starsThisSession: stars,
    finished,
    answer,
    next,
  }
}
