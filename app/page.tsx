'use client'

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
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

const skillGroups = [
  { tab: 'Frontend', skills: [
    { name: 'React & Next.js', level: 'Expert' },
    { name: 'TypeScript', level: 'Advanced' },
    { name: 'Tailwind CSS', level: 'Advanced' },
    { name: 'React Native', level: 'Proficient' },
  ] },
  { tab: 'Backend', skills: [
    { name: 'Node.js & Express', level: 'Advanced' },
    { name: 'Laravel & PHP', level: 'Advanced' },
    { name: 'REST APIs & JWT', level: 'Advanced' },
    { name: 'Socket.io', level: 'Proficient' },
  ] },
  { tab: 'Data & AI', skills: [
    { name: 'Python', level: 'Advanced' },
    { name: 'Pandas & NumPy', level: 'Advanced' },
    { name: 'scikit-learn & XGBoost', level: 'Proficient' },
    { name: 'LLM · Google Gemini', level: 'Proficient' },
    { name: 'Streamlit', level: 'Proficient' },
  ] },
  { tab: 'Databases', skills: [
    { name: 'PostgreSQL & Drizzle', level: 'Advanced' },
    { name: 'MySQL', level: 'Advanced' },
    { name: 'MongoDB', level: 'Proficient' },
    { name: 'Supabase', level: 'Proficient' },
  ] },
  { tab: 'Tooling', skills: [
    { name: 'Git & GitHub', level: 'Advanced' },
    { name: 'Docker', level: 'Proficient' },
    { name: 'GitHub Actions', level: 'Proficient' },
    { name: 'Render & Postman', level: 'Proficient' },
  ] },
]

// TODO: these are starting self-assessments — tweak the level labels freely (Expert / Advanced / Proficient / Familiar).
const skillLevels: Record<string, number> = { Expert: 95, Advanced: 88, Proficient: 78, Familiar: 65 }

const background = [
  { kind: 'education', tint: 'var(--olive)', period: '2024 – 2026', duration: '2 yrs', title: 'Master 2 — Information Systems Engineering', place: 'Université Mouloud Mammeri · Tizi Ouzou', note: 'Information systems, full-stack development, data and applied AI.' },
  { kind: 'education', tint: 'var(--olive)', period: '2021 – 2024', duration: '3 yrs', title: 'Bachelor’s in Computer Systems', place: 'Université Mouloud Mammeri · Tizi Ouzou', note: 'Computer systems, algorithms and software engineering foundations.' },
  { kind: 'certificate', tint: 'var(--accent)', period: 'Certification', duration: '', title: 'Project Management', place: 'IBM SkillsBuild', note: 'Project management, coordination and delivery methods.' },
]

const EduIcon = () => (
  <svg viewBox="0 0 20 20" width="14.5" height="14.5" aria-hidden="true"><g fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1.8 8 10 4l8.2 4L10 12Z" fill="#fff" /><path d="M5.4 9.9v3.6c2.6 2 6.6 2 9.2 0V9.9M18.2 8v4.4" /></g></svg>
)

