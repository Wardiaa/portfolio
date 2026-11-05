const sketchProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function HeroSketches() {
  return (
    <div className="studio-sketches" aria-hidden="true">
      <div className="studio-sketch" data-hero="sketch">
        <svg viewBox="0 0 128 96" {...sketchProps}>
          <rect x="7" y="10" width="114" height="76" rx="2" />
          <path d="M7 23h114" />
          <circle cx="14" cy="16.5" r="1.2" />
          <circle cx="18.5" cy="16.5" r="1.2" />
          <circle cx="23" cy="16.5" r="1.2" />
          <rect x="14" y="30" width="46" height="29" rx="1" />
          <path d="M17 56l12-15 7 8 8-11 11 18" />
          <path d="M69 32h42M69 40h35M69 48h39" />
          <path d="M14 67h58M14 75h44M83 67h31M83 75h23" />
        </svg>
        <span>Web apps</span>
      </div>

      <div className="studio-sketch" data-hero="sketch">
        <svg viewBox="0 0 128 96" {...sketchProps}>
          <rect x="7" y="10" width="114" height="76" rx="2" />
          <path d="M7 23h114" />
          <circle cx="14" cy="16.5" r="1.2" />
          <circle cx="18.5" cy="16.5" r="1.2" />
          <circle cx="23" cy="16.5" r="1.2" />
          <path d="M19 32v45h99" />
          <path d="M19 54h99M19 66h99" strokeDasharray="2 5" opacity=".45" />
          <path d="M21 69l14-8 12 4 14-17 12 5 16-14 14-4" />
          <circle cx="35" cy="61" r="1.8" fill="currentColor" stroke="none" />
          <circle cx="61" cy="48" r="1.8" fill="currentColor" stroke="none" />
          <circle cx="97" cy="35" r="1.8" fill="currentColor" stroke="none" />
        </svg>
        <span>Data &amp; ML</span>
      </div>

      <div className="studio-sketch" data-hero="sketch">
        <svg viewBox="0 0 128 96" {...sketchProps}>
          <rect x="7" y="10" width="114" height="76" rx="2" />
          <path d="M7 23h114" />
          <circle cx="14" cy="16.5" r="1.2" />
          <circle cx="18.5" cy="16.5" r="1.2" />
          <circle cx="23" cy="16.5" r="1.2" />
          <path d="M16 33h12M16 43h42M16 51h34M16 59h46M16 67h24" />
          <path d="M88 38l20-4 6 21-14 15-18-12 6-20M88 38l12 32" />
          <circle cx="88" cy="38" r="5" />
          <circle cx="108" cy="34" r="4" />
          <circle cx="114" cy="55" r="3.5" />
          <circle cx="100" cy="70" r="4.5" />
          <circle cx="82" cy="58" r="3.5" />
        </svg>
        <span>AI</span>
      </div>
    </div>
  )
}
