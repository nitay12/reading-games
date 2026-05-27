import { curriculum, allWords } from '../src/data/curriculum.ts'
import { buildRound } from '../src/logic/round.ts'
import { stageStatuses, currentStageId } from '../src/logic/progression.ts'
import { creatureForStars, nextCreature } from '../src/data/creature.ts'
import { loadProgress, awardStars } from '../src/storage/progress.ts'

let errors = 0
const fail = (m: string) => {
  console.error('FAIL:', m)
  errors++
}

// every word has an icon file reference and unique-ish data
for (const wd of allWords) {
  if (!wd.image.endsWith('.svg')) fail(`word ${wd.id} bad image`)
  if (!wd.text) fail(`word ${wd.id} no text`)
}

// buildRound: exactly one correct, 2-3 distinct-image choices
for (const stage of curriculum.stages) {
  for (const wd of stage.words) {
    for (const mode of ['picture', 'word'] as const) {
      const r = buildRound(stage, wd, mode)
      const correct = r.choices.filter((c) => c.isCorrect)
      if (correct.length !== 1) fail(`${stage.id}/${wd.id} ${mode}: ${correct.length} correct`)
      if (r.choices.length < 2) fail(`${stage.id}/${wd.id}: too few choices`)
      const imgs = new Set(r.choices.map((c) => c.word.image))
      if (mode === 'picture' && imgs.size !== r.choices.length)
        fail(`${stage.id}/${wd.id}: duplicate images in picture mode`)
    }
  }
}

// progression: first stage unlocked, locked after
const fresh = loadProgress()
const st = stageStatuses(fresh)
if (!st[0].unlocked) fail('first stage should be unlocked')
if (st[1].unlocked) fail('second stage should be locked on fresh progress')
if (currentStageId(fresh) !== curriculum.stages[0].id) fail('current stage wrong')

// award + creature
let p = fresh
const first = curriculum.stages[0]
for (let i = 0; i < 20; i++) p = awardStars(p, first.id, first.starsToComplete, 1).progress
if (p.stageStars[first.id] !== first.starsToComplete) fail('stars not capped at completion')
if (!stageStatuses(p)[1].unlocked) fail('second stage should unlock after first completed')
if (creatureForStars(0).level !== 0) fail('creature base level wrong')
if (creatureForStars(1000).level !== 5) fail('creature max level wrong')
if (nextCreature(1000) !== null) fail('nextCreature at max should be null')

console.log(`smoke: checked ${allWords.length} words, ${curriculum.stages.length} stages`)
console.log(errors === 0 ? 'ALL OK' : `${errors} FAILURES`)
process.exit(errors === 0 ? 0 : 1)
