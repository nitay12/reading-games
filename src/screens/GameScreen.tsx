import { useEffect, useState } from 'react'
import { curriculum } from '../data/curriculum'
import { useGame } from '../logic/useGame'
import { useSpeech } from '../audio/useSpeech'
import type { Progress } from '../storage/progress'
import { Pic } from '../components/Pic'
import { Confetti } from '../components/Confetti'

export function GameScreen({
  stageId,
  progress,
  onCorrect,
  onExit,
  onReplay,
}: {
  stageId: string
  progress: Progress
  onCorrect: (stageId: string) => void
  onExit: () => void
  onReplay: () => void
}) {
  const stage = curriculum.stages.find((s) => s.id === stageId)!
  const speech = useSpeech(progress.settings.ttsRate)
  const game = useGame(stage, () => onCorrect(stageId))
  const [wrongKeys, setWrongKeys] = useState<string[]>([])

  const { round, result } = game
  const useWordMode = round.mode === 'word' && speech.supported && speech.hasHebrew
  const isSentence = stage.complexity >= 4
  const stageStars = progress.stageStars[stageId] ?? 0
  const justCompleted = game.finished && stageStars >= stage.starsToComplete

  // במצב שמיעה — להשמיע את המילה אוטומטית בכל סבב חדש (אחרי מגע ראשון בעת כניסה)
  useEffect(() => {
    if (useWordMode && result === 'idle') speech.say(round.prompt.audioText ?? round.prompt.text)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round.prompt.id, useWordMode])

  if (game.finished) {
    return (
      <div className="center-screen">
        {justCompleted && <Confetti />}
        <div style={{ fontSize: '3.4rem' }}>{justCompleted ? '🏆' : '🎉'}</div>
        <h1>{justCompleted ? 'סִיַּמְתָּ אֶת הַשָּׁלָב!' : 'כָּל הַכָּבוֹד!'}</h1>
        <div className="big-stars">{'⭐'.repeat(Math.min(game.starsThisSession, 8))}</div>
        <p className="note">
          אָסַפְתָּ {game.starsThisSession} כּוֹכָבִים בַּמִּשְׂחָק הַזֶּה
        </p>
        <button className="btn-primary" onClick={onReplay}>
          שׁוּב 🔁
        </button>
        <button className="btn-ghost" onClick={onExit}>
          חֲזָרָה לַמַּפָּה
        </button>
      </div>
    )
  }

  function handlePick(key: string) {
    if (result === 'correct') return
    const ok = game.answer(key)
    const word = round.choices.find((c) => c.key === key)?.word
    if (ok) {
      if (word) speech.say(word.audioText ?? word.text)
    } else {
      setWrongKeys((w) => (w.includes(key) ? w : [...w, key]))
    }
  }

  function handleNext() {
    setWrongKeys([])
    game.next()
  }

  return (
    <div className="game">
      <div className="game-head">
        <button className="icon-btn" onClick={onExit} aria-label="חזרה">
          ›
        </button>
        <span className="title">{stage.title}</span>
        <span className="dots">
          {stage.words.map((_, i) => (
            <i key={i} className={i <= game.index ? 'on' : ''} />
          ))}
        </span>
      </div>

      {/* prompt */}
      {useWordMode ? (
        <button
          className="big-listen"
          onClick={() => speech.say(round.prompt.audioText ?? round.prompt.text)}
        >
          <span style={{ fontSize: '2.4rem' }}>🔊</span>
          הַקְשֵׁב וּבְחַר אֶת הַמִּילָה
        </button>
      ) : (
        <div className="prompt">
          <div className={isSentence ? 'word sentence' : 'word'}>{round.prompt.text}</div>
          {progress.settings.showTranslit && (
            <div className="translit">{round.prompt.translit}</div>
          )}
          {speech.supported && (
            <button
              className="speak-btn"
              onClick={() => speech.say(round.prompt.audioText ?? round.prompt.text)}
            >
              🔊 שְׁמַע
            </button>
          )}
        </div>
      )}

      {/* choices */}
      <div className={`choices ${useWordMode ? 'word-mode' : ''}`}>
        {round.choices.map((c) => {
          const isWrong = wrongKeys.includes(c.key)
          const isRight = result === 'correct' && c.isCorrect
          const cls = [
            'choice',
            useWordMode ? 'word-choice' : '',
            isRight ? 'correct' : '',
            isWrong ? 'wrong' : '',
            result === 'correct' && !c.isCorrect ? 'dim' : '',
          ]
            .filter(Boolean)
            .join(' ')
          return (
            <button key={c.key} className={cls} onClick={() => handlePick(c.key)} disabled={isWrong}>
              {useWordMode ? (
                <span className="choice-word">{c.word.text}</span>
              ) : (
                <Pic file={c.word.image} size={72} />
              )}
            </button>
          )
        })}
      </div>

      {/* feedback bar */}
      {result !== 'idle' && (
        <div className="feedback">
          {result === 'correct' ? (
            <>
              <div className="msg good">נָכוֹן! {round.prompt.text}</div>
              <button className="btn-primary" onClick={handleNext}>
                הַבָּא ←
              </button>
            </>
          ) : (
            <div className="msg try">נַסֵּה שׁוּב 🙂</div>
          )}
        </div>
      )}
    </div>
  )
}
