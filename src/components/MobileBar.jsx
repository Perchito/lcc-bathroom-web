import { company } from '../data/site.js'

// Thumb-reach call / quote buttons, phones only (hidden by CSS above 760px).
export default function MobileBar() {
  return (
    <div className="mobilebar">
      <a href={company.phoneHref} className="mobilebar__btn">
        Call us
      </a>
      <a href="#contact" className="mobilebar__btn mobilebar__btn--brass">
        Free quote
      </a>
    </div>
  )
}
