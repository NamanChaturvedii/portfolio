import { Link } from "react-router-dom"
import ContactMe from "./ContactMe"

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
                    <p className="hero--section-description">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        <br /> Dolorum, quas. Amet soluta assumenda cum?
                    </p>
                </div>
                
                <button className="btn btn-primary"  onClick={()=>window.open("https://drive.google.com/file/d/1fF87mtrchpli7GMnHQ8qQr4HvvqZpjjW/view?usp=sharing")}>Get Resume</button>  
                {/* onClick={()=>{
                    document.getElementById("Contact").scrollIntoView({behavior: "smooth"}) // This is a function to scroll to the contact section always remember to use getemementbyid to get the id of the section and then use scrollIntoView function to scroll to the section
                }} */}
                
            </div>
            <div className="hero--section--img">
                <img src="./img/mainphoto.jpg" alt="Hero Section" />
            </div>
        </section>
    )
}
