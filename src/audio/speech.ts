let cachedVoice: SpeechSynthesisVoice | null | undefined = undefined

export function speechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

function findHebrewVoice(): SpeechSynthesisVoice | null {
  if (!speechSupported()) return null
  const voices = window.speechSynthesis.getVoices()
  return voices.find((v) => v.lang?.toLowerCase().startsWith('he')) ?? null
}

export function getHebrewVoice(): SpeechSynthesisVoice | null {
  if (cachedVoice === undefined) cachedVoice = findHebrewVoice()
  return cachedVoice
}

export function hasHebrewVoice(): boolean {
  return getHebrewVoice() !== null
}

// עוקב אחרי טעינת קולות (אסינכרונית). מחזיר פונקציית ניקוי.
export function onVoicesChanged(cb: () => void): () => void {
  if (!speechSupported()) return () => {}
  const handler = () => {
    cachedVoice = findHebrewVoice()
    cb()
  }
  window.speechSynthesis.addEventListener('voiceschanged', handler)
  // קריאה ראשונית מאלצת טעינה בחלק מהדפדפנים
  cachedVoice = findHebrewVoice()
  return () => window.speechSynthesis.removeEventListener('voiceschanged', handler)
}

export function speak(text: string, rate = 0.85): void {
  if (!speechSupported()) return
  const synth = window.speechSynthesis
  synth.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'he-IL'
  const voice = getHebrewVoice()
  if (voice) u.voice = voice
  u.rate = rate
  u.pitch = 1
  synth.speak(u)
}

export function stopSpeaking(): void {
  if (speechSupported()) window.speechSynthesis.cancel()
}
