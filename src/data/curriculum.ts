import type { Curriculum, Stage, WordEntry } from './types'

const tw = (code: string) =>
  `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${code}.svg`

const w = (
  id: string,
  text: string,
  plain: string,
  image: string,
  translit: string,
  nikud: WordEntry['nikud'],
  complexity: WordEntry['complexity'],
  audioText?: string,
): WordEntry => ({ id, text, plain, image, translit, nikud, complexity, audioText })

// ---------- הברה אחת ----------

const n1c1: WordEntry[] = [
  w('dag',  'דָּג',  'דג',  tw('1f41f'), 'dag',  1, 1),
  w('yad',  'יָד',  'יד',  tw('270b'),  'yad',  1, 1),
  w('tzav', 'צָב',  'צב',  tw('1f422'), 'tzav', 1, 1),
  w('par',  'פָּר',  'פר',  tw('1f402'), 'par',  1, 1),
  w('chag', 'חָג',  'חג',  tw('1f389'), 'chag', 1, 1),
  w('yam',  'יָם',  'ים',  tw('1f30a'), 'yam',  1, 1),
  w('kaf',  'כַּף', 'כף',  tw('1f944'), 'kaf',  1, 1),
]

const n2c1: WordEntry[] = [
  w('etz',  'עֵץ', 'עץ', tw('1f332'), 'etz',  2, 1),
  w('ner',  'נֵר', 'נר', tw('1f56f'), 'ner',  2, 1),
  w('shen', 'שֵׁן', 'שן', tw('1f9b7'), 'shen', 2, 1),
  w('ben',  'בֵּן', 'בן', tw('1f466'), 'ben',  2, 1),
  w('et',   'עֵט', 'עט', tw('2712'),  'et',   2, 1),
  w('te',   'תֵּה', 'תה', tw('1f375'), 'te',   2, 1),
  w('netz', 'נֵץ', 'נץ', tw('1f985'), 'netz', 2, 1),
]

const n3c1: WordEntry[] = [
  w('pil',  'פִּיל', 'פיל', tw('1f418'), 'pil',  3, 1),
  w('ish',  'אִישׁ', 'איש', tw('1f468'), 'ish',  3, 1),
  w('shir', 'שִׁיר', 'שיר', tw('1f3b5'), 'shir', 3, 1),
  w('ir',   'עִיר', 'עיר', tw('1f3d9'), 'ir',   3, 1),
  w('mitz', 'מִיץ', 'מיץ', tw('1f9c3'), 'mitz', 3, 1),
  w('shi',  'שִׁי',  'שי',  tw('1f381'), 'shi',  3, 1),
]

const n4c1: WordEntry[] = [
  w('dov',  'דֹּב',  'דוב', tw('1f43b'), 'dov',  4, 1, 'דּוֹב'),
  w('kos',  'כּוֹס', 'כוס', tw('2615'),  'kos',  4, 1),
  w('or',   'אוֹר', 'אור', tw('1f4a1'), 'or',   4, 1),
  w('chol', 'חוֹל', 'חול', tw('1f3d6'), 'chol', 4, 1),
  w('tof',  'תּוֹף', 'תוף', tw('1f941'), 'tof',  4, 1),
  w('kol',  'קוֹל', 'קול', tw('1f50a'), 'kol',  4, 1),
  w('shor', 'שׁוֹר', 'שור', tw('1f403'), 'shor', 4, 1),
]

const n5c1: WordEntry[] = [
  w('sus',  'סוּס', 'סוס', tw('1f40e'), 'sus',  5, 1),
  w('gur',  'גּוּר', 'גור', tw('1f436'), 'gur',  5, 1),
  w('bul',  'בּוּל', 'בול', tw('1f4ee'), 'bul',  5, 1),
  w('guf',  'גּוּף', 'גוף', tw('1f9cd'), 'guf',  5, 1),
  w('shuk', 'שׁוּק', 'שוק', tw('1f6d2'), 'shuk', 5, 1),
  w('ur',   'אוּר', 'אור', tw('1f525'), 'ur',   5, 1),
]

// ---------- שתי הברות ----------

