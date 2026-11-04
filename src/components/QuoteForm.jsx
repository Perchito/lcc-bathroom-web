import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// Quote request → LCC Leads (POST /api/public/enquiry). The lists must match lib/model.mjs in lcc-leads.
// Marketing permission is optional and per channel; replying about the quote itself doesn't need it.
const ENDPOINT = `${import.meta.env.VITE_LEADS_URL || 'https://leads.perchito.app'}/api/public/enquiry`
const TYPES = [
  ['full', 'Full bathroom renovation'], ['replacement', 'Bathroom replacement'], ['shower', 'Shower installation'],
  ['wet-room', 'Wet room'], ['en-suite', 'En-suite renovation'], ['repairs', 'Bathroom repairs'],
  ['accessible', 'Accessible bathroom'], ['commercial', 'Commercial bathroom project'], ['other', 'Something else'],
]
const BUDGETS = ['Under £3,000', '£3,000–£5,000', '£5,000–£8,000', '£8,000–£12,000', '£12,000–£20,000', '£20,000+', 'Not sure']
const TIMEFRAMES = ['As soon as possible', 'Within 1 month', '1–3 months', '3–6 months', '6+ months', 'Just researching']
const MAX_PHOTOS = 6

// Keep the ad tags from the page they landed on, even after they click around the site
const TRACK_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid']
function tracking() {
  try {
    const qs = new URLSearchParams(window.location.search)
    const fresh = Object.fromEntries(TRACK_KEYS.filter((k) => qs.get(k)).map((k) => [k, qs.get(k)]))
    if (Object.keys(fresh).length) sessionStorage.setItem('lcc_tracking', JSON.stringify(fresh))
    return { ...JSON.parse(sessionStorage.getItem('lcc_tracking') || '{}'), page: window.location.pathname }
  } catch {
    return { page: window.location.pathname }
  }
}
tracking()

// Phone photos are big: shrink to 1600px JPEG in the browser before sending
async function shrink(file) {
  const img = await createImageBitmap(file)
  const scale = Math.min(1, 1600 / Math.max(img.width, img.height))
  const c = document.createElement('canvas')
  c.width = Math.round(img.width * scale)
  c.height = Math.round(img.height * scale)
  c.getContext('2d').drawImage(img, 0, 0, c.width, c.height)
  return c.toDataURL('image/jpeg', 0.8)
}

export default function QuoteForm() {
  const started = useRef(Date.now())
  const [state, setState] = useState('idle') // idle | sending | sent
  const [error, setError] = useState('')
  const [photos, setPhotos] = useState([])

  async function pickPhotos(e) {
    const files = [...e.target.files].slice(0, MAX_PHOTOS - photos.length)
    e.target.value = ''
    try {
      const shrunk = await Promise.all(files.map(shrink))
      setPhotos((p) => [...p, ...shrunk].slice(0, MAX_PHOTOS))
    } catch {
      setError('One of those photos could not be read. Try a JPEG or PNG.')
    }
  }

  async function submit(e) {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.target))
    if (!f.telephone && !f.email) return setError('Please give us a phone number or an email address.')
    setError('')
    setState('sending')
    try {
      const r = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...f,
          consent_email: f.consent_email === 'on',
          consent_sms: f.consent_sms === 'on',
          consent_whatsapp: f.consent_whatsapp === 'on',
          photos,
          tracking: tracking(),
          elapsed: Date.now() - started.current,
        }),
      })
      if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || 'Something went wrong.')
      setState('sent')
    } catch (err) {
      setError(`${err.message} You can also call us.`)
      setState('idle')
    }
  }

  if (state === 'sent') {
    return (
      <div className="quote quote--done" role="status">
        <h3>Thank you, we have your request.</h3>
        <p>We'll be in touch within one working day to talk it through and arrange a free visit.</p>
      </div>
    )
  }

  return (
    <form className="quote" onSubmit={submit}>
      <h3>Request a free quote</h3>
      <div className="quote__grid">
        <label>Full name *<input name="name" required autoComplete="name" maxLength={120} /></label>
        <label>Phone<input name="telephone" type="tel" autoComplete="tel" maxLength={30} /></label>
        <label>Email<input name="email" type="email" autoComplete="email" maxLength={200} /></label>
        <label>Postcode *<input name="postcode" required autoComplete="postal-code" maxLength={10} /></label>
        <label className="quote__wide">House number and street<input name="address" autoComplete="address-line1" maxLength={200} /></label>
        <label>Type of work
          <select name="enquiry_type" defaultValue="full">{TYPES.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>
        </label>
        <label>Full or partial
          <select name="scope" defaultValue=""><option value="">Not sure yet</option><option value="full">Full renovation</option><option value="partial">Partial</option></select>
        </label>
        <label>Budget
          <select name="budget" defaultValue=""><option value="">Prefer not to say</option>{BUDGETS.map((b) => <option key={b}>{b}</option>)}</select>
        </label>
        <label>When would you like to start?
          <select name="timeframe" defaultValue=""><option value="">Not sure</option>{TIMEFRAMES.map((t) => <option key={t}>{t}</option>)}</select>
        </label>
        <label>Is the property yours?
          <select name="owns_property" defaultValue="owner"><option value="owner">Yes, I own it</option><option value="landlord">I'm the landlord</option>
            <option value="tenant">I rent it</option><option value="agent">I manage it for someone</option></select>
        </label>
        <label>Best way to reach you
          <select name="preferred_channel" defaultValue="phone"><option value="phone">Phone call</option><option value="whatsapp">WhatsApp</option>
            <option value="email">Email</option><option value="sms">Text message</option></select>
        </label>
        <label className="quote__wide">Anything else we should know?<textarea name="details" rows={3} maxLength={4000} /></label>
      </div>

      <div className="quote__photos">
        <label className="quote__file">
          Add photos of the room (optional, up to {MAX_PHOTOS})
          <input type="file" accept="image/*" multiple onChange={pickPhotos} disabled={photos.length >= MAX_PHOTOS} />
        </label>
        {photos.length > 0 && (
          <div className="quote__thumbs">
            {photos.map((src, i) => (
              <button type="button" key={i} onClick={() => setPhotos((p) => p.filter((_, j) => j !== i))} aria-label={`Remove photo ${i + 1}`}>
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        )}
      </div>

      <fieldset className="quote__consent">
        <legend>Offers and news (optional)</legend>
        <p>We'll only use your details to reply about this request. Tick if you'd also like occasional offers from us. You can stop them at any time.</p>
        <label><input type="checkbox" name="consent_email" /> By email</label>
        <label><input type="checkbox" name="consent_sms" /> By text message</label>
        <label><input type="checkbox" name="consent_whatsapp" /> By WhatsApp</label>
      </fieldset>

      {/* honeypot: hidden from people, filled in by bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="quote__hp" aria-hidden="true" />

      {error && <p className="quote__error" role="alert">{error}</p>}
      <button className="quote__send" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send my request'}</button>
      <p className="quote__fine">See our <Link to="/privacy">privacy notice</Link> for how we use and keep your details.</p>
    </form>
  )
}
