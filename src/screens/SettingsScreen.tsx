import { useState } from 'react'
import type { Progress } from '../storage/progress'
import { useSpeech } from '../audio/useSpeech'

export function SettingsScreen({
  progress,
  onChange,
  onReset,
}: {
  progress: Progress
  onChange: (settings: Progress['settings']) => void
  onReset: () => void
}) {
  const speech = useSpeech(progress.settings.ttsRate)
  const [confirming, setConfirming] = useState(false)

  const s = progress.settings

  return (
    <div>
      <div className="section-title">הַגְדָּרוֹת הוֹרֶה</div>

      <div className="settings-card">
        <h3>קוֹל וְהַקְרָאָה</h3>
        <div className="row">
          <span>מְהִירוּת הַקְרָאָה</span>
          <input
            type="range"
            min={0.5}
            max={1.1}
            step={0.05}
            value={s.ttsRate}
            onChange={(e) => onChange({ ...s, ttsRate: Number(e.target.value) })}
          />
        </div>
        <div className="row">
          <span>בְּדִיקַת קוֹל</span>
          <button className="speak-btn" onClick={() => speech.say('שָׁלוֹם, בּוֹא נִקְרָא יַחַד')}>
            🔊 נַגֵּן
          </button>
        </div>
        {!speech.supported && (
          <p className="note">הַדַּפְדְּפָן לֹא תּוֹמֵךְ בְּהַקְרָאָה. הַמִּשְׂחָק יַעֲבֹד עִם תְּמוּנוֹת.</p>
        )}
        {speech.supported && !speech.hasHebrew && (
          <p className="note">
            לֹא נִמְצָא קוֹל עִבְרִי בַּמַּכְשִׁיר. מִשְׂחַק "הַקְשֵׁב וּבְחַר" מֻשְׁבָּת, וְהַכֹּל
            עוֹבֵד עִם תְּמוּנוֹת.
          </p>
        )}
      </div>

      <div className="settings-card">
        <h3>תְּצוּגָה</h3>
        <div className="row">
          <span>הַצֵּג תַּעְתִּיק לָטִינִי (עֵזֶר לְהוֹרֶה)</span>
          <button
            className={`switch ${s.showTranslit ? 'on' : ''}`}
            onClick={() => onChange({ ...s, showTranslit: !s.showTranslit })}
            aria-label="תעתיק"
          />
        </div>
      </div>

      <div className="settings-card">
        <h3>הִתְקַדְּמוּת</h3>
        {confirming ? (
          <div className="row">
            <span className="danger">לְאַפֵּס הַכֹּל?</span>
            <span style={{ display: 'flex', gap: 8 }}>
              <button
                className="speak-btn"
                onClick={() => {
                  onReset()
                  setConfirming(false)
                }}
              >
                כֵּן, אַפֵּס
              </button>
              <button className="speak-btn" onClick={() => setConfirming(false)}>
                בִּטּוּל
              </button>
            </span>
          </div>
        ) : (
          <div className="row">
            <span>אִפּוּס הִתְקַדְּמוּת וְכוֹכָבִים</span>
            <button className="speak-btn danger" onClick={() => setConfirming(true)}>
              אַפֵּס
            </button>
          </div>
        )}
      </div>

      <p className="note">
        הָאַיְקוֹנִים: Material Design Icons (Apache 2.0). הַשֵּׁמַע: קוֹל הַמַּכְשִׁיר.
      </p>
    </div>
  )
}
