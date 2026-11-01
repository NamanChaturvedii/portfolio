import { useCallback, useEffect, useRef, useState } from "react";
import data from "../data/index.json";
import { SpotCard, Magnetic } from "./Effects";
import { useInView, useCountUp, scrollToId } from "./hooks";

const EMAIL = "namanchaturvedi58@gmail.com";
const CERTS_URL = "https://drive.google.com/drive/folders/1kKFffp0NkT-I_vj_CcRonz1XpWDp6gLT?usp=sharing";

const RESUMES = [
    {
        label: "Full Stack Resume",
        sub: "React · Node.js · AWS",
        href: "https://drive.google.com/file/d/1ys4fJ83C3CC4ME8xQS7NWGuDaspoiJnn/view?usp=sharing",
    },
    {
        label: "DevOps Resume",
        sub: "Terraform · Docker · K8s",
        href: "https://drive.google.com/file/d/1mu3cRuDWKqmY6jSJZd_KlNsiEW_spnPa/view?usp=sharing",
    },
];

const SOCIALS = [
    { label: "GitHub", href: "https://github.com/NamanChaturvedii" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/namanchaturvedii/" },
    { label: "Instagram", href: "https://www.instagram.com/naman_chaturvedi__/" },
];

const ROLES = ["Full Stack Developer", "DevOps Engineer", "Cloud Architect", "AI/ML Engineer"];

const CHIPS = [
    { t: "React", x: "-10%", y: "10%", d: 1.2, c: "#61dafb" },
    { t: "Terraform", x: "72%", y: "4%", d: 0.8, c: "#a78bfa" },
    { t: "Kubernetes", x: "78%", y: "52%", d: 1.4, c: "#60a5fa" },
    { t: "Node.js", x: "-16%", y: "44%", d: 1, c: "#4ade80" },
    { t: "Docker", x: "60%", y: "90%", d: 0.7, c: "#38bdf8" },
];

const Arrow = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 17L17 7M8 7h9v9" />
    </svg>
);

const Icon = ({ children }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {children}
    </svg>
);

const SKILL_ICONS = {
    "1": <Icon><path d="M8 6l-6 6 6 6M16 6l6 6-6 6" /></Icon>,
    "2": <Icon><rect x="3" y="4" width="18" height="7" rx="2" /><rect x="3" y="13" width="18" height="7" rx="2" /><path d="M7 7.5h.01M7 16.5h.01" /></Icon>,
    "3": <Icon><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></Icon>,
    "4": <Icon><path d="M17.5 19a4.5 4.5 0 100-9 6 6 0 00-11.6 1.8A3.6 3.6 0 006.5 19z" /></Icon>,
    "4a": <Icon><path d="M12 2l10 5-10 5L2 7l10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></Icon>,
    "4b": <Icon><circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="8" r="2.5" /><path d="M6 8.5v7M18 10.5c0 4-6 3-11 5.5" /></Icon>,
    "4c": <Icon><path d="M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8" /></Icon>,
    "5": <Icon><path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 01-12 0V8zM12 18v4" /></Icon>,
    "6": <Icon><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></Icon>,
    "7": <Icon><path d="M4 17l6-5-6-5M12 19h8" /></Icon>,
    "8": <Icon><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" /></Icon>,
};

const PLATFORM_IDS = new Set(["4", "4a", "4b", "4c"]);
const WIDE_CELLS = new Set([0, 4, 6, 9, 10]);

const TIMELINE = [
    {
        kind: "Work",
        when: "Jun 2026 — Present",
        where: "Pune, India",
        title: "AI/ML Engineer Trainee",
        org: "Coherent Market Insights",
        points: [
            "Built and ran AI-powered research pipelines that automate market and vendor discovery, classification, and validation, turning live research into structured, client-ready reports.",
            "Developed a multi-stage AI pipeline that researches markets, identifies consumer and buyer segments, and generates validated survey reports with simulated response data and automated quality checks.",
            "Automated update and distribution workflows, so non-technical teams get the latest pipeline improvements without manual redeployment.",
            "Engineered prompt templates and LLM orchestration logic to keep AI outputs consistent and high-quality across varied research domains.",
        ],
        tags: ["Python", "Claude API", "AI Pipelines", "Prompt Engineering", "LLM Orchestration", "Automation", "Data Validation"],
    },
    {
        kind: "Education",
        when: "2022 — 2026",
        where: "Bhopal, India",
        title: "B.Tech, Computer Science & Engineering",
        org: "VIT Bhopal University",
        points: ["Graduated with a CGPA of 8.46 / 10."],
        tags: [],
    },
];

