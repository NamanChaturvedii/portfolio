import { useEffect, useRef, useState } from "react";

export function Preloader({ onLeave, onGone }) {
    const [count, setCount] = useState(0);
    const [leaving, setLeaving] = useState(false);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            onLeave();
            onGone();
            return;
        }
        let raf;
        let timer;
        const t0 = performance.now();
        const duration = 1500;
        const tick = (t) => {
            const p = Math.min(1, (t - t0) / duration);
            setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
            if (p < 1) {
                raf = requestAnimationFrame(tick);
            } else {
                setLeaving(true);
                onLeave();
                timer = setTimeout(onGone, 1000);
            }
        };
        raf = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(timer);
        };
    }, [onLeave, onGone]);

    return (
        <div className={`preloader ${leaving ? "is-leaving" : ""}`} aria-hidden="true">
            <div className="preloader__inner">
                <div className="preloader__name">
                    <span>Naman</span>
                    <span>Chaturvedi</span>
                </div>
                <div className="preloader__bar">
                    <span style={{ transform: `scaleX(${count / 100})` }} />
                </div>
                <div className="preloader__meta">
                    <span>Full Stack · DevOps</span>
                    <span className="preloader__count">{String(count).padStart(3, "0")}</span>
                </div>
            </div>
        </div>
    );
}

export function Background() {
    return (
        <div className="bg" aria-hidden="true">
            <div className="bg__aurora">
                <span className="b1" />
                <span className="b2" />
                <span className="b3" />
            </div>
            <div className="bg__grid" />
            <div className="bg__spot" />
            <div className="bg__noise" />
        </div>
    );
}

export function Cursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const innerRef = useRef(null);

    useEffect(() => {
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const root = document.documentElement;
        const body = document.body;
        body.classList.add("has-cursor");

        let mx = window.innerWidth / 2;
        let my = window.innerHeight / 2;
        let rx = mx;
        let ry = my;
        let raf;

        const move = (e) => {
            mx = e.clientX;
            my = e.clientY;
            body.classList.add("cursor-on");
            dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
            root.style.setProperty("--cx", `${mx}px`);
            root.style.setProperty("--cy", `${my}px`);
        };
        const over = (e) => {
            const target = e.target && e.target.closest ? e.target.closest("a, button, [data-cursor]") : null;
            const label = target ? target.getAttribute("data-cursor") || "" : "";
            ringRef.current.classList.toggle("is-hover", !!target && !label);
            ringRef.current.classList.toggle("has-label", !!label);
            innerRef.current.dataset.label = label;
        };
        const down = () => ringRef.current.classList.add("is-down");
        const up = () => ringRef.current.classList.remove("is-down");
        const out = (e) => {
            if (!e.relatedTarget) body.classList.remove("cursor-on");
        };
        const loop = () => {
            rx += (mx - rx) * 0.16;
            ry += (my - ry) * 0.16;
            ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
            raf = requestAnimationFrame(loop);
        };

        window.addEventListener("mousemove", move, { passive: true });
        document.addEventListener("mouseover", over);
        document.addEventListener("mouseout", out);
        window.addEventListener("mousedown", down);
        window.addEventListener("mouseup", up);
        raf = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener("mousemove", move);
            document.removeEventListener("mouseover", over);
            document.removeEventListener("mouseout", out);
            window.removeEventListener("mousedown", down);
            window.removeEventListener("mouseup", up);
            cancelAnimationFrame(raf);
            body.classList.remove("has-cursor", "cursor-on");
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
            <div ref={ringRef} className="cursor-ring" aria-hidden="true">
                <div ref={innerRef} className="cursor-ring__inner" />
            </div>
        </>
    );
}

export function ScrollProgress() {
    const ref = useRef(null);
    useEffect(() => {
        let raf = null;
        const update = () => {
            raf = null;
            const h = document.documentElement;
            const max = h.scrollHeight - h.clientHeight;
            if (ref.current) ref.current.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
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
        <div className="progress" aria-hidden="true">
            <span ref={ref} />
        </div>
    );
}

export function SpotCard({ className = "", tilt = true, children, ...rest }) {
    const ref = useRef(null);
    const onMove = (e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        el.style.setProperty("--mx", `${x}px`);
        el.style.setProperty("--my", `${y}px`);
        if (tilt) {
            el.style.setProperty("--rx", `${(y / r.height - 0.5) * -6}deg`);
            el.style.setProperty("--ry", `${(x / r.width - 0.5) * 6}deg`);
        }
    };
    const onLeave = () => {
        const el = ref.current;
        if (!el) return;
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
    };
    return (
        <div ref={ref} className={`spot ${className}`} onMouseMove={onMove} onMouseLeave={onLeave} {...rest}>
            {children}
        </div>
    );
}

export function Magnetic({ children, strength = 0.3 }) {
    const ref = useRef(null);
    const onMove = (e) => {
        const el = ref.current;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * strength;
        const y = (e.clientY - r.top - r.height / 2) * strength;
        el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const onLeave = () => {
        ref.current.style.transform = "";
    };
    return (
        <span ref={ref} className="magnetic" onMouseMove={onMove} onMouseLeave={onLeave}>
            {children}
        </span>
    );
}
