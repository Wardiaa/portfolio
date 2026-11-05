'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Check, Clock, Copy, Mail, MapPin } from 'lucide-react'

import { HeroSketches } from '@/components/hero-sketches'

const EMAIL = 'ouerdiaabdiche@gmail.com'
const GITHUB_URL = 'https://github.com/Wardiaa'
const LINKEDIN_URL = 'https://www.linkedin.com/in/ouerdia-abdiche-003443445'
const CV_EN_URL = '/cv_EN.pdf'
const CV_FR_URL = '/cv.pdf'

type CopyState = 'idle' | 'copied' | 'error'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export function StudioHero() {
  const root = useRef<HTMLElement | null>(null)
  const resetTimer = useRef<number | null>(null)
  const [time, setTime] = useState('')
  const [copyState, setCopyState] = useState<CopyState>('idle')

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

  useIsomorphicLayoutEffect(() => {
    const el = root.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('[data-hero="kicker"]', { y: 16, autoAlpha: 0, duration: 0.55 })
        .from('[data-hero="line"]', { yPercent: 115, duration: 0.9, stagger: 0.12, ease: 'power4.out' }, '-=0.3')
        .from('[data-hero="sketch"]', { y: 30, autoAlpha: 0, duration: 0.8, stagger: 0.09 }, '-=0.55')
        .from('[data-hero="intro"]', { y: 20, autoAlpha: 0, duration: 0.7 }, '-=0.45')
        .from('[data-hero="action"]', { y: 20, autoAlpha: 0, duration: 0.7, stagger: 0.08 }, '-=0.55')
        .from('[data-hero="link"]', { y: 10, autoAlpha: 0, duration: 0.5, stagger: 0.05 }, '-=0.45')

      gsap.utils.toArray<SVGGeometryElement>('.studio-sketch svg > *').forEach((shape) => {
        if (!('getTotalLength' in shape) || shape.getAttribute('stroke-dasharray')) return
        const length = shape.getTotalLength()
        gsap.set(shape, { strokeDasharray: length, strokeDashoffset: length })
        tl.to(shape, { strokeDashoffset: 0, duration: 1.15, ease: 'power2.inOut' }, 0.35)
      })
    }, el)

    let removeParallax = () => {}
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const sketches = el.querySelector<HTMLElement>('.studio-sketches')
      if (sketches) {
        const xTo = gsap.quickTo(sketches, 'x', { duration: 0.9, ease: 'power3.out' })
        const yTo = gsap.quickTo(sketches, 'y', { duration: 0.9, ease: 'power3.out' })

        const onMove = (event: PointerEvent) => {
          xTo((event.clientX / window.innerWidth - 0.5) * 18)
          yTo((event.clientY / window.innerHeight - 0.5) * 12)
        }

        window.addEventListener('pointermove', onMove)
        removeParallax = () => window.removeEventListener('pointermove', onMove)
      }
    }

    return () => {
      removeParallax()
      ctx.revert()
    }
  }, [])

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '#about',
          start: 'top bottom',
          end: 'top top',
          scrub: 0.8,
        },
      })

      tl.to('.studio-top', { yPercent: -12, scale: 0.97, duration: 1, transformOrigin: 'left top' }, 0)
        .to('.studio-foot', { yPercent: -8, duration: 1 }, 0)
        .to(
          '.studio-sketch',
          {
            x: (index) => [-42, 20, 42][index],
            yPercent: (index) => [-6, 8, -4][index],
            rotate: (index) => [-9, 6, -5][index],
            autoAlpha: 0,
            duration: 0.8,
          },
          0.05,
        )
        .fromTo(
          '#about .manifesto-copy p',
          { clipPath: 'inset(0 0 100% 0)', yPercent: 8 },
          { clipPath: 'inset(0 0 0% 0)', yPercent: 0, duration: 1 },
          0.15,
        )
        .from('#about .section-label', { y: 18, autoAlpha: 0, duration: 0.45 }, 0.28)
        .from('#about .text-link', { y: 12, duration: 0.4 }, 0.55)
    })

    return () => ctx.revert()
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
    <section className="studio-hero" id="top" ref={root}>
      <div className="studio-top">
        <p className="studio-kicker" data-hero="kicker">
          Full-stack development <span className="studio-kicker-slash">/</span> Data &amp; AI{' '}
          <span className="studio-kicker-slash">/</span> Tizi Ouzou, Algeria
        </p>

        <div className="studio-headline-row">
          <h1 className="studio-headline">
            <span className="studio-line-mask">
              <span className="studio-headline-line" data-hero="line">Digital products</span>
            </span>
            <span className="studio-line-mask">
              <span className="studio-headline-line" data-hero="line">Developer.</span>
            </span>
          </h1>
          <HeroSketches />
        </div>
      </div>

      <div className="studio-foot">
        <div className="studio-intro" data-hero="intro">
          <p className="studio-copy">
            I&apos;m Ouerdia — a full-stack developer and data analyst building web platforms, data pipelines and
            applied AI tools from first sketch to production.
          </p>

          <ul className="studio-meta">
            <li><MapPin aria-hidden="true" /> Tizi Ouzou, Algeria — working worldwide</li>
            <li><Clock aria-hidden="true" /> <span><time dateTime={time || undefined}>{time || '--:--'}</time> in Algiers</span></li>
            <li><Mail aria-hidden="true" /> <a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
          </ul>
        </div>

        <div className="studio-actions">
          <div className="studio-buttons">
            <a className="studio-btn studio-btn-solid" href={`mailto:${EMAIL}`} data-hero="action">
              Let&apos;s talk <ArrowUpRight />
            </a>
            <a className="studio-btn studio-btn-outline" href="#work" data-hero="action">
              See my work <ArrowUpRight />
            </a>
          </div>

          <div className="studio-link-row">
            <button type="button" className="studio-link" onClick={handleCopyEmail} data-hero="link">
              {copyState === 'copied' ? <Check /> : <Copy />}
              {copyState === 'copied' ? 'Copied' : 'Copy email'}
            </button>
            <a className="studio-link" href={CV_EN_URL} download="Ouerdia-Abdiche-CV-EN.pdf" data-hero="link">
              CV · EN
            </a>
            <a className="studio-link" href={CV_FR_URL} download="Ouerdia-Abdiche-CV-FR.pdf" data-hero="link">
              CV · FR
            </a>
            <a className="studio-link" href={GITHUB_URL} target="_blank" rel="noreferrer" data-hero="link">
              <GitHubIcon /> GitHub
            </a>
            <a className="studio-link" href={LINKEDIN_URL} target="_blank" rel="noreferrer" data-hero="link">
              <LinkedInIcon /> LinkedIn
            </a>
          </div>
        </div>
      </div>

      <span className="studio-sr-only" role="status" aria-live="polite">
        {copyState === 'copied' ? 'Email address copied to clipboard' : ''}
      </span>
      {copyState === 'error' && (
        <p className="studio-sr-only" role="status">
          Clipboard unavailable. Email: {EMAIL}
        </p>
      )}
    </section>
  )
}
