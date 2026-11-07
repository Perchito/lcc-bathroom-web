// Thin line icons (24px grid, stroke = currentColor).
const PATHS = {
  phone: 'M6.6 3.5 9 3l1.6 4.2-2 1.3a12 12 0 0 0 6.9 6.9l1.3-2L21 15l-.5 2.4a2.2 2.2 0 0 1-2.3 1.7C10.5 18.5 5.5 13.5 4.9 5.8a2.2 2.2 0 0 1 1.7-2.3Z',
  mail: 'M3.5 6.5h17v11h-17zM3.8 6.8 12 13l8.2-6.2',
  pin: 'M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  calendar: 'M4 6.5h16v13H4zM4 10.5h16M8 4v4M16 4v4M9.5 15.5l1.8 1.5 3.2-3.5',
  layers: 'M12 4 3.5 8.5 12 13l8.5-4.5L12 4ZM3.5 12.5 12 17l8.5-4.5M3.5 16.5 12 21l8.5-4.5',
  shield: 'M12 3.5 19 6v5.5c0 4.3-3 7.8-7 9-4-1.2-7-4.7-7-9V6l7-2.5ZM8.8 12l2.2 2.2 4.2-4.4',
  chevron: 'M9.5 6.5 15 12l-5.5 5.5',
}

export default function Icon({ name, size = 20, className = '' }) {
  return (
    <svg
      className={'icon ' + className}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={PATHS[name]} />
    </svg>
  )
}
