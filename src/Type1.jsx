import { useState, useEffect } from "react";

const NAME = "Gerail Mendoza";

const TAGLINES = [
  "CS Student",
  "Graduating Student",
  "Software Engineer in Progress",
  "Problem Solver",
];

const ABOUT_PARAGRAPHS = [
  "Hi! I'm Gerail, a CS student from the Philippines currently preparing for my On-the-Job Training. I enjoy building things — from simple web pages to small systems that solve everyday problems.",
  "I'm eager to apply what I've learned in school to real-world challenges, work with a team, and keep growing as a developer. I'm a fast learner and I always give my best.",
];

const INFO_CARD = [
  { label: "Name",      value: "Gerail Mendoza" },
  { label: "Course",    value: "BS Computer Science" },
  { label: "School",    value: "Holy Angel University" },
  { label: "Status",    value: "Graduating Student" },
  { label: "Location",  value: "Philippines" },
  { label: "Available", value: "✓ For OJT", green: true },
];

const SKILLS = [
  { category: "Languages",             tags: ["HTML", "CSS", "JavaScript", "Python", "Java", "SQL"] },
  { category: "Frameworks & Backend",  tags: ["React", "Node.js", "Express", "PostgreSQL"] },
  { category: "Tools & Platforms",     tags: ["Git", "GitHub", "VS Code", "MySQL", "Supabase", "Figma", "Vercel", "Railway"] },
];

const PROJECTS = [
  {
    featured: true,
    kind: "Full-stack · Class project",
    title: "Dino Go",
    desc: "A taming reference guide for ARK: Survival Evolved, modeled after Dododex. Look up the taming method, preferred food, and knockout weapon for 18 common dinos, then save your favorites.",
    highlights: [
      "Search and diet filter that work together",
      "Taming calculator with a food effectiveness table",
      "Favorites saved to the database, not just the browser",
      "Kibble recipes matched to each dino's preferred food",
      "Built on real ARK taming data, checked against Dododex",
    ],
    tech: ["React", "Node.js", "Express", "PostgreSQL", "Supabase"],
    // TODO: paste the Dino Go repo and live URLs. Empty links are hidden.
    github: "",
    demo: "",
  },
  {
    kind: "Front-end · Personal",
    title: "Personal Portfolio",
    desc: "A responsive portfolio site built from scratch to showcase my skills and projects.",
    tech: ["HTML", "CSS", "JavaScript"],
    // TODO: paste your portfolio repo / live URLs. Empty links are hidden.
    github: "",
    demo: "",
  },
];

const NAV_LINKS = ["about", "skills", "projects", "contact"];

const SOCIALS = [
  { label: "⌥  GitHub",   href: "https://github.com/Rex-The-Programmer" },
  { label: "↗  LinkedIn", href: "https://linkedin.com/in/gerailmendoza" },
  { label: "↗  Facebook", href: "https://facebook.com/gerailmendoza" },
];

const EMAIL = "gerailmendoza17@gmail.com";

const T = {
  accent:      "#2563EB",
  accentHover: "#1D4ED8",
  accentLight: "#EFF6FF",
  dark:        "#0F172A",
  text:        "#0F172A",
  muted:       "#64748B",
  border:      "#E2E8F0",
  bgAlt:       "#F8FAFC",
  white:       "#FFFFFF",
  subtle:      "#94A3B8",
};

const shared = {
  label: {
    fontFamily:    "'JetBrains Mono', monospace",
    fontSize:      "0.8rem",
    color:         T.accent,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom:  "0.75rem",
  },
  title: {
    fontFamily:  "'Space Grotesk', sans-serif",
    fontWeight:  700,
    fontSize:    "2rem",
    marginBottom:"1rem",
    color:       T.text,
    lineHeight:  1.2,
  },
  subtitle: {
    fontSize:    "1rem",
    color:       T.muted,
    maxWidth:    600,
    marginBottom:"3rem",
    lineHeight:  1.7,
  },
};

const goto = (id) => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
};

