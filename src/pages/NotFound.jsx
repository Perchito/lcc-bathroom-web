import { Link } from 'react-router-dom'

// Shown for any URL we don't have. The build writes it to dist/404.html, which
// Cloudflare serves with a real 404 status.
export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap prose">
        <p className="label">404</p>
        <h1 className="display">We can't find that page</h1>
        <p>
          It may have moved. Try the <Link to="/">homepage</Link>, see <Link to="/services">our services</Link> or{' '}
          <Link to="/gallery">recent projects</Link>, or <a href="#quote">ask us for a quote</a>.
        </p>
      </div>
    </section>
  )
}