const CertIcon = () => (
  <svg viewBox="0 0 20 20" width="14.5" height="14.5" aria-hidden="true"><path d="M10 3 16.5 6.6v6.8L10 17l-6.5-3.6V6.6ZM3.5 6.6 10 10.2l6.5-3.6M10 10.2V17" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

const languages = [
  { name: 'French', level: 'Fluent' },
  { name: 'English', level: 'Fluent' },
  { name: 'Arabic', level: 'Fluent' },
  { name: 'Kabyle', level: 'Native' },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [skillTab, setSkillTab] = useState(skillGroups[0].tab)
  const [pill, setPill] = useState({ left: 3, width: 0 })
  const tabsRef = useRef<HTMLDivElement>(null)

  const closeMenu = () => setMenuOpen(false)

  const activeSkills = skillGroups.find((group) => group.tab === skillTab) ?? skillGroups[0]

  const measurePill = () => {
    const container = tabsRef.current
    if (!container) return
    const active = container.querySelector<HTMLButtonElement>('button[aria-selected="true"]')
    if (!active) return
    setPill({ left: active.offsetLeft, width: active.offsetWidth })
  }

  useEffect(() => {
    measurePill()
    const onResize = () => measurePill()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillTab])

  const handleSkillTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const next = event.key === 'ArrowRight' ? (index + 1) % skillGroups.length : (index - 1 + skillGroups.length) % skillGroups.length
    setSkillTab(skillGroups[next].tab)
    tabsRef.current?.querySelectorAll('button')[next]?.focus()
  }

  return (
    <main className="site-shell">
      <nav className="nav-bar" aria-label="Main navigation">
        <a href="#top" className="wordmark" onClick={closeMenu}>O<span>·</span>A</a>
        <div className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`} id="primary-menu">
          <a href="#work" onClick={closeMenu}>Selected work</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </div>
        <a href="mailto:ouerdiaabdiche@gmail.com" className="nav-availability">
          <span className="status-dot" />
          Open to opportunities
        </a>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="primary-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </nav>

      <section className="hero" id="top">
        <div className="hero-grid">
          <div className="hero-main">
            <div className="hero-heading">
              <h1><span className="hero-word hero-word-primary">Digital</span> <span className="hero-word hero-word-accent">things</span><br /><em><span>with</span> feeling.</em></h1>
              <div className="hero-aside">
                <p className="hero-aside-label">(01 — 05)</p>
                <p className="hero-aside-copy">I&apos;m Ouerdia, a full-stack developer and data analyst building useful digital products at the crossroads of web, data, and applied AI.</p>
              </div>
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

      <div className="spt-embed">
        <section className="spt-sec" id="toolbox" aria-labelledby="toolbox-h">
          <div className="spt-col">
            <h2 className="spt-h2 spt-serif" id="toolbox-h">Toolbox</h2>
            <div className="spt-tabs" role="tablist" aria-label="Skill categories" ref={tabsRef}>
              <span className="spt-tab-pill" aria-hidden="true" style={{ width: `${pill.width}px`, transform: `translateX(${pill.left}px)`, opacity: pill.width ? 1 : 0 }} />
              {skillGroups.map((group, i) => <button key={group.tab} type="button" role="tab" aria-selected={skillTab === group.tab} aria-controls="skill-panel" tabIndex={skillTab === group.tab ? 0 : -1} onClick={() => setSkillTab(group.tab)} onKeyDown={(event) => handleSkillTabKey(event, i)}>{group.tab}</button>)}
            </div>
            <ul className="spt-skills" id="skill-panel" role="tabpanel">
              {activeSkills.skills.map((skill) => { const value = skillLevels[skill.level] ?? 0; return <li className="spt-skill" key={skill.name}><span className="spt-skill-name">{skill.name}</span><span className="spt-skill-lvl">{skill.level}</span><span className="spt-meter" role="img" aria-label={`${value} out of 100`}>{Array.from({ length: 20 }).map((_, i) => <i key={i} style={{ '--i': i } as CSSProperties} data-on={i < Math.round(value / 5) ? '' : undefined} />)}</span></li> })}
            </ul>
          </div>
        </section>

        <section className="spt-sec" id="background" aria-labelledby="background-h">
          <div className="spt-col">
            <h2 className="spt-h2 spt-serif" id="background-h">Background</h2>
            <ul className="spt-edus">
              {background.map((entry) => <li className="spt-edu" key={entry.title}><span className="spt-logo" aria-hidden="true" style={{ background: entry.tint, color: entry.tint }}>{entry.kind === 'certificate' ? <CertIcon /> : <EduIcon />}</span><div><div className="spt-role-head"><div><h3 className="spt-serif">{entry.title}</h3><p className="spt-meta">{entry.place}</p></div><p className="spt-date">{entry.period}<small>{entry.duration}</small></p></div><p className="spt-p">{entry.note}</p></div></li>)}
            </ul>
            <p className="spt-label">Languages</p>
            <ul className="spt-chips">{languages.map((language) => <li className="spt-chip" key={language.name}>{language.name}<i>{language.level}</i></li>)}</ul>
          </div>
        </section>
      </div>

      <section className="contact-section" id="contact"><p className="section-label">/ Let&apos;s build something</p><h2>Have an idea<br /><em>to explore?</em></h2><a className="contact-email" href="mailto:ouerdiaabdiche@gmail.com">ouerdiaabdiche@gmail.com <ArrowUpRight /></a><div className="contact-orbit">✳</div></section>

      <footer className="footer"><span>© 2026 Ouerdia Abdiche</span><div className="socials"><a href="https://github.com/Wardiaa" aria-label="Github" target="_blank" rel="noreferrer">GH</a><a href="https://www.linkedin.com/in/ouerdia-abdiche-003443445" aria-label="LinkedIn" target="_blank" rel="noreferrer">LI</a></div><span>Full-stack · Data · AI</span></footer>
    </main>
  )
}