const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-padding-top: 64px; }
  html, body { width: 100%; min-height: 100vh; margin: 0; padding: 0; overflow-x: hidden; }
  :focus-visible { outline: 2px solid #3B82F6; outline-offset: 3px; border-radius: 4px; }

  @keyframes blink      { 0%,100% { opacity: 1 } 50% { opacity: 0 } }
  @keyframes float      { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-24px) } }
  @keyframes dotPulse   { 0%,100% { opacity: 1; transform: scale(1) } 50% { opacity: .4; transform: scale(1.5) } }
  @keyframes gradientBg { 0% { background-position: 0% 50% } 50% { background-position: 100% 50% } 100% { background-position: 0% 50% } }

  .site-nav   { padding: 0 2rem; }
  .nav-links  { display: flex; gap: 2rem; }
  .nav-short  { display: none; }

  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }

  .feat-body  { display: grid; grid-template-columns: 1.15fr 1fr; gap: 2.5rem; }
  .feat-list  { border-left: 1px solid #E2E8F0; padding-left: 2.5rem; align-self: center; }

  @media (max-width: 768px) {
    .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    .feat-body  { grid-template-columns: 1fr; gap: 1.5rem; }
    .feat-list  { border-left: none; border-top: 1px solid #E2E8F0; padding: 1.5rem 0 0; }
  }
  @media (max-width: 560px) {
    .site-nav  { padding: 0 1.25rem; }
    .nav-links { gap: 1rem; }
    .nav-full  { display: none; }
    .nav-short { display: inline; }
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation: none !important; transition: none !important; }
  }
`;

function NavBar() {
  const [hov, setHov] = useState(null);
  const [active, setActive] = useState(null);

  // highlight the link for the section currently in view
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ["hero", ...NAV_LINKS].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <nav className="site-nav" style={{
      position: "fixed", top: 0, left: 0, width: "100%",
      background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)",
      borderBottom: `1px solid ${T.border}`, zIndex: 100,
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 64,
      }}>
        <button onClick={() => goto("hero")} style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: "1.2rem", color: T.text,
          background: "none", border: "none", cursor: "pointer", padding: 0,
        }}>
          <span className="nav-full">{NAME}</span>
          <span className="nav-short">{NAME.split(" ")[0]}</span>
          <span style={{ color: T.accent }}>.</span>
        </button>

        <div className="nav-links">
          {NAV_LINKS.map(link => (
            <button
              key={link}
              onClick={() => goto(link)}
              onMouseEnter={() => setHov(link)}
              onMouseLeave={() => setHov(null)}
              aria-current={active === link ? "true" : undefined}
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.9rem",
                fontWeight: active === link ? 600 : 500,
                color: hov === link || active === link ? T.accent : T.muted,
                background: "none", border: "none", cursor: "pointer",
                textTransform: "capitalize", transition: "color 0.2s", padding: 0,
              }}
            >
              {link}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const [phase, setPhase] = useState({ idx: 0, char: 0, deleting: false });
  const current   = TAGLINES[phase.idx];
  const displayed = current.substring(0, phase.char);

  useEffect(() => {
    let speed;
    if      (!phase.deleting && phase.char === current.length) speed = 2000;
    else if ( phase.deleting && phase.char === 0)              speed = 300;
    else                                                        speed = phase.deleting ? 50 : 100;

    const t = setTimeout(() => {
      if (!phase.deleting && phase.char === current.length) {
        setPhase(p => ({ ...p, deleting: true }));
      } else if (phase.deleting && phase.char === 0) {
        setPhase(p => ({ idx: (p.idx + 1) % TAGLINES.length, char: 0, deleting: false }));
      } else {
        setPhase(p => ({ ...p, char: p.char + (p.deleting ? -1 : 1) }));
      }
    }, speed);

    return () => clearTimeout(t);
  }, [phase, current.length]);

  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      background: T.dark, padding: "80px 2rem 60px",
      position: "relative", overflow: "hidden",
    }}>
      {/* subtle grid overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(37,99,235,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(37,99,235,0.05) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* eyebrow */}
        <p style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem",
          color: T.accent, marginBottom: "1.25rem",
          display: "flex", alignItems: "center", gap: "0.5rem",
        }}>
          <span style={{ display: "inline-block", width: 24, height: 2, background: T.accent }} />
          Hello, world!
        </p>

        {/* name */}
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
          color: T.white, marginBottom: "0.75rem",
          letterSpacing: "-0.02em", lineHeight: 1.1,
        }}>
          {NAME}
        </h1>

        {/* typewriter */}
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
          color: T.subtle, marginBottom: "2.5rem", minHeight: "2em",
        }}>
          {displayed}
          <span style={{
            display: "inline-block", width: 2, height: "1.1em",
            background: T.accent, verticalAlign: "middle", marginLeft: 2,
            animation: "blink 1s step-end infinite",
          }} />
        </p>

        {/* description */}
        <p style={{ fontSize: "1rem", color: T.subtle, maxWidth: 520, lineHeight: 1.8, marginBottom: "2.5rem" }}>
          An incoming IT/CS OJT student from the Philippines, passionate about building
          real-world projects and growing as a developer — one commit at a time.
        </p>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <PrimaryBtn onClick={() => goto("projects")}>View My Projects</PrimaryBtn>
          <OutlineBtn  onClick={() => goto("contact")}>Get in Touch</OutlineBtn>
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" style={{
      padding: "80px 2rem", background: T.white,
      position: "relative", overflow: "hidden",
    }}>
      {/* Floating blob — top left */}
      <div style={{
        position: "absolute", top: -80, left: -80,
        width: 380, height: 380, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 70%)",
        animation: "float 7s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      {/* Floating blob — bottom right */}
      <div style={{
        position: "absolute", bottom: -100, right: -80,
        width: 420, height: 420, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 70%)",
        animation: "float 9s ease-in-out infinite reverse",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <p style={shared.label}>// about me</p>
        <h2 style={shared.title}>Who I Am</h2>

        <div className="about-grid">
          <div>
            {ABOUT_PARAGRAPHS.map((txt, i) => (
              <p key={i} style={{ color: T.muted, lineHeight: 1.8, marginBottom: "1rem" }}>{txt}</p>
            ))}

            {/* Pulsing OJT badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.3)",
              borderRadius: 100, padding: "0.4rem 1rem", marginBottom: "1.25rem",
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: "50%", background: "#22C55E",
                display: "inline-block", animation: "dotPulse 1.5s ease-in-out infinite",
              }} />
              <span style={{ fontSize: "0.82rem", color: "#16A34A", fontWeight: 600 }}>
                Open to OJT opportunities
              </span>
            </div>

            <div style={{ marginTop: "0.25rem" }}>
              <PrimaryBtn onClick={() => goto("contact")}>Let's Connect</PrimaryBtn>
            </div>
          </div>

          {/* Info card — animated gradient border */}
          <div style={{
            background: "linear-gradient(135deg, #2563EB, #7C3AED, #06B6D4, #2563EB)",
            backgroundSize: "300% 300%",
            animation: "gradientBg 4s ease infinite",
            borderRadius: 14, padding: "2px",
          }}>
            <div style={{ background: T.white, borderRadius: 12, padding: "2rem" }}>
              {INFO_CARD.map((item, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "0.75rem 0",
                  borderBottom: i < INFO_CARD.length - 1 ? `1px solid ${T.border}` : "none",
                  fontSize: "0.9rem",
                }}>
                  <span style={{ color: T.muted, fontWeight: 500 }}>{item.label}</span>
                  <span style={{ color: item.green ? "#22C55E" : T.text, fontWeight: 600 }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" style={{ padding: "80px 2rem", background: T.bgAlt }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={shared.label}>// skills</p>
        <h2 style={shared.title}>What I Know</h2>
        <p style={shared.subtitle}>Technologies and tools I've been learning and practicing.</p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
        }}>
          {SKILLS.map(group => (
            <div key={group.category} style={{
              background: T.white, border: `1px solid ${T.border}`,
              borderRadius: 12, padding: "1.5rem",
            }}>
              <p style={{
                fontSize: "0.8rem", fontWeight: 600, color: T.accent,
                textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem",
              }}>
                {group.category}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {group.tags.map(tag => (
                  <span key={tag} style={{
                    background: T.accentLight, color: T.accent,
                    padding: "0.3rem 0.75rem", borderRadius: 100,
                    fontSize: "0.82rem", fontWeight: 500,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectLink({ href, children }) {
  if (!href || href === "#") return null;
  return (
    <a href={href} target="_blank" rel="noreferrer"
       style={{ fontSize: "0.85rem", fontWeight: 600, color: T.accent, textDecoration: "none" }}>
      {children}
    </a>
  );
}

function Projects() {
  const [hov, setHov] = useState(null);

  return (
    <section id="projects" style={{ padding: "80px 2rem", background: T.white }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={shared.label}>// projects</p>
        <h2 style={shared.title}>What I've Built</h2>
        <p style={shared.subtitle}>
          Projects that show my progress so far, from my first portfolio site to a full-stack app.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}>
          {PROJECTS.map((proj, i) => (
            <article
              key={proj.title}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
              style={{
                gridColumn: proj.featured ? "1 / -1" : "auto",
                background: T.white,
                border: `1px solid ${proj.featured ? T.accent : T.border}`,
                borderRadius: 12, padding: "1.75rem",
                transform:  hov === i ? "translateY(-4px)" : "none",
                boxShadow:  hov === i ? "0 12px 32px rgba(0,0,0,0.08)" : "none",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              <div className={proj.highlights ? "feat-body" : undefined}>
                <div>
                  {/* kind */}
                  <p style={{ fontSize: "0.8rem", color: T.muted, fontWeight: 500, marginBottom: "0.75rem" }}>
                    {proj.kind}
                  </p>

                  {/* title */}
                  <h3 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: proj.featured ? "1.4rem" : "1.1rem", fontWeight: 700,
                    marginBottom: "0.5rem", color: T.text,
                  }}>
                    {proj.title}
                  </h3>

                  {/* desc */}
                  <p style={{ fontSize: "0.9rem", color: T.muted, lineHeight: 1.7, marginBottom: "1.25rem" }}>
                    {proj.desc}
                  </p>

                  {/* tech badges */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
                    {proj.tech.map(t => (
                      <span key={t} style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem",
                        background: T.bgAlt, color: T.muted,
                        padding: "0.2rem 0.6rem", borderRadius: 4,
                        border: `1px solid ${T.border}`,
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* links (hidden until a real URL is set) */}
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <ProjectLink href={proj.github}>GitHub →</ProjectLink>
                    <ProjectLink href={proj.demo}>Live Demo →</ProjectLink>
                  </div>
                </div>

                {/* highlights (featured project only) */}
                {proj.highlights && (
                  <ul className="feat-list" style={{ listStyle: "none" }}>
                    {proj.highlights.map(h => (
                      <li key={h} style={{
                        display: "flex", gap: "0.65rem", alignItems: "baseline",
                        fontSize: "0.9rem", color: T.text, lineHeight: 1.6, marginBottom: "0.7rem",
                      }}>
                        <span style={{ color: T.accent, fontWeight: 700 }}>✓</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ padding: "80px 2rem", background: T.dark }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <p style={{ ...shared.label, justifyContent: "center", display: "flex" }}>// contact</p>
        <h2 style={{ ...shared.title, color: T.white }}>Let's Work Together</h2>
        <p style={{ ...shared.subtitle, color: T.subtle, margin: "0 auto 2rem", textAlign: "center" }}>
          I'm currently looking for OJT opportunities. Feel free to reach out!
        </p>

        <a href={`mailto:${EMAIL}`} style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "1.5rem", fontWeight: 700, color: T.white,
          textDecoration: "none", display: "inline-block",
          marginBottom: "2rem", paddingBottom: 2,
          borderBottom: `2px solid ${T.accent}`,
        }}>
          {EMAIL}
        </a>

        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
          {SOCIALS.map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" style={{
              fontSize: "0.9rem", fontWeight: 500, color: T.subtle, textDecoration: "none",
            }}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      background: T.dark, borderTop: "1px solid #1E293B",
      padding: "1.5rem 2rem", textAlign: "center",
    }}>
      <p style={{ fontSize: "0.85rem", color: "#475569" }}>
        Built with React · © {new Date().getFullYear()} {NAME}
      </p>
    </footer>
  );
}

function PrimaryBtn({ children, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "0.75rem 1.75rem", borderRadius: 6, border: "none",
        fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", fontWeight: 600,
        cursor: "pointer", transition: "all 0.2s",
        background: hov ? T.accentHover : T.accent,
        color: T.white,
        transform: hov ? "translateY(-1px)" : "none",
      }}
    >
      {children}
    </button>
  );
}

function OutlineBtn({ children, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "0.75rem 1.75rem", borderRadius: 6,
        fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", fontWeight: 600,
        cursor: "pointer", transition: "all 0.2s", background: "transparent",
        color: hov ? T.white    : "#CBD5E1",
        border: hov ? `1px solid ${T.accent}` : "1px solid #334155",
      }}
    >
      {children}
    </button>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────

export default function Portfolio() {
  useEffect(() => {
    // ── Reset browser defaults that cause side borders ──
    document.documentElement.style.margin  = "0";
    document.documentElement.style.padding = "0";
    document.body.style.margin             = "0";
    document.body.style.padding            = "0";
    document.body.style.overflowX          = "hidden";
    document.body.style.width              = "100%";

    // Inject Google Fonts
    if (!document.querySelector("#gf-portfolio")) {
      const link = document.createElement("link");
      link.id   = "gf-portfolio";
      link.rel  = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap";
      document.head.appendChild(link);
    }

    // Inject global styles (replaces the old copy so edits apply on hot reload)
    let style = document.querySelector("#portfolio-global");
    if (!style) {
      style = document.createElement("style");
      style.id = "portfolio-global";
      document.head.appendChild(style);
    }
    style.textContent = GLOBAL_CSS;
  }, []);

  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      color: T.text,
      width: "100%",
      minWidth: "100%",
      overflowX: "hidden",
    }}>
      <NavBar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}