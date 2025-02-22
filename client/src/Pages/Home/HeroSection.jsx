import { Link } from "react-router-dom";
import ContactMe from "./ContactMe";

export default function HeroSection() {
    return (
        <section id="heroSection" className="hero--section">
            <div className="hero--section--content--box">
                <div className="hero--section--content">
                    <p className="section--title">Hello, I'm Naman Chaturvedi</p>
                    <h1 className="hero--section--title">
                        <span className="hero--section-title--color">Full Stack</span>{" "}
                        <br />
                        Developer
                    </h1>
                    <p className="hero--section-description" style={{fontStyle:"oblique"}}>
                        I have been working on projects as a full stack developer for past time. Now I am learning about Data Engineering for the last few months and have knowledge of it.
                        <br /> I am looking for a job as a full stack developer or Data Engineer.
                    </p>
                </div>

                {/* Buttons Container with Inline Style */}
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <button 
                        className="btn btn-primary" 
                        onClick={() => window.open("https://drive.google.com/file/d/1yy2DFpGd11N_uqdF8_haicB9AnSsWJND/view?usp=sharing")}
                    >
                        Get Resume
                    </button>  
                    <button 
                        className="btn btn-primary" 
                        onClick={() => window.open("https://drive.google.com/drive/u/0/folders/1kKFffp0NkT-I_vj_CcRonz1XpWDp6gLT")}
                    >
                        Get Certificates
                    </button>  
                </div>
            </div>
            <div className="hero--section--img ">
                <img src="./img/main.jpg" alt="Hero Section" />
            </div>
        </section>
    );
}
