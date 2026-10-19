'use client'

import { useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Menu, X } from 'lucide-react'

import { HeroIdCard } from '@/components/hero-id-card'

const projects = [
  {
    number: '01',
    title: 'FlowMind / AI Workspace',
    type: 'Full-stack platform · Personal project',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=85',
    demo: 'https://flowmind-z0hz.onrender.com',
    className: 'project-a',
  },
  {
    number: '02',
    title: 'DataPulse / IT Market Intelligence',
    type: 'Data pipeline & ML dashboard · Personal project',
    image: '/datapulse-cover.png',
    demo: 'https://datapulse-1.streamlit.app',
    className: 'project-b',
  },
  {
    number: '03',
    title: 'EventTix / Event Booking',
    type: 'Full-stack application · Laravel & MySQL',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=85',
    demo: 'https://eventtix-wliw.onrender.com',
    className: 'project-c',
  },
  {
    number: '04',
    title: 'FinSight / Personal Finance',
    type: 'Financial tracking & KPI dashboard · Personal project',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=85',
    demo: 'https://finsight-ra3r.onrender.com/auth',
    className: 'project-d',
  },
  {
    number: '05',
    title: 'Tala / Real-time Messaging',
    type: 'Team project · Accounts & video calls lead',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85',
    className: 'project-e',
  },
  {
    number: '06',
    title: 'Syncra / Live Polls & Quizzes',
    type: 'Real-time application · Socket.io',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=85',
    demo: 'https://pfe-lcro.onrender.com',
    className: 'project-f',
  },
  {
    number: '07',
    title: 'CollabHub / Team Collaboration',
    type: 'Project management platform · Personal project',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=85',
    demo: 'https://collab-hub-5e67.onrender.com',
    className: 'project-g',
  },
]

const capabilities = ['Full-stack development', 'Data analysis & ML', 'AI agents & LLMs', 'Real-time applications', 'Project coordination']

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <main className="site-shell">
      <nav className="nav-bar" aria-label="Main navigation">
        <a href="#top" className="wordmark" onClick={closeMenu}>O<span>·</span>A</a>
        <div className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
          <a href="#work" onClick={closeMenu}>Selected work</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </div>
        <a href="mailto:ouerdiaabdiche@gmail.com" className="nav-availability">Open to opportunities <span className="status-dot" /></a>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </nav>

      <section className="hero" id="top">
        <div className="hero-grid">
          <div className="hero-main">
            <div className="hero-heading">
              <h1><span className="hero-word hero-word-primary">Digital</span> <span className="hero-word hero-word-accent">things</span><br /><em><span>with</span> feeling.</em></h1>
              <div className="hero-aside"><span>(01 — 05)</span><p>I&apos;m Ouerdia, a full-stack developer and data analyst building useful digital products at the crossroads of web, data, and applied AI.</p></div>
            </div>
            <div className="hero-bottom"><span>Based in Tizi Ouzou, Algeria<br />Working worldwide</span><a href="#work" className="scroll-cue">Scroll to explore <ArrowDownRight /></a></div>
          </div>
          <div className="hero-visual">
            <HeroIdCard />
          </div>
        </div>
      </section>

      <section className="manifesto" id="about">
        <p className="section-label">/ A little context</p>
        <div className="manifesto-copy"><p>I turn complex ideas into <span>clear, useful products</span> — from AI workspaces and real-time apps to data pipelines and dashboards that help people make better decisions.</p><a href="#contact" className="text-link">Let&apos;s connect <ArrowUpRight /></a></div>
      </section>

      <section className="work-section" id="work">
        <div className="section-header"><p className="section-label">/ Selected work</p><p className="section-count">(07 projects)</p></div>
        <div className="projects-grid">
          {projects.map((project) => <article className={`project-card ${project.className}`} key={project.number}><a href={project.demo} className="project-image" target="_blank" rel="noreferrer"><img src={project.image} alt={`${project.title} project preview`} /><span className="project-arrow"><ArrowUpRight /></span></a><div className="project-meta"><span>{project.number}</span><div><h2>{project.title}</h2><p>{project.type}</p></div></div></article>)}
        </div>
      </section>

      <section className="capabilities">
        <div><p className="section-label">/ Capabilities</p><p className="capability-note">Building thoughtful tools<br />from idea to impact.</p></div>
        <div className="capability-list">{capabilities.map((item, i) => <div className="capability-row" key={item}><span>0{i + 1}</span><strong>{item}</strong><ArrowUpRight /></div>)}</div>
      </section>

      <section className="contact-section" id="contact"><p className="section-label">/ Let&apos;s build something</p><h2>Have an idea<br /><em>to explore?</em></h2><a className="contact-email" href="mailto:ouerdiaabdiche@gmail.com">ouerdiaabdiche@gmail.com <ArrowUpRight /></a><div className="contact-orbit">✳</div></section>

      <footer className="footer"><span>© 2026 Ouerdia Abdiche</span><div className="socials"><a href="https://github.com/Wardiaa" aria-label="Github" target="_blank" rel="noreferrer">GH</a><a href="https://linkedin.com" aria-label="LinkedIn">LI</a><a href="https://instagram.com" aria-label="Instagram">IG</a></div><span>Full-stack · Data · AI</span></footer>
    </main>
  )
}
