'use client'

import { useEffect, useRef, useState } from 'react'

import { AbstractPortrait } from '@/components/abstract-portrait'

const EMAIL = 'ouerdiaabdiche@gmail.com'


const CV_URL = '/cv.pdf'


type CopyState = 'idle' | 'copied' | 'error'

export function HeroIdCard() {
  const [time, setTime] = useState('')
  const [copyState, setCopyState] = useState<CopyState>('idle')
  const resetTimer = useRef<number | null>(null)

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Algiers',
      hour: '2-digit',
      minute: '2-digit',
    })

    const tick = () => setTime(formatter.format(new Date()))
    tick()

    const interval = window.setInterval(tick, 20_000)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    return () => {
      if (resetTimer.current !== null) window.clearTimeout(resetTimer.current)
    }
  }, [])

  const handleCopyEmail = async () => {
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current)

    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(EMAIL)
      setCopyState('copied')
      resetTimer.current = window.setTimeout(() => setCopyState('idle'), 2000)
    } catch {
      setCopyState('error')
    }
  }

  return (
    <div className="id-card-stage">
      <div className="id-card-wrap">
        <div className="id-card-backing" aria-hidden="true" />

        <article className="id-card" aria-label="Ouerdia Abdiche profile card">
          <span className="id-sticker" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
            </svg>
          </span>

          <div className="id-portrait">
            <AbstractPortrait />
          </div>

          <div className="id-signature">
            <svg viewBox="0 0 250 72" role="img" aria-label="Ouerdia">
              <title>Ouerdia</title>
              <text x="0" y="54">Ouerdia</text>
            </svg>
          </div>

          <div className="id-time-row">
            <span>Local time, Algiers</span>
            <time className="id-clock" dateTime={time || undefined}>
              {time || '--:--'}
            </time>
          </div>

          <ul className="id-chips" aria-label="Focus areas">
            <li className="id-chip">
              <BrowserIcon />
              Web
            </li>
            <li className="id-chip">
              <ChartIcon />
              Data
            </li>
            <li className="id-chip">
              <AsteriskIcon />
              AI
            </li>
          </ul>

          <div className="id-actions">
            <button type="button" className="id-btn id-btn-solid" onClick={handleCopyEmail}>
              {copyState === 'copied' ? 'Copied' : 'Copy email'}
            </button>

            <a className="id-btn id-btn-outline" href={CV_URL}>
              Download CV
            </a>

            <div className="id-socials">
              <a
                className="id-social"
                href="https://github.com/Wardiaa"
                aria-label="GitHub profile"
                target="_blank"
                rel="noreferrer"
              >
                GH
              </a>
            </div>
          </div>

          <span className="id-sr-only" role="status" aria-live="polite">
            {copyState === 'copied' ? 'Email address copied to clipboard' : ''}
          </span>

          {copyState === 'error' && (
            <p className="id-email-fallback" role="status">
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
          )}
        </article>
      </div>
    </div>
  )
}

function BrowserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 9h18M6.5 6.5h.01M9.5 6.5h.01" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <path d="M3 20h18M6 20v-7M12 20V5M18 20v-4" />
    </svg>
  )
}

function AsteriskIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
    </svg>
  )
}