const CERTS = [
    {
        name: "AWS Certified Solutions Architect – Associate",
        code: "SAA-C03",
        href: "https://drive.google.com/file/d/1w9y8F4uq1x6qkC8VPsmi5ywtBKIh7YeG/view?usp=sharing",
    },
    {
        name: "AWS Certified Cloud Practitioner",
        code: "CLF-C02",
        href: "https://drive.google.com/file/d/1QEv8JNhs683oZwo-7TmqnpMrlbZGVoyh/view?usp=drive_link",
    },
];

const TECH_A = ["React", "Next.js", "Node.js", "Express", "TypeScript", "Spring Boot", "PostgreSQL", "MongoDB", "Prisma", "Socket.io", "Razorpay", "Claude API"];
const TECH_B = ["AWS", "Terraform", "Ansible", "Docker", "Kubernetes", "Helm", "GitHub Actions", "Trivy", "Prometheus", "Grafana", "Nginx", "Linux"];

const TERMINAL = [
    { c: "whoami", o: "naman — full stack & devops engineer" },
    { c: "terraform apply -auto-approve", o: "Apply complete! Infrastructure is live." },
    { c: "kubectl get pods", o: "portfolio-web   1/1   Running" },
    { c: "git push origin main", o: "✓ pipeline passed · deployed" },
];

function Letters({ text, delay = 0 }) {
    return (
        <span className="letters" aria-label={text}>
            {[...text].map((ch, i) => (
                <span key={i} className="letter" aria-hidden="true" style={{ "--i": i, "--d": `${delay}ms` }}>
                    {ch}
                </span>
            ))}
        </span>
    );
}

function Stat({ value, decimals = 0, suffix = "", label, start }) {
    const v = useCountUp(value, start, 1800, decimals);
    return (
        <div className="stat">
            <div className="stat__num">
                {v}
                {suffix}
            </div>
            <div className="stat__label">{label}</div>
        </div>
    );
}

function SectionHead({ num, kicker, title, children }) {
    return (
        <div className="shead">
            <div className="shead__kicker" data-reveal>
                <span className="shead__num">{num}</span>
                <span className="shead__line" />
                {kicker}
            </div>
            <h2 className="shead__title" data-reveal style={{ "--rd": "80ms" }}>
                {title}
            </h2>
            {children && (
                <p className="shead__sub" data-reveal style={{ "--rd": "160ms" }}>
                    {children}
                </p>
            )}
        </div>
    );
}

const PORTRAIT_SRC = "./img/orname1.JPG";
// Canvas extends this fraction beyond the frame on every side so pieces can fly in from outside it.
const SCATTER_PAD = 0.35;

function buildParticles(img, fw, fh) {
    const gap = fw < 360 ? 4 : 5;
    const cols = Math.floor(fw / gap);
    const rows = Math.floor(fh / gap);
    const off = document.createElement("canvas");
    off.width = cols;
    off.height = rows;
    const octx = off.getContext("2d", { willReadFrequently: true });
    const scale = Math.max(cols / img.naturalWidth, rows / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    octx.drawImage(img, (cols - dw) * 0.5, (rows - dh) * 0.2, dw, dh);
    const px = octx.getImageData(0, 0, cols, rows).data;

    const ox = fw * SCATTER_PAD;
    const oy = fh * SCATTER_PAD;
    const cw = fw + ox * 2;
    const ch = fh + oy * 2;
    const r = fw / 2;
    const spread = Math.min(cw, ch) / 2;
    const buckets = Array.from({ length: 16 }, () => []);

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const cx = x * gap + gap / 2;
            const cy = y * gap + gap / 2;
            // Skip pixels outside the arch's rounded top.
            if (cy < r && (cx - r) ** 2 + (cy - r) ** 2 > r * r) continue;
            const i = (y * cols + x) * 4;
            const lum = (0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2]) / 255;
            const level = Math.round(Math.min(1, Math.max(0, (lum - 0.5) * 1.3 + 0.53)) * 15);
            const angle = Math.random() * Math.PI * 2;
            const dist = (0.35 + Math.random() * 0.65) * spread;
            buckets[level].push({
                tx: ox + x * gap,
                ty: oy + y * gap,
                sx: ox + fw / 2 + Math.cos(angle) * dist,
                sy: oy + fh / 2 + Math.sin(angle) * dist,
                delay: Math.random() * 650 + (y / rows) * 550,
            });
        }
    }
    return { buckets, gap, cw, ch };
}

