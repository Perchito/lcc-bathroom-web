import Icon from './Icon.jsx'

export default function Stars({ rating = 5, size = 16 }) {
  return (
    <span
      className="stars"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" size={size} filled={i < rating} />
      ))}
    </span>
  )
}
