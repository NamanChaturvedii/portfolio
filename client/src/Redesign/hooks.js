import { useEffect, useRef, useState } from "react";

export function useReveal() {
    useEffect(() => {
        const els = document.querySelectorAll("[data-reveal]:not(.is-visible)");
        if (!("IntersectionObserver" in window)) {
            els.forEach((el) => el.classList.add("is-visible"));
            return;
        }
        const io = new IntersectionObserver(
            (entries) =>
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        io.unobserve(entry.target);
                    }
                }),
            { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);
}

export function useInView(threshold = 0.3) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    io.disconnect();
                }
            },
            { threshold }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [threshold]);
    return [ref, inView];
}

export function useCountUp(target, start, duration = 1800, decimals = 0) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        if (!start) return;
        let raf;
        const t0 = performance.now();
        const tick = (t) => {
            const p = Math.min(1, (t - t0) / duration);
            setVal(target * (1 - Math.pow(1 - p, 4)));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [start, target, duration]);
    return val.toFixed(decimals);
}

export function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 20, behavior: "smooth" });
}