function Portrait({ start }) {
    const frameRef = useRef(null);
    const canvasRef = useRef(null);
    const imgRef = useRef(null);
    const rafRef = useRef(0);
    const [assembled, setAssembled] = useState(false);

    const play = useCallback(() => {
        const frame = frameRef.current;
        const canvas = canvasRef.current;
        const img = imgRef.current;
        if (!frame || !canvas || !img || !img.naturalWidth) return;
        cancelAnimationFrame(rafRef.current);
        setAssembled(false);

        const { buckets, gap, cw, ch } = buildParticles(img, frame.offsetWidth, frame.offsetHeight);
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = cw * dpr;
        canvas.height = ch * dpr;
        const ctx = canvas.getContext("2d");
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const DUR = 1500;
        const total = 1200 + DUR;
        const t0 = performance.now();
        const draw = (t) => {
            const el = t - t0;
            ctx.clearRect(0, 0, cw, ch);
            for (let l = 0; l < 16; l++) {
                const v = Math.round((l / 15) * 255);
                ctx.fillStyle = `rgb(${v},${v},${v})`;
                const list = buckets[l];
                for (let i = 0; i < list.length; i++) {
                    const p = list[i];
                    const k = Math.min(1, Math.max(0, (el - p.delay) / DUR));
                    const e = 1 - Math.pow(1 - k, 4);
                    const s = gap * (0.35 + 0.6 * e);
                    ctx.fillRect(p.sx + (p.tx - p.sx) * e, p.sy + (p.ty - p.sy) * e, s, s);
                }
            }
            if (el < total) rafRef.current = requestAnimationFrame(draw);
            else setAssembled(true);
        };
        rafRef.current = requestAnimationFrame(draw);
    }, []);

    useEffect(() => {
        if (!start) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setAssembled(true);
            return;
        }
        const img = imgRef.current;
        let timer;
        const go = () => {
            timer = setTimeout(play, 350);
        };
        if (img.complete && img.naturalWidth) go();
        else img.addEventListener("load", go, { once: true });
        return () => {
            clearTimeout(timer);
            img.removeEventListener("load", go);
            cancelAnimationFrame(rafRef.current);
        };
    }, [start, play]);

    return (
        <div
            className={`portrait ${assembled ? "is-assembled" : ""}`}
            data-cursor={assembled ? "Replay" : undefined}
            onClick={() => assembled && play()}
        >
            <div className="portrait__orbit" />
            <div className="portrait__glow" />
            <div className="portrait__ring" />
            <div className="portrait__frame" ref={frameRef}>
                <img ref={imgRef} src={PORTRAIT_SRC} alt="Naman Chaturvedi" />
            </div>
            <canvas ref={canvasRef} className="portrait__canvas" aria-hidden="true" />
            <div className="portrait__badge">
                <span className="portrait__badge-icon">AWS</span>
                <span>
                    <strong>Solutions Architect</strong>
                    <small>Associate · Certified</small>
                </span>
            </div>
            {CHIPS.map((c, i) => (
                <span key={c.t} className="chip-float" style={{ "--x": c.x, "--y": c.y, "--depth": c.d, "--fd": `${i * -1.3}s` }}>
                    <i style={{ background: c.c, color: c.c }} />
                    {c.t}
                </span>
            ))}
        </div>
    );
}

