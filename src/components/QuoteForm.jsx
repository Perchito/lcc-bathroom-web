import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// Quote request → LCC Leads (POST /api/public/enquiry). The lists must match lib/model.mjs in lcc-leads.
// Marketing permission is optional and per channel; replying about the quote itself doesn't need it.
// Asked one question at a time: the tap-to-answer steps move on by themselves, contact details come last.
const ENDPOINT = `${import.meta.env.VITE_LEADS_URL || 'https://leads.perchito.app'}/api/public/enquiry`
const TYPES = [
  ['full', 'Full bathroom renovation'], ['replacement', 'Bathroom replacement'], ['shower', 'Shower installation'],
  ['wet-room', 'Wet room'], ['en-suite', 'En-suite renovation'], ['repairs', 'Bathroom repairs'],
  ['accessible', 'Accessible bathroom'], ['commercial', 'Commercial bathroom project'], ['other', 'Something else'],
]
const SCOPES = [['full', 'The whole room'], ['partial', 'Just part of it'], ['', 'Not sure yet']]
const BUDGETS = ['Under £3,000', '£3,000–£5,000', '£5,000–£8,000', '£8,000–£12,000', '£12,000–£20,000', '£20,000+', 'Not sure']
const TIMEFRAMES = ['As soon as possible', 'Within 1 month', '1–3 months', '3–6 months', '6+ months', 'Just researching']
const OWNERS = [['owner', 'Yes, I own it'], ['landlord', "I'm the landlord"], ['tenant', 'I rent it'], ['agent', 'I manage it']]
const CHANNELS = [['phone', 'Call'], ['whatsapp', 'WhatsApp'], ['email', 'Email'], ['sms', 'Text']]
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

