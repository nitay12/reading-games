# חֲבֵרִי הַקָּסוּם — משחק תרגול קריאה עם ניקוד

אפליקציית ווב לתרגול קריאת עברית מנוקדת לילדים, עם דמות (יצור שגדל מביצה לחד-קרן)
שמתפתחת ככל שאוספים כוכבים.

## איך משחקים
- **בחר תמונה**: מוצגת מילה מנוקדת, והילד בוחר את האיור המתאים.
- **הקשב ובחר**: המכשיר מקריא מילה (קול עברי), והילד בוחר את המילה הכתובה הנכונה.
- מתקדמים לפי שני צירים: **ניקוד** (קמץ/פתח → צירה/סגול → חיריק → חולם → שורוק/קובוץ)
  ו**מורכבות מילה** (הברה אחת → שתי הברות → מילים ארוכות → משפטים).

## פיתוח מקומי
```bash
npm install
npm run dev        # שרת פיתוח (http://localhost:5173/reading-games/)
npm run build      # בנייה לפרודקשן (כולל סנכרון אייקונים)
npm run smoke      # בדיקת לוגיקה מהירה
```

## תוכן ואיורים
- אוצר המילים מוגדר ב-`src/data/curriculum.ts`.
- האיורים הם **Material Design Icons** (רישיון Apache 2.0), נצבעים בזמן ריצה.
  הם נשמרים ב-`public/images/icons/` ומסונכרנים מ-`@mdi/svg` עם `npm run sync-icons`.

## פריסה ל-GitHub Pages (בלי מחשב)
הפריסה אוטומטית דרך GitHub Actions בכל push (ראו `.github/workflows/deploy.yml`).
**צעדים חד-פעמיים שצריך לבצע פעם אחת בהגדרות ה-repo (אפשר מהטלפון):**

1. **Settings → Pages → Source** = `GitHub Actions`.
2. **Settings → Environments → `github-pages` → Deployment branches** — להוסיף את הענף
   `claude/hebrew-vowel-practice-game-aIJST` (או לבחור "All branches"), כדי שהפריסה מהענף תאושר.
   *(לחלופין: למזג ל-main והפריסה תרוץ משם.)*

אחרי הפריסה האתר יהיה זמין בכתובת:
`https://nitay12.github.io/reading-games/`