export function Hero({ loaded }) {
    const [role, setRole] = useState(0);
    const [open, setOpen] = useState(false);
    const ddRef = useRef(null);
    const heroRef = useRef(null);
    const [statsRef, statsIn] = useInView(0.4);

    useEffect(() => {
        const t = setInterval(() => setRole((r) => (r + 1) % ROLES.length), 2600);
        return () => clearInterval(t);
    }, []);

    useEffect(() => {
        const close = (e) => {
            if (ddRef.current && !ddRef.current.contains(e.target)) setOpen(false);
        };
        const esc = (e) => e.key === "Escape" && setOpen(false);
        document.addEventListener("mousedown", close);
        document.addEventListener("keydown", esc);
        return () => {
            document.removeEventListener("mousedown", close);
            document.removeEventListener("keydown", esc);
        };
    }, []);

    const onMove = (e) => {
        const el = heroRef.current;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        el.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    };

    return (
        <section id="home" className="hero" ref={heroRef} onMouseMove={onMove}>
            <div className="hero__content">
                <div className="hero__status anim" style={{ "--d": "100ms" }}>
                    <span className="pulse" />
                    Currently AI/ML Engineer Trainee @ Coherent Market Insights
                </div>

                <h1 className="hero__title">
                    <span className="hero__line">
                        <Letters text="Naman" delay={150} />
                    </span>
                    <span className="hero__line hero__line--outline">
                        <Letters text="Chaturvedi" delay={380} />
                    </span>
                </h1>

                <div className="hero__role anim" style={{ "--d": "900ms" }}>
                    <span className="hero__role-prefix">I'm a</span>
                    <span className="hero__role-window">
                        <span key={role} className="hero__role-word">
                            {ROLES[role]}
                        </span>
                    </span>
                </div>

                <p className="hero__desc anim" style={{ "--d": "1050ms" }}>
                    I like owning the whole thing — writing the app, setting up the infrastructure, and making sure it
                    actually stays up. I build full-stack web apps, then provision, containerize and ship them with
                    Terraform, Docker, Kubernetes and pipelines that deploy without anyone babysitting them.
                </p>

                <div className="hero__actions anim" style={{ "--d": "1200ms" }}>
                    <div className="dropdown" ref={ddRef}>
                        <Magnetic>
                            <button className="btn btn--primary" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="menu">
                                Get Resume
                                <svg className={`chev ${open ? "is-open" : ""}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </button>
                        </Magnetic>
                        <div className={`dropdown__menu ${open ? "is-open" : ""}`} role="menu">
                            {RESUMES.map((r) => (
                                <a
                                    key={r.label}
                                    href={r.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    role="menuitem"
                                    tabIndex={open ? 0 : -1}
                                    className="dropdown__item"
                                    onClick={() => setOpen(false)}
                                >
                                    <span className="dropdown__label">{r.label}</span>
                                    <span className="dropdown__sub">{r.sub}</span>
                                    <Arrow />
                                </a>
                            ))}
                        </div>
                    </div>

                    <Magnetic>
                        <button className="btn btn--ghost" onClick={() => scrollToId("work")}>
                            View my work
                        </button>
                    </Magnetic>

                    <a className="link-underline" href={CERTS_URL} target="_blank" rel="noreferrer">
                        Certificates <Arrow size={14} />
                    </a>
                </div>

                <div className="hero__stats anim" style={{ "--d": "1350ms" }} ref={statsRef}>
                    <Stat value={4} label="Live products shipped" start={statsIn} />
                    <Stat value={2} suffix="×" label="AWS certified" start={statsIn} />
                    <Stat value={8.46} decimals={2} label="CGPA, VIT Bhopal" start={statsIn} />
                </div>
            </div>

            <div className="hero__visual anim" style={{ "--d": "450ms" }}>
                <Portrait start={loaded} />
            </div>

            <button className="scroll-cue" onClick={() => scrollToId("expertise")} aria-label="Scroll to expertise">
                <span>Scroll</span>
                <i />
            </button>
        </section>
    );
}

function MarqueeRow({ items, reverse }) {
    return (
        <div className={`marquee__row ${reverse ? "is-reverse" : ""}`}>
            <div className="marquee__track">
                {[...items, ...items].map((t, i) => (
                    <span key={i} className="marquee__item" aria-hidden={i >= items.length}>
                        {t}
                        <i>✦</i>
                    </span>
                ))}
            </div>
        </div>
    );
}

export function Marquee() {
    return (
        <section className="marquee" aria-label="Tech stack">
            <MarqueeRow items={TECH_A} />
            <MarqueeRow items={TECH_B} reverse />
        </section>
    );
}

export function Expertise() {
    return (
        <section id="expertise" className="section">
            <SectionHead num="01" kicker="Expertise" title={<>Two crafts, <em>one engineer.</em></>}>
                I build the product and the platform it runs on — from the first React component to the Terraform that
                provisions its servers.
            </SectionHead>

            <div className="bento">
                {data.skills.map((s, i) => {
                    const parts = s.description.split("•").map((p) => p.trim()).filter(Boolean);
                    const last = parts[parts.length - 1];
                    const tagline = last && last.split(" ").length >= 5 && !last.includes("(") ? last : null;
                    const chips = tagline ? parts.slice(0, -1) : parts;
                    const platform = PLATFORM_IDS.has(s.id);
                    return (
                        <div key={s.id} className={`bento__cell ${WIDE_CELLS.has(i) ? "is-wide" : ""}`} data-reveal style={{ "--rd": `${(i % 4) * 80}ms` }}>
                            <SpotCard className="skill">
                                <div className="skill__top">
                                    <span className="skill__icon">{SKILL_ICONS[s.id]}</span>
                                    <span className={`skill__tag ${platform ? "is-platform" : ""}`}>{platform ? "Platform" : "Product"}</span>
                                </div>
                                <h3 className="skill__title">{s.title}</h3>
                                {tagline && <p className="skill__tagline">“{tagline}”</p>}
                                <ul className="skill__chips">
                                    {chips.map((c) => (
                                        <li key={c}>{c}</li>
                                    ))}
                                </ul>
                                <span className="skill__mark" aria-hidden="true">{SKILL_ICONS[s.id]}</span>
                            </SpotCard>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export function Work() {
    const open = (url) => window.open(url, "_blank", "noopener");
    return (
        <section id="work" className="section">
            <div className="shead-row">
                <SectionHead num="02" kicker="Selected work" title={<>Things I've <em>shipped.</em></>}>
                    Real products with real users, payments and infrastructure — most of them self-hosted and live right now.
                </SectionHead>
                <div data-reveal>
                    <Magnetic>
                        <a className="btn btn--ghost" href="https://github.com/NamanChaturvedii?tab=repositories" target="_blank" rel="noreferrer">
                            All repos on GitHub <Arrow />
                        </a>
                    </Magnetic>
                </div>
            </div>

            <div className="work">
                {data.portfolio.map((p, i) => (
                    <div key={p.title} className="work__cell" data-reveal style={{ "--rd": `${(i % 2) * 110}ms` }}>
                        <SpotCard
                            className="project"
                            role="link"
                            tabIndex={0}
                            data-cursor={p.link === "View code" ? "Code" : "Visit"}
                            onClick={() => open(p.link2)}
                            onKeyDown={(e) => e.key === "Enter" && open(p.link2)}
                        >
                            <div className="project__media">
                                <img src={p.src} alt={p.title} loading="lazy" />
                                <span className="project__num">{String(i + 1).padStart(2, "0")}</span>
                            </div>
                            <div className="project__body">
                                <div className="project__head">
                                    <h3>{p.title}</h3>
                                    <span className="project__link">
                                        {p.link}
                                        <Arrow size={13} />
                                    </span>
                                </div>
                                <p>{p.description}</p>
                            </div>
                        </SpotCard>
                    </div>
                ))}
            </div>
        </section>
    );
}

export function Experience() {
    const ref = useRef(null);

    useEffect(() => {
        let raf = null;
        const update = () => {
            raf = null;
            const el = ref.current;
            if (!el) return;
            const r = el.getBoundingClientRect();
            const p = Math.min(1, Math.max(0, (window.innerHeight * 0.65 - r.top) / r.height));
            el.style.setProperty("--progress", p.toFixed(4));
        };
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(update);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        update();
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <section id="experience" className="section">
            <SectionHead num="03" kicker="Experience" title={<>Where I've <em>been building.</em></>} />

            <div className="timeline" ref={ref}>
                <div className="timeline__track">
                    <span className="timeline__fill" />
                </div>
                {TIMELINE.map((t) => (
                    <article key={t.org} className="tl" data-reveal>
                        <div className="tl__meta">
                            <span className="tl__kind">{t.kind}</span>
                            <span className="tl__when">{t.when}</span>
                            <span className="tl__where">{t.where}</span>
                        </div>
                        <span className="tl__dot" />
                        <SpotCard className="tl__card" tilt={false}>
                            <h3>{t.title}</h3>
                            <div className="tl__org">{t.org}</div>
                            <ul className="tl__points">
                                {t.points.map((p) => (
                                    <li key={p}>{p}</li>
                                ))}
                            </ul>
                            {t.tags.length > 0 && (
                                <ul className="tags">
                                    {t.tags.map((x) => (
                                        <li key={x}>{x}</li>
                                    ))}
                                </ul>
                            )}
                        </SpotCard>
                    </article>
                ))}
            </div>

            <div className="certs">
                {CERTS.map((c, i) => (
                    <div key={c.code} data-reveal style={{ "--rd": `${i * 100}ms` }}>
                        <a className="cert" href={c.href} target="_blank" rel="noreferrer" data-cursor="View">
                            <span className="cert__badge">AWS</span>
                            <span className="cert__text">
                                <span className="cert__name">{c.name}</span>
                                <span className="cert__code">{c.code}</span>
                            </span>
                            <Arrow />
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}

const PIPELINE = [
    { title: <code>git push</code>, sub: "main → GitHub", tag: "Code" },
    { title: "Build · Test · Scan", sub: "GitHub Actions + Trivy", tag: "CI" },
    { title: "Docker image", sub: "multi-stage → Amazon ECR", tag: "Artifact" },
    { title: <code>terraform apply</code>, sub: "VPC · ALB · EC2 · RDS", tag: "IaC" },
    { title: "Deployed", sub: "Kubernetes · Nginx · Ansible", tag: "Run" },
    { title: "Observed", sub: "Prometheus + Grafana", tag: "Monitor", spark: true },
];

function PipelineCard() {
    return (
        <div className="pipe" role="img" aria-label="Deployment pipeline: git push, CI build and scan, Docker image, Terraform on AWS, Kubernetes deploy, Prometheus and Grafana monitoring">
            <div className="pipe__head">
                <span className="pipe__file">
                    .github/workflows/<b>ship.yml</b>
                </span>
                <span className="pipe__status">
                    <i />
                    passing
                </span>
            </div>
            <div className="pipe__list">
                <span className="pipe__rail" />
                {PIPELINE.map((s, i) => (
                    <div key={s.tag} className="pipe__row">
                        <span className="pipe__node">{String(i + 1).padStart(2, "0")}</span>
                        <span className="pipe__body">
                            <span className="pipe__title">{s.title}</span>
                            <span className="pipe__sub">{s.sub}</span>
                        </span>
                        {s.spark ? (
                            <svg className="pipe__spark" width="56" height="22" viewBox="0 0 56 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M1 16l7-4 6 5 7-10 7 6 6-3 7 4 7-9 7 3" />
                            </svg>
                        ) : (
                            <span className="pipe__tag">{s.tag}</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export function About() {
    const [termRef, termIn] = useInView(0.35);

    let delay = 300;
    const lines = TERMINAL.map((l) => {
        const cmdDelay = delay;
        delay += l.c.length * 45 + 350;
        const outDelay = delay;
        delay += 450;
        return { ...l, cmdDelay, outDelay };
    });

    const facts = [
        ["Based in", "Pune, India"],
        ["Currently", "AI/ML Trainee @ CMI"],
        ["Studied", "B.Tech CSE · VIT Bhopal"],
        ["Certified", "AWS SAA + Cloud Practitioner"],
    ];

    return (
        <section id="about" className="section">
            <SectionHead num="04" kicker="About" title={<>The person <em>behind the deploys.</em></>} />

            <div className="about__grid">
                <div className="about__media" data-reveal>
                    <PipelineCard />
                    <div ref={termRef} className={`terminal ${termIn ? "is-on" : ""}`}>
                        <div className="terminal__bar">
                            <i />
                            <i />
                            <i />
                            <span>~/naman — zsh</span>
                        </div>
                        <div className="terminal__body">
                            {lines.map((l) => (
                                <div key={l.c}>
                                    <div className="terminal__cmd" style={{ "--n": l.c.length, "--td": `${l.cmdDelay}ms` }}>
                                        <span className="terminal__prompt">❯</span>
                                        <span className="terminal__typed">{l.c}</span>
                                    </div>
                                    <div className="terminal__out" style={{ "--od": `${l.outDelay}ms` }}>
                                        {l.o}
                                    </div>
                                </div>
                            ))}
                            <div className="terminal__cmd" style={{ "--td": `${delay}ms` }}>
                                <span className="terminal__prompt">❯</span>
                                <span className="terminal__caret" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="about__text">
                    <p className="about__lead" data-reveal>
                        I'm Naman — a CS grad from VIT Bhopal who genuinely enjoys figuring out how things work end to end.
                    </p>
                    <p data-reveal>
                        Not just writing the feature, but understanding what happens after you push to main. That curiosity
                        is what pulled me toward both full-stack development and DevOps.
                    </p>
                    <p data-reveal>
                        I've built and shipped four real web apps — <strong>KundaliGyan, MentorOne, BloodBridge and WealthIn</strong> —
                        with actual users, real payment flows, and deployments I manage myself on Ubuntu VPS and AWS. I set
                        them up that way on purpose, because clicking "deploy" on a PaaS felt like skipping the interesting part.
                    </p>
                    <p data-reveal>
                        These days I'm going deep on the infrastructure side — Terraform instead of clicking through the
                        console, Ansible for server config, Docker and Kubernetes for running things, and GitHub Actions
                        pipelines that build, scan and deploy on their own. Prometheus and Grafana keep an eye on it all.
                    </p>
                    <div className="about__facts" data-reveal>
                        {facts.map(([k, v]) => (
                            <div key={k} className="fact">
                                <span className="fact__k">{k}</span>
                                <span className="fact__v">{v}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export function Contact() {
    const [copied, setCopied] = useState(false);
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            window.location.href = `mailto:${EMAIL}`;
        }
    };

    return (
        <section id="contact" className="section contact">
            <div className="contact__glow" aria-hidden="true" />
            <div className="shead__kicker" data-reveal>
                <span className="shead__num">05</span>
                <span className="shead__line" />
                Contact
            </div>
            <h2 className="contact__title" data-reveal style={{ "--rd": "80ms" }}>
                Got an idea, a role,
                <br />
                or a <em>broken pipeline?</em>
            </h2>
            <p className="contact__sub" data-reveal style={{ "--rd": "160ms" }}>
                I'm always up for building something real. Drop me a line and let's talk.
            </p>
            <div className="contact__actions" data-reveal style={{ "--rd": "240ms" }}>
                <Magnetic strength={0.2}>
                    <a className="contact__email" href={`mailto:${EMAIL}`}>
                        {EMAIL}
                        <Arrow size={22} />
                    </a>
                </Magnetic>
                <button className="btn btn--ghost" onClick={copy}>
                    {copied ? "Copied ✓" : "Copy email"}
                </button>
            </div>
            <div className="contact__meta" data-reveal style={{ "--rd": "320ms" }}>
                {SOCIALS.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="link-underline">
                        {s.label}
                        <Arrow size={12} />
                    </a>
                ))}
            </div>
        </section>
    );
}

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer__big" aria-hidden="true">
                NAMAN
            </div>
            <div className="footer__row">
                <span>© {new Date().getFullYear()} Naman Chaturvedi</span>
                <span>Built with React and a lot of CSS.</span>
                <button className="link-underline" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                    Back to top ↑
                </button>
            </div>
        </footer>
    );
}
