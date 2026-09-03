import "./HeroSection.css";
import { useState, useRef, useEffect } from "react";

export default function HeroSection() {
    const [resumeOpen, setResumeOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setResumeOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (

        <section id="heroSection" className="hero--section">

            <div className="hero--section--content--box">

                <div className="hero--section--content">

                    <p className="section--title">
                        Hello, I'm Naman Chaturvedi
                    </p>

                    <h1 className="hero--section--title">

                        <span className="hero--section-title--color">

                            Full Stack

                        </span>

                        {" & "}

                        <span className="hero--section-title--color">

                            DevOps

                        </span>

                        <br />

                        Engineer

                    </h1>

                    <p className="hero--section-description">

                        I'm a developer who likes owning the whole thing — writing the app, setting up the infrastructure, and making sure it actually stays up. I build full-stack web apps and I've been going deep on DevOps too, spinning up real AWS environments with Terraform, containerizing apps with Docker and Kubernetes, and building pipelines that deploy automatically without someone having to babysit them.

                    </p>

                </div>


                {/* BUTTONS */}

                <div className="hero--buttons">

                    <div className="resume--dropdown--wrapper" ref={dropdownRef}>
                        <button
                            className="btn hero-primary-btn resume--dropdown--btn"
                            onClick={() => setResumeOpen(!resumeOpen)}
                        >
                            Get Resume <span className={`resume--arrow ${resumeOpen ? "open" : ""}`}>▾</span>
                        </button>
                        {resumeOpen && (
                            <div className="resume--dropdown--menu">
                                <a
                                    href="https://drive.google.com/file/d/1ys4fJ83C3CC4ME8xQS7NWGuDaspoiJnn/view?usp=sharing"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="resume--dropdown--item"
                                    onClick={() => setResumeOpen(false)}
                                >
                                    <span className="resume--dropdown--icon">💻</span>
                                    <div>
                                        <div className="resume--dropdown--label">Full Stack Resume</div>
                                        <div className="resume--dropdown--sub">React · Node.js · AWS</div>
                                    </div>
                                </a>
                                <a
                                    href="https://drive.google.com/file/d/1mu3cRuDWKqmY6jSJZd_KlNsiEW_spnPa/view?usp=sharing"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="resume--dropdown--item"
                                    onClick={() => setResumeOpen(false)}
                                >
                                    <span className="resume--dropdown--icon">⚙️</span>
                                    <div>
                                        <div className="resume--dropdown--label">DevOps Resume</div>
                                        <div className="resume--dropdown--sub">Docker · CI/CD · Cloud</div>
                                    </div>
                                </a>
                            </div>
                        )}
                    </div>


                    <button

                        className="btn hero-secondary-btn"

                        onClick={() =>
                            window.open(
                                "https://drive.google.com/drive/folders/1kKFffp0NkT-I_vj_CcRonz1XpWDp6gLT?usp=sharing"
                            )
                        }

                    >

                        Get Certificates

                    </button>

                </div>

            </div>


            {/* IMAGE SAME */}

            <div className="hero--section--img">

                <img src="./img/orname1.JPG" alt="Hero" />

            </div>

        </section>

    );

}