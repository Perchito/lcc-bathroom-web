import { company } from '../data/site.js'

// Plain-English privacy notice for the quote form, Facebook / Instagram lead forms and WhatsApp.
// Keep it in step with what LCC Leads actually does (retention = Admin → Settings there).
export default function Privacy() {
  return (
    <section className="section">
      <div className="wrap prose">
        <p className="label">Your details</p>
        <h1 className="display">Privacy notice</h1>

        <h2>Who we are</h2>
        <p>{company.name} is responsible for the personal details you give us. Contact us about anything in this notice at{' '}
          <a href={`mailto:${company.email}`}>{company.email}</a> or {company.phone}.</p>

        <h2>What we collect</h2>
        <p>When you ask for a quote (on this website, through a Facebook or Instagram form, by WhatsApp, phone or email) we keep your name,
          phone number, email, the property's postcode and address, what work you're thinking about, your budget and timing, any photos you send,
          and our messages with you.</p>

        <h2>Why, and on what basis</h2>
        <ul>
          <li><strong>To reply, visit and quote</strong>, because you asked us to (steps before a contract).</li>
          <li><strong>To carry out and guarantee the work</strong> if you go ahead (contract), and to keep the records the law requires.</li>
          <li><strong>To send you offers and news</strong>, only if you ticked the box for that channel (consent). You can stop at any time by replying STOP,
            using the unsubscribe link or telling us.</li>
        </ul>
        <p>We don't buy contact lists, and we don't contact people just because of public property records.</p>

        <h2>Who sees it</h2>
        <p>Our own team. Your details are stored on our own server in the UK. We use Google Workspace for email, and Meta (Facebook, Instagram,
          WhatsApp) if you contact us there. We never sell your details.</p>

        <h2>How long we keep it</h2>
        <p>If you don't go ahead, we delete your details 24 months after we were last in touch. If you become a customer, we keep job and invoice
          records for 6 years, as tax law requires.</p>

        <h2>Your rights</h2>
        <p>You can ask for a copy of your details, ask us to correct or delete them, object to how we use them, or withdraw consent for offers.
          Just contact us. If you're unhappy with how we handled your details, you can complain to the Information Commissioner's Office
          (<a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a>).</p>
      </div>
    </section>
  )
}
