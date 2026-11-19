
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import Events from "./pages/Events/Events";
import Contact from "./pages/Contact/Contact";
import Departments from "./pages/Department/Departments";
import Clinical from "./pages/Department/Clinical/Clinical";
import NonClinical from "./pages/Department/NonClinical/NonClinical";
import Appointment from "./pages/Appointment/Appointment";
import FloatingContact from "./components/FloatingContact/FloatingContact";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/departments/clinical" element={<Clinical />} />
        <Route path="/departments/non-clinical" element={<NonClinical />} />
        <Route path="/appointment" element={<Appointment />} />
      </Routes>

      <Footer />
      <FloatingContact />
    </BrowserRouter>
  );
}
