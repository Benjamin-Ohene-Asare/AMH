
import React from "react";
import AboutUsHero from "../../components/AboutUsHero/AboutUsHero";
import "./About.css";
import WelcomeSection from "../../components/about/WelcomeSection";
import JourneySection from "../../components/about/JourneySection";
import OurTeam from "../../components/ourTeam/OurTeam";
import MissionVisionSection from "../../components/about/MissionVisionSection";
import CliniciansSection from "../../components/about/CliniciansSection";

const About = () => {
  return (
    <main className="about-page">
      <AboutUsHero />
      <WelcomeSection/>
      <JourneySection/>
      <OurTeam/>
      <MissionVisionSection/>
      <CliniciansSection/>
    </main>
  );
};

export default About;
