import { useState, type ReactNode } from 'react'
import { creatureStages } from '../data/creature'
import { CreatureImage } from '../components/CreatureAvatar'

interface Slide {
  id: string
  title: string
  visual: ReactNode
  body: ReactNode
}

const SLIDES: Slide[] = [
  {
    id: 'welcome',
    title: 'בְּרוּכִים הַבָּאִים לְ"חֲבֵרִי הַקָּסוּם"',
    visual: <CreatureImage icon="5-dragon.gif" color="#ef476f" alt="דרקון" size={160} />,
    body: (
      <>
        <p>מִשְׂחָק לְתִרְגּוּל קְרִיאַת עִבְרִית מְנֻקֶּדֶת לְבָנֵי 6-7.</p>
        <p>
          הַיֶּלֶד מִתְקַדֵּם דֶּרֶךְ <b>5 רָמוֹת נִקּוּד</b> (קָמָץ → שׁוּרוּק)
          וּ-<b>4 רָמוֹת מוּרְכָּבוּת</b> (הֲבָרָה אַחַת → מִשְׁפָּטִים).
        </p>
      </>
    ),
  },
  {
    id: 'how',
    title: 'אֵיךְ מְשַׂחֲקִים?',
    visual: <div style={{ fontSize: '3.4rem' }}>🖼️ + 🔊</div>,
    body: (
      <>
        <p>
          <b>בְּחַר תְּמוּנָה</b> — הַיֶּלֶד קוֹרֵא מִילָה וּבוֹחֵר אֶת הָאִיּוּר הַמַּתְאִים.
        </p>
        <p>
          <b>הַקְשֵׁב וּבְחַר</b> — הַמַּכְשִׁיר מַקְרִיא, וְהַיֶּלֶד בּוֹחֵר אֶת הַמִּילָה
          הַכְּתוּבָה הַנְּכוֹנָה (מְחַדֵּד אַבְחָנַת נִקּוּד).
        </p>
        <p className="note">טָעוּת אֵינָהּ מַעֲנִישָׁה — הַיֶּלֶד פָּשׁוּט מְנַסֶּה שׁוּב 🙂</p>
      </>
    ),
  },
  {
    id: 'creature',
    title: 'הַדְּמוּת גְּדֵלָה אִתְּכֶם',
    visual: (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {creatureStages.map((c) => (
          <CreatureImage key={c.level} icon={c.icon} color={c.color} alt={c.name} size={56} />
        ))}
      </div>
    ),
    body: (
      <>
        <p>
          כָּל תְּשׁוּבָה נְכוֹנָה ⭐ הִיא צַעַד קָדִימָה. הַדְּמוּת מִתְפַּתַּחַת בְּ-6 שְׁלָבִים:
          בֵּיצָה → סְלַיים → נָחָשׁ → זוֹחֵל → דַּיְנוֹ → <b>דְּרָקוֹן אַדִּיר</b>.
        </p>
        <p className="note">לוֹחֲצִים עַל הַדְּמוּת בַּסַּרְגֵּל הָעֶלְיוֹן כְּדֵי לִרְאוֹת אֶת הַהִתְקַדְּמוּת.</p>
      </>
    ),
  },
  {
    id: 'tips',
    title: 'טִיפִּים לִפְנֵי שֶׁמַּתְחִילִים',
    visual: <div style={{ fontSize: '3.4rem' }}>💡</div>,
    body: (
      <>
        <ul className="onboarding-list">
          <li>🪑 שְׁבוּ לְיַד הַיֶּלֶד בַּפְּעָמִים הָרִאשׁוֹנוֹת וְעוֹדְדוּ אוֹתוֹ לִקְרֹא בְּקוֹל רָם.</li>
          <li>🔊 אִם אֵין קוֹל עִבְרִי בַּמַּכְשִׁיר — מַצַּב "הַקְשֵׁב" נִכְבֶּה אוֹטוֹמָטִית וְהַכֹּל עוֹבֵד עִם תְּמוּנוֹת.</li>
          <li>🍎 בְּ-iOS צָרִיךְ לִלְחֹץ פַּעַם רִאשׁוֹנָה עַל כַּפְתּוֹר "שְׁמַע" כְּדֵי לְהַפְעִיל אֶת הַשֶּׁמַע.</li>
          <li>⚙️ בְּמָסַךְ הַהַגְדָּרוֹת אֶפְשָׁר לְשַׁנּוֹת מְהִירוּת הַקְרָאָה, לְהַצִּיג תַּעְתִּיק לָטִינִי, וּלְאַפֵּס.</li>
        </ul>
      </>
    ),
  },
]

export function OnboardingScreen({ onFinish }: { onFinish: () => void }) {
  const [i, setI] = useState(0)
  const slide = SLIDES[i]
  const last = i === SLIDES.length - 1

  return (
    <div className="onboarding">
      <button className="onboarding-skip" onClick={onFinish}>
        דַּלֵּג
      </button>

      <div className="onboarding-visual">{slide.visual}</div>
      <h1 className="onboarding-title">{slide.title}</h1>
      <div className="onboarding-body">{slide.body}</div>

      <div className="onboarding-dots" aria-hidden>
        {SLIDES.map((s, idx) => (
          <i key={s.id} className={idx === i ? 'on' : ''} />
        ))}
      </div>

      <div className="onboarding-actions">
        {i > 0 && (
          <button className="btn-ghost" onClick={() => setI(i - 1)}>
            ← הַקּוֹדֵם
          </button>
        )}
        <button
          className="btn-primary"
          onClick={() => (last ? onFinish() : setI(i + 1))}
        >
          {last ? 'בּוֹאוּ נַתְחִיל ✨' : 'הַבָּא →'}
        </button>
      </div>
    </div>
  )
}
