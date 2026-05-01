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

                        I am a Full Stack Developer specializing in the MERN stack, Next.js, and modern React ecosystems, with additional experience in Java and Spring Boot backend development. AWS Certified Solutions Architect — Associate with hands-on experience shipping production web applications end-to-end and self-managing their deployment on Linux VPS infrastructure. I care about clean architecture, reliable systems, and building things that actually reach real users.

                    </p>

                </div>


                {/* BUTTONS */}

                <div className="hero--buttons">

                    <button

                        className="btn hero-primary-btn"

                        onClick={() =>
                            window.open(
                                "https://drive.google.com/file/d/1C3HtJm1ADGM6NQnsv61kkzj2RHga_oCh/view?usp=sharing"
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