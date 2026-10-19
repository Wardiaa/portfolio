/**
 * Abstract portrait placeholder for the hero ID card.
 *
 * TODO: swap this component for a real photo, e.g.
 * <img className="id-portrait-img" src="/portrait.jpg" alt="Ouerdia Abdiche" />
 * The surrounding .id-portrait slot already handles the 14px radius and overflow.
 */
export function AbstractPortrait() {
  return (
    <svg
      className="id-portrait-svg"
      viewBox="0 0 320 260"
      role="img"
      aria-label="Abstract illustrated portrait placeholder"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="id-card-noise" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>

      <rect className="id-portrait-bg" width="320" height="260" />
      <path className="id-portrait-accent" d="M0 260V166A94 94 0 0 1 94 260Z" />
      <path className="id-portrait-ink" d="M150 260v-62a64 64 0 0 1 128 0v62Z" />
      <circle className="id-portrait-head" cx="214" cy="134" r="46" />
      <circle className="id-portrait-ring" cx="58" cy="58" r="27" />
      <rect
        className="id-portrait-noise"
        width="320"
        height="260"
        filter="url(#id-card-noise)"
      />
    </svg>
  )
}
