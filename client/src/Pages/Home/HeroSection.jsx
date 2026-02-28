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

                        I am a Full Stack Developer and AWS Certified Solutions Architect focused on building scalable, high-performance systems. I thrive in problem-solving environments where strong engineering and architectural thinking matter. I am committed to delivering dependable applications while continuously advancing my cloud expertise.

                    </p>

                </div>


                {/* BUTTONS */}

                <div className="hero--buttons">

                    <button

                        className="btn hero-primary-btn"

                        onClick={() =>
                            window.open(
                                "https://drive.google.com/file/d/1jBxjs8mIBx58V7E8sbHC5RGOZMLuUNI3/view?usp=sharing"
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