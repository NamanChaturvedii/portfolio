import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { scrollToId } from "./hooks";

const LINKS = [
    ["home", "Home"],
    ["expertise", "Expertise"],
    ["work", "Work"],
    ["experience", "Experience"],
    ["about", "About"],
];

export default function Nav() {
    const [active, setActive] = useState("home");
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [pill, setPill] = useState({ left: 0, width: 0 });
    const linkRefs = useRef({});

    useEffect(() => {
        let last = window.scrollY;
        const onScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 30);
            setHidden(y > last && y > 400);
            last = y;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
            { rootMargin: "-45% 0px -50% 0px" }
        );
        [...LINKS.map(([id]) => id), "contact"].forEach((id) => {
            const el = document.getElementById(id);
            if (el) io.observe(el);
        });
        return () => io.disconnect();
    }, []);

    useLayoutEffect(() => {
        const update = () => {
            const el = linkRefs.current[active];
            setPill(el ? { left: el.offsetLeft, width: el.offsetWidth } : (p) => ({ ...p, width: 0 }));
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, [active]);

    useEffect(() => {
        document.documentElement.classList.toggle("menu-open", open);
    }, [open]);

    const go = (id) => {
        setOpen(false);
        scrollToId(id);
    };

    return (
        <>
            <header className={`nav ${hidden && !open ? "is-hidden" : ""} ${scrolled ? "is-scrolled" : ""}`}>
                <button className="nav__logo" onClick={() => go("home")} aria-label="Back to top">
                    <span className="nav__logo-mark">N</span>
                    <span className="nav__logo-text">
                        naman<span>.</span>
                    </span>
                </button>

                <nav className="nav__links" aria-label="Primary">
                    <span className="nav__pill" style={{ transform: `translateX(${pill.left}px)`, width: pill.width }} />
                    {LINKS.map(([id, label]) => (
                        <button
                            key={id}
                            ref={(el) => (linkRefs.current[id] = el)}
                            className={`nav__link ${active === id ? "is-active" : ""}`}
                            onClick={() => go(id)}
                        >
                            {label}
                        </button>
                    ))}
                </nav>

                <button className="nav__cta" onClick={() => go("contact")}>
                    Let's talk
                    <span className="nav__cta-dot" />
                </button>

                <button
                    className={`nav__burger ${open ? "is-open" : ""}`}
                    onClick={() => setOpen((o) => !o)}
                    aria-label="Menu"
                    aria-expanded={open}
                >
                    <span />
                    <span />
                </button>
            </header>

            <div className={`menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
                <ul>
                    {[...LINKS, ["contact", "Contact"]].map(([id, label], i) => (
                        <li key={id} style={{ "--i": i }}>
                            <button onClick={() => go(id)} tabIndex={open ? 0 : -1}>
                                <span className="menu__num">0{i + 1}</span>
                                {label}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="menu__foot">namanchaturvedi58@gmail.com</div>
            </div>
        </>
    );
}