// A grid of one-tap answers. Picking one records it and moves to the next step.
function Choices({ name, options, value, onPick, cols = 2 }) {
  return (
    <div className={`qz__choices qz__choices--${cols}`} role="radiogroup" aria-label={name}>
      {options.map(([v, label]) => (
        <button
          key={label}
          type="button"
          role="radio"
          aria-checked={value === v}
          className={'qz__choice' + (value === v ? ' is-on' : '')}
          onClick={() => onPick(v)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

const STEPS = ['type', 'scope', 'timeframe', 'budget', 'where', 'contact']

export default function QuoteForm() {
  const started = useRef(Date.now())
  const head = useRef(null)
  const box = useRef(null)
  const [step, setStep] = useState(0)
  const [a, setA] = useState({
    enquiry_type: '', scope: null, timeframe: '', budget: null, postcode: '', owns_property: '',
    name: '', telephone: '', email: '', preferred_channel: 'phone', address: '', details: '',
    consent_email: false, consent_sms: false, consent_whatsapp: false, website: '',
  })
  const [state, setState] = useState('idle') // idle | sending | sent
  const [error, setError] = useState('')
  const [photos, setPhotos] = useState([])
  const moved = useRef(false)

  const set = (k) => (e) => {
    setError('')
    setA((s) => ({ ...s, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))
  }
  const pick = (k) => (v) => {
    setA((s) => ({ ...s, [k]: v }))
    setError('')
    setTimeout(() => setStep((n) => Math.min(n + 1, STEPS.length - 1)), 180)
  }
  const back = () => { setError(''); setStep((n) => Math.max(0, n - 1)) }

  // Move focus to the new question so keyboard and screen-reader users follow along,
  // and bring it back on screen if a shorter step left it above the viewport (phones).
  useEffect(() => {
    if (moved.current) {
      head.current?.focus({ preventScroll: true })
      const top = box.current?.getBoundingClientRect().top ?? 0
      if (top < 80) box.current.scrollIntoView({ block: 'start' })
    }
    moved.current = true
  }, [step, state])

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

  function next(e) {
    e.preventDefault()
    if (STEPS[step] === 'where') {
      if (a.postcode.trim().length < 5) return setError('Please enter your full postcode.')
      setError('')
      return setStep((n) => n + 1)
    }
    submit()
  }

  async function submit() {
    if (!a.name.trim()) return setError('Please tell us your name.')
    if (!a.telephone.trim() && !a.email.trim()) return setError('Please give us a phone number or an email address.')
    setError('')
    setState('sending')
    try {
      const r = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...a,
          scope: a.scope || '',
          budget: a.budget || '',
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
      <div className="quote qz quote--done" role="status" ref={box}>
        <p className="qz__kicker">Request sent</p>
        <h3 ref={head} tabIndex={-1}>Thank you{a.name ? `, ${a.name.trim().split(' ')[0]}` : ''}. We have your request.</h3>
        <p>We&rsquo;ll be in touch within one working day to talk it through and arrange a free visit.</p>
      </div>
    )
  }

  const id = STEPS[step]
  const alert = error && <p className="quote__error" role="alert">{error}</p>
  const typeLabel = TYPES.find(([v]) => v === a.enquiry_type)?.[1]

  return (
    <form className="quote qz" onSubmit={next} noValidate ref={box}>
      <div className="qz__top">
        <p className="qz__kicker">Free quote · step {step + 1} of {STEPS.length}</p>
        {step > 0 && (
          <button type="button" className="qz__back" onClick={back}>
            &larr; Back
          </button>
        )}
      </div>
      <div className="qz__bar" aria-hidden="true">
        <span style={{ transform: `scaleX(${(step + 1) / STEPS.length})` }} />
      </div>

      <div className="qz__step" key={id}>
        {id === 'type' && (
          <>
            <h3 ref={head} tabIndex={-1}>What can we help you with?</h3>
            <Choices name="Type of work" options={TYPES} value={a.enquiry_type} onPick={pick('enquiry_type')} cols={3} />
          </>
        )}

        {id === 'scope' && (
          <>
            <h3 ref={head} tabIndex={-1}>Is it the whole room, or just part of it?</h3>
            {typeLabel && <p className="qz__note">{typeLabel}</p>}
            <Choices name="Full or partial" options={SCOPES} value={a.scope} onPick={pick('scope')} cols={3} />
          </>
        )}

        {id === 'timeframe' && (
          <>
            <h3 ref={head} tabIndex={-1}>When would you like to start?</h3>
            <Choices name="When to start" options={TIMEFRAMES.map((t) => [t, t])} value={a.timeframe} onPick={pick('timeframe')} cols={3} />
          </>
        )}

        {id === 'budget' && (
          <>
            <h3 ref={head} tabIndex={-1}>Roughly what budget do you have in mind?</h3>
            <p className="qz__note">It helps us suggest the right options. Fine to skip.</p>
            <Choices
              name="Budget"
              options={[...BUDGETS.map((b) => [b, b]), ['', 'Prefer not to say']]}
              value={a.budget}
              onPick={pick('budget')}
              cols={4}
            />
          </>
        )}

        {id === 'where' && (
          <>
            <h3 ref={head} tabIndex={-1}>Where is the property?</h3>
            <label className="qz__field">
              Postcode
              <input
                value={a.postcode}
                onChange={set('postcode')}
                autoComplete="postal-code"
                maxLength={10}
                placeholder="e.g. SE15 4QF"
                autoCapitalize="characters"
              />
            </label>
            <p className="qz__sub">Is the property yours? <span>(optional)</span></p>
            <div className="qz__choices qz__choices--4" role="radiogroup" aria-label="Is the property yours?">
              {OWNERS.map(([v, label]) => (
                <button
                  key={v}
                  type="button"
                  role="radio"
                  aria-checked={a.owns_property === v}
                  className={'qz__choice qz__choice--sm' + (a.owns_property === v ? ' is-on' : '')}
                  onClick={() => setA((s) => ({ ...s, owns_property: s.owns_property === v ? '' : v }))}
                >
                  {label}
                </button>
              ))}
            </div>
            {alert}
            <button className="quote__send">Continue</button>
          </>
        )}

        {id === 'contact' && (
          <>
            <h3 ref={head} tabIndex={-1}>Last step: how can we reach you?</h3>
            <div className="quote__grid">
              <label className="qz__field quote__wide">
                Your name
                <input value={a.name} onChange={set('name')} autoComplete="name" maxLength={120} />
              </label>
              <label className="qz__field">
                Phone
                <input value={a.telephone} onChange={set('telephone')} type="tel" autoComplete="tel" maxLength={30} />
              </label>
              <label className="qz__field">
                Email
                <input value={a.email} onChange={set('email')} type="email" autoComplete="email" maxLength={200} />
              </label>
            </div>
            <p className="qz__note">A phone number or an email is enough.</p>

            <p className="qz__sub">Best way to reach you</p>
            <div className="qz__choices qz__choices--4" role="radiogroup" aria-label="Best way to reach you">
              {CHANNELS.map(([v, label]) => (
                <button
                  key={v}
                  type="button"
                  role="radio"
                  aria-checked={a.preferred_channel === v}
                  className={'qz__choice qz__choice--sm' + (a.preferred_channel === v ? ' is-on' : '')}
                  onClick={() => setA((s) => ({ ...s, preferred_channel: v }))}
                >
                  {label}
                </button>
              ))}
            </div>

            <details className="qz__more">
              <summary>Add photos, address or notes (optional)</summary>
              <label className="qz__field">
                House number and street
                <input value={a.address} onChange={set('address')} autoComplete="address-line1" maxLength={200} />
              </label>
              <label className="qz__field">
                Anything else we should know?
                <textarea value={a.details} onChange={set('details')} rows={3} maxLength={4000} />
              </label>
              <div className="quote__photos">
                <label className="quote__file">
                  Photos of the room (up to {MAX_PHOTOS})
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
            </details>

            <fieldset className="quote__consent">
              <legend>Offers and news (optional)</legend>
              <p>We&rsquo;ll only use your details to reply about this request. Tick if you&rsquo;d also like occasional offers from us. You can stop them at any time.</p>
              <label><input type="checkbox" checked={a.consent_email} onChange={set('consent_email')} /> By email</label>
              <label><input type="checkbox" checked={a.consent_sms} onChange={set('consent_sms')} /> By text message</label>
              <label><input type="checkbox" checked={a.consent_whatsapp} onChange={set('consent_whatsapp')} /> By WhatsApp</label>
            </fieldset>

            {/* honeypot: hidden from people, filled in by bots */}
            <input type="text" name="website" value={a.website} onChange={set('website')} tabIndex={-1} autoComplete="off" className="quote__hp" aria-hidden="true" />

            {alert}
            <button className="quote__send" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send my request'}</button>
            <p className="quote__fine">See our <Link to="/privacy">privacy notice</Link> for how we use and keep your details.</p>
          </>
        )}

        {id !== 'where' && id !== 'contact' && alert}
      </div>
    </form>
  )
}
