// Understated star row for the client notes section.
export default function Stars({ rating = 5 }) {
  return (
    <span
      className="note__stars"
      role="img"
      aria-label={`${rating} out of 5`}
    >
      {Array.from({ length: rating }, (_, i) => (
        <span key={i} aria-hidden="true">
          &#9733;
        </span>
      ))}
    </span>
  )
}
