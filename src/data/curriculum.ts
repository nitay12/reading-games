import type { Curriculum, Stage, WordEntry } from './types'

// כל מילה: text מנוקד, plain ללא ניקוד, image = שם קובץ אייקון מ-public/images/icons/
// האייקונים מקורם בסט Material Design Icons (רישיון Apache 2.0).

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
  w('dag', 'דָּג', 'דג', 'fish.svg', 'dag', 1, 1),
  w('yad', 'יָד', 'יד', 'hand-back-left.svg', 'yad', 1, 1),
  w('tzav', 'צָב', 'צב', 'turtle.svg', 'tzav', 1, 1),
  w('par', 'פָּר', 'פר', 'cow.svg', 'par', 1, 1),
  w('gag', 'גַּג', 'גג', 'home-roof.svg', 'gag', 1, 1),
  w('chag', 'חַג', 'חג', 'gift.svg', 'chag', 1, 1),
  w('kaf', 'כַּף', 'כף', 'silverware-spoon.svg', 'kaf', 1, 1),
  w('sak', 'שַׂק', 'שק', 'sack.svg', 'sak', 1, 1),
]

const n2c1: WordEntry[] = [
  w('etz', 'עֵץ', 'עץ', 'pine-tree.svg', 'etz', 2, 1),
  w('ner', 'נֵר', 'נר', 'candle.svg', 'ner', 2, 1),
  w('shen', 'שֵׁן', 'שן', 'tooth.svg', 'shen', 2, 1),
  w('ben', 'בֵּן', 'בן', 'human-male-child.svg', 'ben', 2, 1),
  w('em', 'אֵם', 'אם', 'human-female.svg', 'em', 2, 1),
  w('esh', 'אֵשׁ', 'אש', 'fire.svg', 'esh', 2, 1),
  w('chetz', 'חֵץ', 'חץ', 'arrow-right-thick.svg', 'chetz', 2, 1),
  w('peh', 'פֶּה', 'פה', 'face-man-outline.svg', 'peh', 2, 1),
]

const n3c1: WordEntry[] = [
  w('pil', 'פִּיל', 'פיל', 'elephant.svg', 'pil', 3, 1),
  w('ish', 'אִישׁ', 'איש', 'human-male.svg', 'ish', 3, 1),
  w('shir', 'שִׁיר', 'שיר', 'music.svg', 'shir', 3, 1),
  w('ir', 'עִיר', 'עיר', 'city.svg', 'ir', 3, 1),
  w('sir', 'סִיר', 'סיר', 'pot-steam.svg', 'sir', 3, 1),
  w('mitz', 'מִיץ', 'מיץ', 'glass-flute.svg', 'mitz', 3, 1),
  w('shit', 'שִׁיט', 'שיט', 'sail-boat.svg', 'shit', 3, 1),
]

const n4c1: WordEntry[] = [
  w('dov', 'דּוֹב', 'דוב', 'teddy-bear.svg', 'dov', 4, 1),
  w('kos', 'כּוֹס', 'כוס', 'cup.svg', 'kos', 4, 1),
  w('or', 'אוֹר', 'אור', 'lightbulb.svg', 'or', 4, 1),
  w('chol', 'חוֹל', 'חול', 'beach.svg', 'chol', 4, 1),
  w('of', 'עוֹף', 'עוף', 'bird.svg', 'of', 4, 1),
  w('kotz', 'קוֹץ', 'קוץ', 'cactus.svg', 'kotz', 4, 1),
  w('chom', 'חוֹם', 'חום', 'thermometer-low.svg', 'chom', 4, 1),
]

const n5c1: WordEntry[] = [
  w('sus', 'סוּס', 'סוס', 'horse.svg', 'sus', 5, 1),
  w('gur', 'גּוּר', 'גור', 'dog-side.svg', 'gur', 5, 1),
  w('bul', 'בּוּל', 'בול', 'postage-stamp.svg', 'bul', 5, 1),
]

// ---------- שתי הברות ----------
const n1c2: WordEntry[] = [
  w('para', 'פָּרָה', 'פרה', 'cow.svg', 'para', 1, 2),
  w('anan', 'עָנָן', 'ענן', 'cloud.svg', 'anan', 1, 2),
  w('nachash', 'נָחָשׁ', 'נחש', 'snake.svg', 'nachash', 1, 2),
  w('parpar', 'פַּרְפַּר', 'פרפר', 'butterfly.svg', 'parpar', 1, 2),
  w('chalav', 'חָלָב', 'חלב', 'glass-mug-variant.svg', 'chalav', 1, 2),
  w('aba', 'אַבָּא', 'אבא', 'face-man-outline.svg', 'aba', 1, 2),
  w('barak', 'בָּרָק', 'ברק', 'flash.svg', 'barak', 1, 2),
  w('barvaz', 'בַּרְוָז', 'ברווז', 'duck.svg', 'barvaz', 1, 2),
  w('chayal', 'חַיָּל', 'חייל', 'shield-account.svg', 'chayal', 1, 2),
  w('shaar', 'שַׁעַר', 'שער', 'gate.svg', 'shaar', 1, 2),
  w('chashmal', 'חַשְׁמַל', 'חשמל', 'lightning-bolt.svg', 'chashmal', 1, 2),
]