const n1c2: WordEntry[] = [
  w('para',   'פָּרָה',   'פרה',   tw('1f404'), 'para',   1, 2),
  w('anan',   'עָנָן',   'ענן',   tw('2601'),  'anan',   1, 2),
  w('nachash','נָחָשׁ',  'נחש',   tw('1f40d'), 'nachash',1, 2),
  w('parpar', 'פַּרְפַּר','פרפר',  tw('1f98b'), 'parpar', 1, 2),
  w('chalav', 'חָלָב',   'חלב',   tw('1f95b'), 'chalav', 1, 2),
  w('agas',   'אַגָּס',   'אגס',   tw('1f350'), 'agas',   1, 2),
  w('tapuz',  'תַּפּוּז',  'תפוז',  tw('1f34a'), 'tapuz',  1, 2),
  w('karish', 'כָּרִישׁ', 'כריש',  tw('1f988'), 'karish', 1, 2),
]

const n2c2: WordEntry[] = [
  w('kelev',  'כֶּלֶב',  'כלב',  tw('1f415'), 'kelev',  2, 2),
  w('shemesh','שֶׁמֶשׁ', 'שמש',  tw('2600'),  'shemesh',2, 2),
  w('delet',  'דֶּלֶת',  'דלת',  tw('1f6aa'), 'delet',  2, 2),
  w('sefer',  'סֵפֶר',  'ספר',  tw('1f4d6'), 'sefer',  2, 2),
  w('perach', 'פֶּרַח',  'פרח',  tw('1f338'), 'perach', 2, 2),
  w('yeled',  'יֶלֶד',   'ילד',  tw('1f466'), 'yeled',  2, 2),
  w('nesher', 'נֶשֶׁר',  'נשר',  tw('1f985'), 'nesher', 2, 2),
  w('melech', 'מֶלֶךְ',  'מלך',  tw('1f451'), 'melech', 2, 2),
  w('lechem', 'לֶחֶם',  'לחם',  tw('1f35e'), 'lechem', 2, 2),
]

const n3c2: WordEntry[] = [
  w('tzipor', 'צִפּוֹר', 'ציפור', tw('1f426'), 'tzipor', 3, 2),
  w('kise',   'כִּסֵּא', 'כיסא', tw('1fa91'), 'kise',   3, 2),
  w('glida',  'גְּלִידָה','גלידה', tw('1f366'), 'glida',  3, 2),
  w('tinok',  'תִּינוֹק', 'תינוק', tw('1f476'), 'tinok',  3, 2),
  w('piza',   'פִּיצָה', 'פיצה', tw('1f355'), 'pitza',  3, 2),
  w('sira',   'סִירָה',  'סירה', tw('26f5'),  'sira',   3, 2),
  w('migdal', 'מִגְדָּל', 'מגדל', tw('1f5fc'), 'migdal', 3, 2),
]

const n4c2: WordEntry[] = [
  w('kochav', 'כּוֹכָב',  'כוכב',  tw('2b50'),  'kochav', 4, 2),
  w('kova',   'כּוֹבַע',  'כובע',  tw('1f3a9'), 'kova',   4, 2),
  w('oto',    'אוֹטוֹ',  'אוטו',  tw('1f697'), 'oto',    4, 2),
  w('yona',   'יוֹנָה',  'יונה',  tw('1f54a'), 'yona',   4, 2),
  w('shoko',  'שׁוֹקוֹ', 'שוקו',  tw('1f36b'), 'shoko',  4, 2),
  w('robot',  'רוֹבּוֹט', 'רובוט', tw('1f916'), 'robot',  4, 2),
  w('more',   'מוֹרֶה',  'מורה',  tw('1f393'), 'more',   4, 2),
]

const n5c2: WordEntry[] = [
  w('chatul',  'חָתוּל',  'חתול',  tw('1f408'), 'chatul',  5, 2),
  w('uga',     'עוּגָה',  'עוגה',  tw('1f382'), 'uga',     5, 2),
  w('kadur',   'כַּדּוּר', 'כדור',  tw('26bd'),  'kadur',   5, 2),
  w('dubon',   'דֻּבּוֹן', 'דובון', tw('1f9f8'), 'dubon',   5, 2),
  w('buba',    'בּוּבָּה', 'בובה',  tw('1fa86'), 'buba',    5, 2),
  w('chultza', 'חֻלְצָה', 'חולצה', tw('1f455'), 'chultza', 5, 2),
  w('tuna',    'טוּנָה',  'טונה',  tw('1f420'), 'tuna',    5, 2),
]

// ---------- מילים ארוכות (כל התנועות) ----------

