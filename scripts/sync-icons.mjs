// מעתיק את כל אייקוני ה-SVG שבשימוש (לפי src/data) מחבילת @mdi/svg
// אל public/images/icons/, ומסיר אייקונים יתומים שכבר לא בשימוש.
// מריצים: npm run sync-icons
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, copyFileSync, unlinkSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dataDir = join(root, 'src', 'data')
const srcIcons = join(root, 'node_modules', '@mdi', 'svg', 'svg')
const outDir = join(root, 'public', 'images', 'icons')

const names = new Set()
for (const file of readdirSync(dataDir)) {
  if (!file.endsWith('.ts')) continue
  const content = readFileSync(join(dataDir, file), 'utf8')
  for (const m of content.matchAll(/'([a-z0-9-]+)\.svg'/g)) names.add(m[1])
}

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

const missing = []
let copied = 0
for (const name of [...names].sort()) {
  const from = join(srcIcons, `${name}.svg`)
  if (!existsSync(from)) {
    missing.push(name)
    continue
  }
  copyFileSync(from, join(outDir, `${name}.svg`))
  copied++
}

// מחיקת אייקונים יתומים שלא נמצאים יותר ב-data
let removed = 0
for (const f of readdirSync(outDir)) {
  if (!f.endsWith('.svg')) continue
  const base = f.replace(/\.svg$/, '')
  if (!names.has(base)) {
    unlinkSync(join(outDir, f))
    removed++
  }
}

const credits = `# קרדיטים לאיורים

האייקונים באפליקציה לקוחים מ-**Material Design Icons** (Pictogrammers),
המופצים תחת רישיון **Apache License 2.0**.

מקור: https://github.com/Templarian/MaterialDesign
חבילה: @mdi/svg

האייקונים הומרו לקבצי SVG בודדים והותאמו בצבע בזמן הריצה (CSS mask).
`
writeFileSync(join(outDir, 'CREDITS.md'), credits)

console.log(`synced ${copied} icons (-${removed} orphan) -> public/images/icons/`)
if (missing.length) {
  console.error(`MISSING icons (not found in @mdi/svg): ${missing.join(', ')}`)
  process.exit(1)
}