const n2c2: WordEntry[] = [
  w('kelev', 'כֶּלֶב', 'כלב', 'dog.svg', 'kelev', 2, 2),
  w('shemesh', 'שֶׁמֶשׁ', 'שמש', 'weather-sunny.svg', 'shemesh', 2, 2),
  w('delet', 'דֶּלֶת', 'דלת', 'door-closed.svg', 'delet', 2, 2),
  w('sefer', 'סֵפֶר', 'ספר', 'book.svg', 'sefer', 2, 2),
  w('perach', 'פֶּרַח', 'פרח', 'flower.svg', 'perach', 2, 2),
  w('yeled', 'יֶלֶד', 'ילד', 'human-male-boy.svg', 'yeled', 2, 2),
  w('keter', 'כֶּתֶר', 'כתר', 'crown.svg', 'keter', 2, 2),
  w('beged', 'בֶּגֶד', 'בגד', 'tshirt-crew.svg', 'beged', 2, 2),
  w('gesher', 'גֶּשֶׁר', 'גשר', 'bridge.svg', 'gesher', 2, 2),
  w('sheleg', 'שֶׁלֶג', 'שלג', 'snowflake.svg', 'sheleg', 2, 2),
  w('melech', 'מֶלֶךְ', 'מלך', 'chess-king.svg', 'melech', 2, 2),
  w('beytza', 'בֵּיצָה', 'ביצה', 'egg.svg', 'beytza', 2, 2),
]

const n3c2: WordEntry[] = [
  w('tzipor', 'צִפּוֹר', 'ציפור', 'bird.svg', 'tzipor', 3, 2),
  w('kise', 'כִּסֵּא', 'כיסא', 'chair-rolling.svg', 'kise', 3, 2),
  w('glida', 'גְּלִידָה', 'גלידה', 'ice-cream.svg', 'glida', 3, 2),
  w('tinok', 'תִּינוֹק', 'תינוק', 'baby.svg', 'tinok', 3, 2),
  w('ima', 'אִמָּא', 'אמא', 'human-female.svg', 'ima', 3, 2),
  w('pita', 'פִּיתָה', 'פיתה', 'bread-slice.svg', 'pita', 3, 2),
  w('shira', 'שִׁירָה', 'שירה', 'music-note.svg', 'shira', 3, 2),
  w('chiyuch', 'חִיּוּךְ', 'חיוך', 'emoticon.svg', 'chiyuch', 3, 2),
  w('michtav', 'מִכְתָּב', 'מכתב', 'mailbox-up-outline.svg', 'michtav', 3, 2),
  w('tziyur', 'צִיּוּר', 'ציור', 'palette.svg', 'tziyur', 3, 2),
]

const n4c2: WordEntry[] = [
  w('kochav', 'כּוֹכָב', 'כוכב', 'star.svg', 'kochav', 4, 2),
  w('kova', 'כּוֹבַע', 'כובע', 'hat-fedora.svg', 'kova', 4, 2),
  w('oto', 'אוֹטוֹ', 'אוטו', 'car.svg', 'oto', 4, 2),
  w('yona', 'יוֹנָה', 'יונה', 'bird.svg', 'yona', 4, 2),
  w('koach', 'כּוֹחַ', 'כוח', 'arm-flex.svg', 'koach', 4, 2),
  w('ochel', 'אוֹכֶל', 'אוכל', 'food-fork-drink.svg', 'ochel', 4, 2),
  w('ohel', 'אוֹהֶל', 'אוהל', 'tent.svg', 'ohel', 4, 2),
  w('shomer', 'שׁוֹמֵר', 'שומר', 'shield.svg', 'shomer', 4, 2),
  w('ozen', 'אוֹזֶן', 'אוזן', 'ear-hearing.svg', 'ozen', 4, 2),
  w('shaon', 'שָׁעוֹן', 'שעון', 'clock.svg', 'shaon', 4, 2),
  w('balon', 'בָּלוֹן', 'בלון', 'balloon.svg', 'balon', 4, 2),
  w('chamor', 'חֲמוֹר', 'חמור', 'donkey.svg', 'chamor', 4, 2),
]

const n5c2: WordEntry[] = [
  w('chatul', 'חָתוּל', 'חתול', 'cat.svg', 'chatul', 5, 2),
  w('uga', 'עוּגָה', 'עוגה', 'cake-variant.svg', 'uga', 5, 2),
  w('kadur', 'כַּדּוּר', 'כדור', 'soccer.svg', 'kadur', 5, 2),
  w('dubon', 'דֻּבּוֹן', 'דובון', 'teddy-bear.svg', 'dubon', 5, 2),
  w('shulchan', 'שֻׁלְחָן', 'שולחן', 'table-chair.svg', 'shulchan', 5, 2),
  w('chultza', 'חֻלְצָה', 'חולצה', 'tshirt-crew.svg', 'chultza', 5, 2),
]

