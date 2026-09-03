export default function AboutMe() {
    return (
        <section id="AboutMe" className="about--section">
            <div className="about--section--img">
                <img src="./img/830.jpg" alt="About Me" />
            </div>
            <div className="hero--section--content--box about--section--box">
                <div className="hero--section--content">
                    <h1 className="skills-main-title">About Me</h1>
                    <p className="about-description">

                        I'm Naman — a CS grad from VIT Bhopal who genuinely enjoys figuring out how things work end to end. Not just writing the feature, but understanding what happens after you push to main. That's what pulled me toward both full-stack development and DevOps.

                    </p>

                    <p className="about-description">

                        I've built and shipped four real web apps — KundaliGyan, MentorOne, BloodBridge, and WealthIn — with actual users, real payment flows, and live deployments I manage myself on Ubuntu VPS and AWS. I set them up that way on purpose, because clicking "deploy" on a PaaS felt like skipping the interesting part.

                    </p>

                    <p className="about-description">

                        Lately I've been going deep on the infrastructure side — writing Terraform to provision multi-tier AWS environments instead of clicking through the console, configuring servers with Ansible, containerizing apps with Docker, running them on Kubernetes, and building GitHub Actions pipelines that build, scan for security issues, and deploy automatically. I use Prometheus and Grafana to keep an eye on things once they're running.

                    </p>

                    <p className="about-description">

                        Right now I work as an AI/ML Engineer Trainee at Coherent Market Insights, where I build LLM-powered research pipelines that turn raw data into client reports automatically. I'm also AWS certified — Solutions Architect Associate and Cloud Practitioner — which mostly just confirmed that I enjoy this stuff.

                    </p>

                </div>
            </div>
        </section>
    );
}