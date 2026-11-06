'use client'

import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'

const GITHUB_URL = 'https://github.com/Wardiaa'

type Project = {
  number: string
  title: string
  type: string
  image: string
  demo?: string
  status: 'Live' | 'Team project'
  summary: string
  stack: string[]
  featured?: boolean
  wide?: boolean
}

const projects: Project[] = [
  {
    number: '01',
    title: 'FlowMind / AI Workspace',
    type: 'Full-stack platform / Personal project',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=85',
    demo: 'https://flowmind-5ffh.onrender.com',
    status: 'Live',
    summary: 'A workspace operations dashboard for AI agents, automation workflows and document RAG — with scheduled runs, human approvals and Gemini-powered answers.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Gemini'],
    featured: true,
  },
  {
    number: '02',
    title: 'DataPulse / IT Market Intelligence',
    type: 'Data pipeline & ML dashboard / Personal project',
    image: '/datapulse-cover.png',
    demo: 'https://datapulse-v2ga.onrender.com/',
    status: 'Live',
    summary: 'An end-to-end data pipeline that scrapes, cleans and models tech job postings, tracks market KPIs and predicts salary from role, location, seniority and skills.',
    stack: ['Python', 'Pandas', 'scikit-learn', 'Streamlit'],
  },
  {
    number: '03',
    title: 'Mainline / Integration Dashboard',
    type: 'Full-stack SaaS / Next.js, Fastify, BullMQ & Redis',
    image: '/mainline-cover.png',
    demo: 'https://mainline-six.vercel.app',
    status: 'Live',
    summary: 'A full-stack integration dashboard that unifies GitHub issues, pull requests and Linear tickets into one prioritized queue — with real OAuth, signed webhooks and live updates.',
    stack: ['Next.js', 'Fastify', 'BullMQ', 'Redis'],
    wide: true,
  },
  {
    number: '04',
    title: 'EventTix / Event Booking',
    type: 'Full-stack application / Laravel & MySQL',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=85',
    demo: 'https://eventtix-szaw.onrender.com',
    status: 'Live',
    summary: 'A Laravel event management and ticketing platform with role-based dashboards, transactional booking, per-ticket QR codes and entry validation.',
    stack: ['Laravel', 'PHP', 'MySQL'],
  },
  {
    number: '05',
    title: 'FinSight / Personal Finance',
    type: 'Financial tracking & KPI dashboard / Personal project',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=85',
    demo: 'https://finsight-ra3r.onrender.com/auth',
    status: 'Live',
    summary: 'A full-stack finance tracker for income, expenses, category spending and monthly trends — built with React, TypeScript and Supabase.',
    stack: ['React', 'TypeScript', 'Supabase', 'Recharts'],
  },
  {
    number: '06',
    title: 'Tala / Real-time Messaging',
    type: 'Team project / Accounts & video calls lead',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85',
    status: 'Team project',
    summary: 'A real-time messaging app with accounts and video calls.',
    stack: ['Node.js', 'Socket.io', 'WebRTC'],
  },
  {
    number: '07',
    title: 'Syncra / Live Polls & Quizzes',
    type: 'Real-time application / Socket.io',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=85',
    demo: 'https://pfe-lcro.onrender.com',
    status: 'Live',
    summary: 'Live polls and quizzes powered by Socket.io.',
    stack: ['Socket.io', 'Node.js', 'Real-time'],
  },
  {
    number: '08',
    title: 'CollabHub / Team Collaboration',
    type: 'Project management platform / Personal project',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=85',
    demo: 'https://collab-hub-5e67.onrender.com',
    status: 'Live',
    summary: 'A project management platform for teams that need one shared view.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL'],
    wide: true,
  },
]

const stats = [
  { value: 8, label: 'Projects' },
  { value: 5, label: 'Disciplines' },
  { value: 3, label: 'Years' },
]

