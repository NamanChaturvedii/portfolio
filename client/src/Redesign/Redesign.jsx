import { useCallback, useEffect, useState } from "react";
import "./redesign.css";
import { Preloader, Cursor, Background, ScrollProgress } from "./Effects";
import Nav from "./Nav";
import { Hero, Marquee, Expertise, Work, Experience, About, Contact, Footer } from "./Sections";
import { useReveal } from "./hooks";

export default function Redesign() {
    const [phase, setPhase] = useState("loading");
    const onLeave = useCallback(() => setPhase("revealing"), []);
    const onGone = useCallback(() => setPhase("done"), []);

    useReveal();

    useEffect(() => {
        if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("is-loading", phase === "loading");
    }, [phase]);

    return (
        <div className={`site ${phase !== "loading" ? "is-loaded" : ""}`}>
            {phase !== "done" && <Preloader onLeave={onLeave} onGone={onGone} />}
            <Background />
            <Cursor />
            <ScrollProgress />
            <Nav />
            <main>
                <Hero />
                <Marquee />
                <Expertise />
                <Work />
                <Experience />
                <About />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