const c3: WordEntry[] = [
  w('tapuach',    'תַּפּוּחַ',     'תפוח',    tw('1f34e'), 'tapuach',    5, 3),
  w('otobus',     'אוֹטוֹבּוּס',   'אוטובוס', tw('1f68c'), 'otobus',     5, 3),
  w('mechonit',   'מְכוֹנִית',     'מכונית',  tw('1f697'), 'mechonit',   4, 3),
  w('iparon',     'עִפָּרוֹן',     'עפרון',   tw('270f'),  'iparon',     4, 3),
  w('mishkafayim','מִשְׁקָפַיִם',  'משקפיים', tw('1f453'), 'mishkafayim',3, 3),
  w('glida3',     'גְּלִידָה',     'גלידה',   tw('1f366'), 'glida',      3, 3),
  w('machshev',   'מַחְשֵׁב',     'מחשב',    tw('1f4bb'), 'machshev',   2, 3),
  w('maftea',     'מַפְתֵּחַ',     'מפתח',    tw('1f511'), 'maftea',     2, 3),
  w('avatiach',   'אַבְטִיחַ',     'אבטיח',   tw('1f349'), 'avatiach',   3, 3),
  w('ananas',     'אֲנָנָס',       'אננס',    tw('1f34d'), 'ananas',     1, 3),
]

// ---------- משפטים (התמונה = מילת המפתח) ----------

const c4: WordEntry[] = [
  w('s_dog',   'הַכֶּלֶב רָץ',                   'הכלב רץ',             tw('1f415'), 'ha-kelev ratz',              5, 4),
  w('s_cat',   'הֶחָתוּל יָשֵׁן',                 'החתול ישן',            tw('1f408'), 'he-chatul yashen',           5, 4),
  w('s_apple', 'הַיֶּלֶד אוֹכֵל תַּפּוּחַ',         'הילד אוכל תפוח',      tw('1f34e'), 'ha-yeled ochel tapuach',     5, 4),
  w('s_fish',  'הַדָּג שׂוֹחֶה בַּמַּיִם',           'הדג שוחה במים',        tw('1f41f'), 'ha-dag socheh ba-mayim',     5, 4),
  w('s_bird',  'הַצִּפּוֹר עָפָה',                  'הציפור עפה',           tw('1f426'), 'ha-tzipor afa',              5, 4),
  w('s_car',   'אַבָּא נוֹסֵעַ בַּמְּכוֹנִית',       'אבא נוסע במכונית',    tw('1f697'), 'aba nosea ba-mechonit',      5, 4),
  w('s_horse', 'הַסּוּס רָץ בַּשָּׂדֶה',             'הסוס רץ בשדה',         tw('1f40e'), 'ha-sus ratz ba-sadeh',       5, 4),
  w('s_milk',  'הַיֶּלֶד שׁוֹתֶה חָלָב',             'הילד שותה חלב',        tw('1f95b'), 'ha-yeled shote chalav',      5, 4),
  w('s_lion',  'הָאַרְיֵה שׁוֹאֵג',                 'האריה שואג',           tw('1f981'), 'ha-arye shoeg',              5, 4),
]

const stage = (
  nikud: Stage['nikud'],
  complexity: Stage['complexity'],
  title: string,
  words: WordEntry[],
): Stage => ({
  id: `n${nikud}-c${complexity}`,
  nikud,
  complexity,
  title,
  words,
  starsToComplete: Math.max(4, Math.min(8, words.length * 2)),
})

export const curriculum: Curriculum = {
  stages: [
    stage(1, 1, 'אַבָּא קָמָץ',            n1c1),
    stage(2, 1, 'אֶצְבַּע סֶגוֹל',          n2c1),
    stage(3, 1, 'אִי חִירִיק',             n3c1),
    stage(4, 1, 'אוֹר חוֹלָם',             n4c1),
    stage(5, 1, 'אוּף שׁוּרוּק',            n5c1),
    stage(1, 2, 'קָמָץ - שְׁתֵּי הֲבָרוֹת', n1c2),
    stage(2, 2, 'סֶגוֹל - שְׁתֵּי הֲבָרוֹת', n2c2),
    stage(3, 2, 'חִירִיק - שְׁתֵּי הֲבָרוֹת', n3c2),
    stage(4, 2, 'חוֹלָם - שְׁתֵּי הֲבָרוֹת', n4c2),
    stage(5, 2, 'שׁוּרוּק - שְׁתֵּי הֲבָרוֹת', n5c2),
    stage(5, 3, 'מִילִּים אֲרֻכּוֹת',       c3),
    stage(5, 4, 'מִשְׁפָּטִים',             c4),
  ],
}

export const allWords: WordEntry[] = curriculum.stages.flatMap((s) => s.words)
