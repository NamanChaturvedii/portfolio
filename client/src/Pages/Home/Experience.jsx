const techStack = [
    "Python", "Claude API", "AI Pipelines", "Prompt Engineering",
    "LLM Orchestration", "Automation", "Data Validation", "Research Analytics"
];

export default function Experience() {
    return (
        <section className="experience--section" id="Experience">
            <div className="portfolio--container experience-header">
                <p className="skills-subtitle">Work Experience</p>
                <h2 className="skills-main-title">Where I've Worked</h2>
            </div>

            <div className="experience--timeline">
                <div className="experience--card">
                    <div className="experience--card--left">
                        <span className="experience--date">June 2026 — Present</span>
                        <span className="experience--location">Pune, India</span>
                    </div>

                    <div className="experience--card--divider">
                        <div className="experience--dot"></div>
                        <div className="experience--line"></div>
                    </div>

                    <div className="experience--card--right">
                        <div className="experience--card--header">
                            <h3 className="experience--company">Coherent Market Insights</h3>
                            <span className="experience--role">AI/ML Engineer Trainee</span>
                        </div>

                        <ul className="experience--bullets">
                            <li>Built and ran AI-powered research pipelines that automate market and vendor discovery, classification, and validation, turning live research into structured, client-ready reports.</li>
                            <li>Developed a multi-stage AI pipeline that researches markets, identifies consumer and buyer segments, and generates validated survey reports with simulated response data and automated quality checks.</li>
                            <li>Automated update and distribution workflows, allowing non-technical teams to use the latest pipeline improvements without manual redeployment and keeping the tools reliable for daily use.</li>
                            <li>Engineered prompt templates and LLM orchestration logic to ensure consistent, high-quality AI outputs across varied market research domains and verticals.</li>
                        </ul>

                        <div className="experience--tech--stack">
                            {techStack.map((tech, i) => (
                                <span key={i} className="experience--tech--tag">{tech}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
