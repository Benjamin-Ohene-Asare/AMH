
import Hero from "../../components/hero/Hero";
import HeroServices from "../../components/heroServices/HeroServices";

import AboutSection from "../../components/about/AboutSection";
import ServiceSections from "../../components/service/ServiceSection";
import  OurTeam  from "../../components/ourTeam/OurTeam";
import EventSection from "../../components/events/EventSection";
import AppointmentCTA from "../../components/cta/AppointmentCTA";
import Footer from "../../components/footer/Footer";
import HospitalStats from "../../components/HospitalStats/HospitalHighlights";
import MissionVision from "../../components/MissionVision/MissionVision";
import AppointmentSection from "../../components/Booking/AppointmentSection";
export default function Home() {
  return (
    <main>
      <Hero />
      <HeroServices />
      <AboutSection/>
      <HospitalStats/>
      <MissionVision/>
      <ServiceSections/>
      <AppointmentSection/>
       <OurTeam/>
      <EventSection/>
    
   
 {/* <AppointmentCTA/> */}
      {/* Future homepage sections */}
    </main>
  );
}