// ---------- מילים ארוכות ----------
const c3: WordEntry[] = [
  w('tapuach', 'תַּפּוּחַ', 'תפוח', 'food-apple.svg', 'tapuach', 5, 3),
  w('otobus', 'אוֹטוֹבּוּס', 'אוטובוס', 'bus.svg', 'otobus', 5, 3),
  w('mechonit', 'מְכוֹנִית', 'מכונית', 'car.svg', 'mechonit', 4, 3),
  w('iparon', 'עִפָּרוֹן', 'עפרון', 'pencil.svg', 'iparon', 4, 3),
  w('mishkafayim', 'מִשְׁקָפַיִם', 'משקפיים', 'sunglasses.svg', 'mishkafayim', 3, 3),
  w('tzaatzua', 'צַעֲצוּעַ', 'צעצוע', 'toy-brick.svg', 'tzaatzua', 5, 3),
  w('ofanayim', 'אוֹפַנַּיִם', 'אופניים', 'bicycle.svg', 'ofanayim', 4, 3),
  w('matriya', 'מַטְרִיָּה', 'מטרייה', 'umbrella.svg', 'matriya', 3, 3),
  w('muzika', 'מוּזִיקָה', 'מוזיקה', 'music-note.svg', 'muzika', 5, 3),
  w('matana', 'מַתָּנָה', 'מתנה', 'gift.svg', 'matana', 1, 3),
]

// ---------- משפטים ----------
const c4: WordEntry[] = [
  w('s_dog', 'הַכֶּלֶב רָץ', 'הכלב רץ', 'dog.svg', 'ha-kelev ratz', 5, 4),
  w('s_cat', 'הֶחָתוּל יָשֵׁן', 'החתול ישן', 'cat.svg', 'he-chatul yashen', 5, 4),
  w('s_apple', 'הַיֶּלֶד אוֹכֵל תַּפּוּחַ', 'הילד אוכל תפוח', 'food-apple.svg', 'ha-yeled ochel tapuach', 5, 4),
  w('s_fish', 'הַדָּג שׂוֹחֶה בַּמַּיִם', 'הדג שוחה במים', 'fish.svg', 'ha-dag socheh ba-mayim', 5, 4),
  w('s_bird', 'הַצִּפּוֹר עָפָה', 'הציפור עפה', 'bird.svg', 'ha-tzipor afa', 5, 4),
  w('s_car', 'אַבָּא נוֹסֵעַ בַּמְּכוֹנִית', 'אבא נוסע במכונית', 'car.svg', 'aba nosea ba-mechonit', 5, 4),
  w('s_sun', 'הַשֶּׁמֶשׁ זוֹרַחַת', 'השמש זורחת', 'weather-sunny.svg', 'ha-shemesh zorachat', 5, 4),
  w('s_cake', 'אִמָּא אוֹפָה עוּגָה', 'אמא אופה עוגה', 'cake-variant.svg', 'ima ofa uga', 5, 4),
  w('s_horse', 'הַסּוּס דּוֹהֵר בַּשָּׂדֶה', 'הסוס דוהר בשדה', 'horse.svg', 'ha-sus doher ba-sade', 5, 4),
  w('s_butter', 'הַפַּרְפַּר עָף בַּגַּן', 'הפרפר עף בגן', 'butterfly.svg', 'ha-parpar af ba-gan', 5, 4),
  w('s_milk', 'הַיֶּלֶד שׁוֹתֶה חָלָב', 'הילד שותה חלב', 'glass-mug-variant.svg', 'ha-yeled shoteh chalav', 5, 4),
  w('s_elephant', 'הַפִּיל גָּדוֹל מְאוֹד', 'הפיל גדול מאוד', 'elephant.svg', 'ha-pil gadol meod', 5, 4),
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
  starsToComplete: Math.min(8, words.length),
})

export const curriculum: Curriculum = {
  stages: [
    stage(1, 1, 'אַבָּא קָמָץ', n1c1),
    stage(2, 1, 'אֶצְבַּע סֶגוֹל', n2c1),
    stage(3, 1, 'אִי חִירִיק', n3c1),
    stage(4, 1, 'אוֹר חוֹלָם', n4c1),
    stage(5, 1, 'אוּף שׁוּרוּק', n5c1),
    stage(1, 2, 'קָמָץ - שְׁתֵּי הֲבָרוֹת', n1c2),
    stage(2, 2, 'סֶגוֹל - שְׁתֵּי הֲבָרוֹת', n2c2),
    stage(3, 2, 'חִירִיק - שְׁתֵּי הֲבָרוֹת', n3c2),
    stage(4, 2, 'חוֹלָם - שְׁתֵּי הֲבָרוֹת', n4c2),
    stage(5, 2, 'שׁוּרוּק - שְׁתֵּי הֲבָרוֹת', n5c2),
    stage(5, 3, 'מִילִּים אֲרֻכּוֹת', c3),
    stage(5, 4, 'מִשְׁפָּטִים', c4),
  ],
}

export const allWords: WordEntry[] = curriculum.stages.flatMap((s) => s.words)
