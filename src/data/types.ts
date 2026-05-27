export type NikudLevel = 1 | 2 | 3 | 4 | 5
export type ComplexityLevel = 1 | 2 | 3 | 4

export interface WordEntry {
  id: string
  text: string // עברית מנוקדת, למשל "כֶּלֶב"
  plain: string // ללא ניקוד, לתווית עזר ול-TTS גיבוי
  image: string // שם קובץ אייקון, למשל "fish.svg" (מ-public/images/icons/)
  translit: string // תעתיק לעזרת ההורה
  nikud: NikudLevel
  complexity: ComplexityLevel
  audioText?: string // טקסט חלופי ל-TTS אם ההגייה שגויה
  distractors?: string[] // מסיחים מנוקדים (אותו שלד עיצורי, ניקוד שונה)
}

export interface Stage {
  id: string // `n${nikud}-c${complexity}`
  nikud: NikudLevel
  complexity: ComplexityLevel
  title: string
  words: WordEntry[]
  starsToComplete: number
}

export interface Curriculum {
  stages: Stage[]
}

export interface CreatureStage {
  level: number
  name: string
  icon: string
  starsRequired: number
  color: string
}

export const NIKUD_INFO: Record<NikudLevel, { name: string; sound: string; mark: string }> = {
  1: { name: 'קָמָץ / פַּתָּח', sound: 'אַ', mark: 'ַ' },
  2: { name: 'צֵירֵה / סֶגוֹל', sound: 'אֶ', mark: 'ֶ' },
  3: { name: 'חִירִיק', sound: 'אִ', mark: 'ִ' },
  4: { name: 'חוֹלָם', sound: 'אוֹ', mark: 'וֹ' },
  5: { name: 'שׁוּרוּק / קֻבּוּץ', sound: 'אוּ', mark: 'וּ' },
}

export const COMPLEXITY_INFO: Record<ComplexityLevel, string> = {
  1: 'הֲבָרָה אַחַת',
  2: 'שְׁתֵּי הֲבָרוֹת',
  3: 'מִילִּים אֲרֻכּוֹת',
  4: 'מִשְׁפָּטִים',
}
