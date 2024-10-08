import HeroSection from "../HeroSection";
import MySkills from "../MySkills";
import AboutMe from "../AboutMe";
import MyPortfolio from "../MyPortfolio";
import Testimonial from "../Testimonials";
import ContactMe from "../ContactMe";
import Footer from "../Footer";

export default function Homescreen() {
    return (
        <>
            <HeroSection />
            <MySkills/>
            <MyPortfolio/>
            <AboutMe/>
            {/* <Testimonial/> */}
            <ContactMe/>
            <Footer/> 


            
        </>
    )
}