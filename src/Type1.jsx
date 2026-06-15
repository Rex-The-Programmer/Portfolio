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

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "4rem", alignItems: "center",
        }}>
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

// ─── SKILLS ───────────────────────────────────────────────────────

const SKILL_COLORS = {
  "Languages":          { accent: "#2563EB", border: "rgba(37,99,235,0.3)",  tag: "rgba(37,99,235,0.2)"  },
  "Tools & Platforms":  { accent: "#7C3AED", border: "rgba(124,58,237,0.3)", tag: "rgba(124,58,237,0.2)" },
  "Currently Learning": { accent: "#10B981", border: "rgba(16,185,129,0.3)", tag: "rgba(16,185,129,0.2)" },
};

function Skills() {
  const [hovTag, setHovTag] = useState(null);

  return (
    <section id="skills" style={{
      padding: "80px 2rem", background: "#0A0F1E",
      position: "relative", overflow: "hidden",
    }}>
      {/* Floating orb — blue */}
      <div style={{
        position: "absolute", top: "15%", left: "5%",
        width: 360, height: 360, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)",
        animation: "float 7s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      {/* Floating orb — purple */}
      <div style={{
        position: "absolute", bottom: "10%", right: "8%",
        width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
        animation: "float 9s ease-in-out infinite reverse",
        pointerEvents: "none",
      }} />
      {/* Floating orb — green */}
      <div style={{
        position: "absolute", top: "50%", right: "25%",
        width: 200, height: 200, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 70%)",
        animation: "float 5s ease-in-out infinite 1s",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <p style={shared.label}>// skills</p>
        <h2 style={{ ...shared.title, color: T.white }}>What I Know</h2>
        <p style={{ ...shared.subtitle, color: "#94A3B8" }}>
          Technologies and tools I've been learning and practicing.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
        }}>
          {SKILLS.map(group => {
            const c = SKILL_COLORS[group.category] || SKILL_COLORS["Languages"];
            return (
              <div key={group.category} style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderTop: `3px solid ${c.accent}`,
                borderRadius: 12, padding: "1.75rem",
                backdropFilter: "blur(12px)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.1rem" }}>
                  <span style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: c.accent, display: "inline-block",
                    boxShadow: `0 0 8px ${c.accent}`,
                  }} />
                  <p style={{
                    fontSize: "0.8rem", fontWeight: 600, color: c.accent,
                    textTransform: "uppercase", letterSpacing: "0.08em",
                  }}>
                    {group.category}
                  </p>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {group.tags.map(tag => (
                    <span
                      key={tag}
                      onMouseEnter={() => setHovTag(tag)}
                      onMouseLeave={() => setHovTag(null)}
                      style={{
                        background: hovTag === tag ? c.accent : c.tag,
                        color: hovTag === tag ? "#FFFFFF" : c.accent,
                        border: `1px solid ${c.border}`,
                        padding: "0.35rem 0.8rem", borderRadius: 100,
                        fontSize: "0.82rem", fontWeight: 500,
                        cursor: "default", transition: "all 0.2s",
                        transform: hovTag === tag ? "scale(1.08)" : "scale(1)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────

const PROJECT_COLORS = [
  { gradient: "linear-gradient(135deg, #2563EB, #7C3AED)", glow: "rgba(37,99,235,0.25)"  },
  { gradient: "linear-gradient(135deg, #10B981, #06B6D4)", glow: "rgba(16,185,129,0.25)" },
  { gradient: "linear-gradient(135deg, #F59E0B, #EF4444)", glow: "rgba(245,158,11,0.25)" },
];

function Projects() {
  const [hov, setHov] = useState(null);

  return (
    <section id="projects" style={{
      padding: "80px 2rem", background: T.white,
      position: "relative", overflow: "hidden",
    }}>
      {/* Background decorations */}
      <div style={{
        position: "absolute", top: -120, right: -120,
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -100, left: -100,
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
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
          {PROJECTS.map((proj, i) => {
            const c = PROJECT_COLORS[i % PROJECT_COLORS.length];
            const isHov = hov === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                style={{
                  background: T.white, borderRadius: 14,
                  overflow: "hidden", border: `1px solid ${T.border}`,
                  transform: isHov ? "translateY(-6px)" : "none",
                  boxShadow: isHov
                    ? `0 20px 48px ${c.glow}, 0 0 0 1px ${c.glow}`
                    : "0 2px 10px rgba(0,0,0,0.05)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
              >
                {/* Animated gradient top bar */}
                <div style={{
                  height: 5, background: c.gradient,
                  backgroundSize: "200% 200%",
                  animation: "gradientBg 3s ease infinite",
                }} />

                <div style={{ padding: "1.75rem" }}>
                  {/* Gradient icon */}
                  <div style={{
                    width: 50, height: 50, background: c.gradient,
                    backgroundSize: "200% 200%",
                    animation: "gradientBg 4s ease infinite",
                    borderRadius: 12, fontSize: "1.4rem",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "1.1rem", boxShadow: `0 4px 14px ${c.glow}`,
                  }}>
                    {proj.icon}
                  </div>

                  <h3 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1.1rem", fontWeight: 700,
                    marginBottom: "0.5rem", color: T.text,
                  }}>
                    {proj.title}
                  </h3>

                  <p style={{ fontSize: "0.9rem", color: T.muted, lineHeight: 1.7, marginBottom: "1.25rem" }}>
                    {proj.desc}
                  </p>

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
              </div>
            );
          })}
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

    // Inject global reset + blink keyframe
    if (!document.querySelector("#portfolio-global")) {
      const s = document.createElement("style");
      s.id = "portfolio-global";
      s.textContent = `
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { width: 100%; min-height: 100vh; margin: 0; padding: 0; overflow-x: hidden; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `;
      document.head.appendChild(s);
    }
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