import { useState, useEffect } from "react";

const NAME = "Gerail Mendoza";

const TAGLINES = [
  "CS Student",
  "Graduating Student",
  "Software Engineer in Progress",
  "Problem Solver",
];

const ABOUT_PARAGRAPHS = [
  "Hi! I'm Gerail, an CS student from the Philippines currently preparing for my On-the-Job Training. I enjoy building things — from simple web pages to small systems that solve everyday problems.",
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
  { category: "Languages",          tags: ["HTML", "CSS", "JavaScript", "Python", "Java"] },
  { category: "Tools & Platforms",  tags: ["Git", "GitHub", "VS Code", "MySQL"] },
  { category: "Currently Learning", tags: ["React", "Node.js"] },
];

const PROJECTS = [
  {
    icon: "🌐",
    title: "Personal Portfolio",
    desc: "A responsive portfolio site built from scratch to showcase my skills and projects.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "#",
    demo: "#",
  },
];

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

const goto = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

function NavBar() {
  const [hov, setHov] = useState(null);
  const links = ["about", "skills", "projects", "contact"];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, width: "100%",
      background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)",
      borderBottom: `1px solid ${T.border}`, zIndex: 100, padding: "0 2rem",
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
          {NAME}<span style={{ color: T.accent }}>.</span>
        </button>

        <div style={{ display: "flex", gap: "2rem" }}>
          {links.map(link => (
            <button
              key={link}
              onClick={() => goto(link)}
              onMouseEnter={() => setHov(link)}
              onMouseLeave={() => setHov(null)}
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", fontWeight: 500,
                color: hov === link ? T.accent : T.muted,
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
          Hello, world! 👋
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

function About() {
  return (
    <section id="about" style={{ padding: "80px 2rem", background: T.white }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={shared.label}>// about me</p>
        <h2 style={shared.title}>Who I Am</h2>

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "4rem", alignItems: "center",
        }}>
          {/* text column */}
          <div>
            {ABOUT_PARAGRAPHS.map((txt, i) => (
              <p key={i} style={{ color: T.muted, lineHeight: 1.8, marginBottom: "1rem" }}>{txt}</p>
            ))}
            <div style={{ marginTop: "1.25rem" }}>
              <PrimaryBtn onClick={() => goto("contact")}>Let's Connect</PrimaryBtn>
            </div>
          </div>

          {/* info card */}
          <div style={{
            background: T.white, border: `1px solid ${T.border}`,
            borderRadius: 12, padding: "2rem",
          }}>
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

function Projects() {
  const [hov, setHov] = useState(null);

  return (
    <section id="projects" style={{ padding: "80px 2rem", background: T.white }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={shared.label}>// projects</p>
        <h2 style={shared.title}>What I've Built</h2>
        <p style={shared.subtitle}>
          A collection of beginner projects that showcase my progress and learning.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}>
          {PROJECTS.map((proj, i) => (
            <div
              key={i}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
              style={{
                background: T.white, border: `1px solid ${T.border}`,
                borderRadius: 12, padding: "1.75rem",
                transform:  hov === i ? "translateY(-4px)" : "none",
                boxShadow:  hov === i ? "0 12px 32px rgba(0,0,0,0.08)" : "none",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              {/* icon */}
              <div style={{
                width: 44, height: 44, background: T.accentLight, borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.3rem", marginBottom: "1rem",
              }}>
                {proj.icon}
              </div>

              {/* title */}
              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1.1rem", fontWeight: 700,
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

              {/* links */}
              <div style={{ display: "flex", gap: "1rem" }}>
                <a href={proj.github} style={{ fontSize: "0.85rem", fontWeight: 600, color: T.accent, textDecoration: "none" }}>
                  GitHub →
                </a>
                {proj.demo && (
                  <a href={proj.demo} style={{ fontSize: "0.85rem", fontWeight: 600, color: T.accent, textDecoration: "none" }}>
                    Live Demo →
                  </a>
                )}
              </div>
            </div>
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
        Built with React · © 2025 {NAME}
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
    // Inject Google Fonts
    if (!document.querySelector("#gf-portfolio")) {
      const link = document.createElement("link");
      link.id   = "gf-portfolio";
      link.rel  = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap";
      document.head.appendChild(link);
    }

    // Inject blinking cursor keyframe
    if (!document.querySelector("#blink-kf")) {
      const s = document.createElement("style");
      s.id = "blink-kf";
      s.textContent = "@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}";
      document.head.appendChild(s);
    }
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: T.text }}>
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