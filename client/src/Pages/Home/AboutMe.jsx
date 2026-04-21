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

                        I am a Computer Science and Engineering student at VIT Bhopal University and a Full Stack Web Developer who enjoys building things that actually reach real users. My core stack is the MERN stack and Next.js, and I also work comfortably with Java and Spring Boot on the backend when the project calls for it. I care most about clean architecture, reliable systems, and writing code that is production-ready rather than just demo-ready.

                    </p>

                    <p className="about-description">

                        I have shipped four production web applications end-to-end — KundaliGyan, MentorOne, BloodBridge, and WealthIn — each with live domains, real payment integrations, real-time Socket.io features, and authentication flows. Beyond writing the code, I self-host most of these projects on my own Ubuntu VPS using Nginx as a reverse proxy, PM2 for process management, and Let's Encrypt SSL — so I own the entire pipeline from first commit to live HTTPS URL. I am also an AWS Certified Solutions Architect — Associate and an AWS Certified Cloud Practitioner.

                    </p>

                    <p className="about-description">

                        I am always learning, comfortable picking up new tools quickly, and looking for engineering teams where I can contribute meaningfully and grow as a developer. Feel free to connect with me through the contact section below.

                    </p>

                </div>
            </div>
        </section>
    );
}