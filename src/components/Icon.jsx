// Small inline icon set. Keeps the app dependency-free (no icon library).
const paths = {
  bath: (
    <>
      <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" />
      <path d="M6 12V6a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2" />
      <path d="M6 19l-1 2M18 19l1 2" />
    </>
  ),
  shower: (
    <>
      <path d="M6 20v-8a6 6 0 0 1 12 0v8" />
      <path d="M4 12h16" />
      <path d="M9 16v2M12 15v3M15 16v2" />
    </>
  ),
  tile: (
    <>
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
    </>
  ),
  kitchen: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 4v6M12 14h.01M12 17h.01" />
    </>
  ),
  addition: (
    <>
      <path d="M3 21V10l9-7 9 7v11" />
      <path d="M9 21v-6h6v6" />
      <path d="M12 3v4M10 5h4" />
    </>
  ),
  tools: (
    <>
      <path d="M14 6a4 4 0 0 1-5 5L4 16l4 4 5-5a4 4 0 0 1 5-5l2-4-4-4-2 4Z" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  shield: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z" />,
  star: (
    <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.6 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9L12 2.5Z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 0 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  phone: (
    <path d="M6 3h3l2 5-2 1a12 12 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2Z" />
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
}

export default function Icon({ name, size = 24, filled = false, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {paths[name] || null}
    </svg>
  )
}
