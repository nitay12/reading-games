import { allWords } from '../data/curriculum'
import type { Stage, WordEntry } from '../data/types'
import type { GameMode } from '../storage/progress'
import { shuffle } from './shuffle'

const NUM_CHOICES = 3

export interface Choice {
  key: string
  word: WordEntry
  isCorrect: boolean
}

export interface Round {
  mode: GameMode
  prompt: WordEntry
  choices: Choice[]
}

function distinctByImage(words: WordEntry[]): WordEntry[] {
  const seen = new Set<string>()
  const out: WordEntry[] = []
  for (const wd of words) {
    if (seen.has(wd.image)) continue
    seen.add(wd.image)
    out.push(wd)
  }
  return out
}

export function buildRound(stage: Stage, prompt: WordEntry, mode: GameMode): Round {
  const pool = allWords.filter(
    (x) => x.id !== prompt.id && x.image !== prompt.image && x.text !== prompt.text,
  )
  const sameComplexity = pool.filter((x) => x.complexity === stage.complexity)
  const ordered = [...shuffle(sameComplexity), ...shuffle(pool)]
  const distractors = distinctByImage(ordered).slice(0, NUM_CHOICES - 1)

  const choices: Choice[] = shuffle([prompt, ...distractors]).map((wd, i) => ({
    key: `${wd.id}-${i}`,
    word: wd,
    isCorrect: wd.id === prompt.id,
  }))
  return { mode, prompt, choices }
}