const marqueeItems = ['AI & LLMs', 'Data pipelines', 'Full-stack', 'Real-time', 'Product design', 'Ship it']

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [name, descriptor] = project.title.split(' / ')
  const href = project.demo ?? '#contact'
  const external = Boolean(project.demo)
  const cursorLabel = project.demo ? 'View live' : 'Ask about it'

  return (
    <article
      className={`work-card${project.featured ? ' work-card-featured' : ''}${project.wide ? ' work-card-wide' : ''}`}
      id={`project-${project.number}`}
      data-project-card
      data-index={index}
    >
      <a
        className="work-card-image"
        data-work-image
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
        aria-label={`${project.title} — ${cursorLabel}`}
      >
        <span className="work-card-image-inner" data-work-image-inner>
          <img src={project.image} alt={`${project.title} project preview`} loading="lazy" decoding="async" />
        </span>
        <span className="work-card-overlay">
          {project.status === 'Team project' && (
            <span className="work-card-overlay-status">{project.status}</span>
          )}
          <span className="work-card-overlay-cta">
            {cursorLabel} <ArrowUpRight />
          </span>
        </span>
        <span className="work-card-arrow"><ArrowUpRight /></span>
      </a>

      <div className="work-card-meta" data-work-meta>
        <h3 className="work-card-title">
          <span className="work-card-title-number">{project.number}</span>
          <span className="work-card-title-name">
            {name}
            {descriptor && <span className="work-card-title-descriptor"> / {descriptor}</span>}
          </span>
          {project.featured && <span className="work-card-featured-tag">Featured</span>}
        </h3>
        <p className="work-card-type">{project.type}</p>
        <p className="work-card-summary">{project.summary}</p>

        <div className="work-card-tags">
          {project.stack.map((tag) => (
            <span className="work-card-tag" data-work-tag key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const gridRef = useRef<HTMLDivElement | null>(null)
  const marqueeRef = useRef<HTMLDivElement | null>(null)
  const marqueeTrackRef = useRef<HTMLDivElement | null>(null)
  const progressRef = useRef<HTMLSpanElement | null>(null)
  const [active, setActive] = useState<number[]>([0])

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const head = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: section, start: 'top 72%', once: true },
      })

      head
        .from('[data-work-kicker]', { y: 14, autoAlpha: 0, duration: 0.55, stagger: 0.08 })
        .from('[data-work-title-line]', { yPercent: 115, duration: 0.95, stagger: 0.12, ease: 'power4.out' }, '-=0.35')
        .from('[data-work-intro]', { y: 22, autoAlpha: 0, duration: 0.7 }, '-=0.5')
        .from('[data-work-stat]', { y: 16, autoAlpha: 0, duration: 0.5, stagger: 0.08 }, '-=0.4')

      gsap.utils.toArray<HTMLElement>('[data-stat]').forEach((el) => {
        const target = Number(el.dataset.value ?? 0)
        const state = { value: 0 }
        el.textContent = '00'
        gsap.to(state, {
          value: target,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(state.value)).padStart(2, '0')
          },
          onComplete: () => {
            el.textContent = String(target).padStart(2, '0')
          },
        })
      })

      if (marqueeRef.current && marqueeTrackRef.current) {
        gsap.to(marqueeTrackRef.current, {
          xPercent: -33.333,
          ease: 'none',
          scrollTrigger: { trigger: marqueeRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        })
      }

      const cards = gsap.utils.toArray<HTMLElement>('[data-project-card]')

      cards.forEach((card) => {
        const image = card.querySelector<HTMLElement>('[data-work-image]')
        const inner = card.querySelector<HTMLElement>('[data-work-image-inner]')
        const meta = card.querySelector<HTMLElement>('[data-work-meta]')
        const tags = card.querySelectorAll<HTMLElement>('[data-work-tag]')

        if (image) {
          const reveal = gsap.timeline({
            scrollTrigger: { trigger: card, start: 'top 88%', end: 'top 52%', scrub: 0.7 },
          })

          reveal.fromTo(
            image,
            { clipPath: 'inset(0 0 100% 0)' },
            { clipPath: 'inset(0 0 0% 0)', ease: 'none' },
            0,
          )

          if (meta) {
            reveal.fromTo(meta, { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: 'none' }, 0.15)
          }

          if (tags.length) {
            reveal.fromTo(
              tags,
              { y: 10, autoAlpha: 0, stagger: 0.035 },
              { y: 0, autoAlpha: 1, ease: 'none' },
              0.3,
            )
          }
        }

        if (inner) {
          gsap.fromTo(
            inner,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: 'none',
              scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        }

        const index = Number(card.dataset.index ?? 0)
        const markActive = () =>
          setActive((current) => (current.includes(index) ? current : [...current, index]))
        const clearActive = () => setActive((current) => current.filter((item) => item !== index))

        ScrollTrigger.create({
          trigger: card,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: markActive,
          onEnterBack: markActive,
          onLeave: clearActive,
          onLeaveBack: clearActive,
        })
      })

      gsap.from('[data-work-note]', {
        y: 50,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-work-note]', start: 'top 88%', once: true },
      })

      if (progressRef.current && gridRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: { trigger: gridRef.current, start: 'top 60%', end: 'bottom bottom', scrub: true },
          },
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section className="work-section" id="work" ref={sectionRef}>
      <header className="work-head">
        <div className="work-head-top">
          <p className="section-label" data-work-kicker>/ Selected work</p>
          <p className="work-count" data-work-kicker>(08 projects — 2024/2026)</p>
        </div>

        <div className="work-head-main">
          <h2 className="work-heading">
            <span className="work-heading-mask">
              <span className="work-heading-line" data-work-title-line>Built to</span>
            </span>
            <span className="work-heading-mask">
              <span className="work-heading-line" data-work-title-line>
                ship<span className="work-heading-dot">.</span>
              </span>
            </span>
          </h2>

          <div className="work-head-aside">
            <p className="work-intro" data-work-intro>
              Eight products across AI, data and the web — built end-to-end, from the first schema to the final deploy.
            </p>

            <div className="work-stats">
              {stats.map((stat) => (
                <div className="work-stat" data-work-stat key={stat.label}>
                  <strong data-stat data-value={stat.value}>
                    0{stat.value}
                  </strong>
                  <span>{stat.label}</span>
                </div>
              ))}
              <p className="work-available">
                <span className="status-dot" /> Open for select projects
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="work-marquee" aria-hidden="true" ref={marqueeRef}>
        <div className="work-marquee-track" ref={marqueeTrackRef}>
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
            <span className="work-marquee-item" key={`${item}-${index}`}>
              {item}
              <i>✦</i>
            </span>
          ))}
        </div>
      </div>

      <div className="work-layout">
        <aside className="work-index" aria-label="Project index">
          <p className="work-index-label">/ Index</p>
          <div className="work-index-progress">
            <span ref={progressRef} />
          </div>
          <ol>
            {projects.map((project, index) => (
              <li className={active.includes(index) ? 'is-active' : ''} key={project.number}>
                <a href={`#project-${project.number}`}>
                  <span>{project.number}</span>
                  <span>{project.title.split(' / ')[0]}</span>
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <div className="work-grid" ref={gridRef}>
          {projects.map((project, index) => (
            <Fragment key={project.number}>
              <ProjectCard project={project} index={index} />
              {index === 1 && (
                <aside className="work-note" data-work-note>
                  <div>
                    <p className="work-note-label">/ How I work</p>
                    <p className="work-note-title">
                      One person,
                      <br />
                      the whole stack.
                    </p>
                    <p className="work-note-copy">
                      From the data model and API to the last pixel and the deploy. I like owning the seams between
                      product, data and interface.
                    </p>
                  </div>

                  <ul className="work-note-list">
                    <li>Product thinking</li>
                    <li>Interface systems</li>
                    <li>Data &amp; AI</li>
                    <li>Delivery</li>
                  </ul>

                  <a className="work-note-link" href="#contact">
                    Work with me <ArrowUpRight />
                  </a>
                </aside>
              )}
            </Fragment>
          ))}
        </div>
      </div>

      <div className="work-footer">
        <div>
          <p className="work-footer-label">/ More experiments</p>
          <p className="work-footer-copy">
            Prototypes, data experiments and the occasional half-finished idea live on GitHub.
          </p>
        </div>
        <div className="work-footer-links">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub archive <ArrowUpRight />
          </a>
          <a href="#contact">
            Start a project <ArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  )
}
