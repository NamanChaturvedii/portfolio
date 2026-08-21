import "./HeroSection.css";

export default function HeroSection() {

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

                        <br />

                        Developer

                    </h1>

                    <p className="hero--section-description">

                        I am a Full Stack Developer and AI/ML Engineer who enjoys building and shipping real-world products from idea to production. I work across modern web technologies, backend development, AI-powered applications, and cloud infrastructure, with hands-on experience building production web applications end-to-end and deploying the applications on Linux VPS and AWS. I care about clean architecture, reliable systems, and building things that actually reach real users.

                    </p>

                </div>


                {/* BUTTONS */}

                <div className="hero--buttons">

                    <button

                        className="btn hero-primary-btn"

                        onClick={() =>
                            window.open(
                                "https://drive.google.com/file/d/1ys4fJ83C3CC4ME8xQS7NWGuDaspoiJnn/view?usp=sharing"
                            )
                        }

                    >
                        Get Resume

                    </button>


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