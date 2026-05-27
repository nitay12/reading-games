import { useCallback, useEffect, useState } from 'react'
import { hasHebrewVoice, onVoicesChanged, speak, speechSupported } from './speech'

export interface SpeechApi {
  supported: boolean
  hasHebrew: boolean
  say: (text: string) => void
}

export function useSpeech(rate: number): SpeechApi {
  const [hasHebrew, setHasHebrew] = useState<boolean>(() => hasHebrewVoice())

  useEffect(() => {
    setHasHebrew(hasHebrewVoice())
    const off = onVoicesChanged(() => setHasHebrew(hasHebrewVoice()))
    return off
  }, [])

  const say = useCallback((text: string) => speak(text, rate), [rate])

  return { supported: speechSupported(), hasHebrew, say }
}
