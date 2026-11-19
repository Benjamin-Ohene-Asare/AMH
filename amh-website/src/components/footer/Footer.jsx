
import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  ArrowRight,
  HeartPulse,
  Building2,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

import "./Footer.css";

const quickLinks = [
  { name: "Home", link: "/" },
  { name: "About the Hospital", link: "/about" },
  { name: "Our Services", link: "/services" },
  { name: "News & Events", link: "/events" },
  { name: "Contact Us", link: "/contact" },
  { name: "Book an Appointment", link: "/appointment" },
];

const departmentLinks = [
  {
    name: "Clinical Departments",
    link: "/departments/clinical",
  },
  {
    name: "Non-Clinical Departments",
    link: "/departments/non-clinical",
  },
  {
    name: "All Departments",
    link: "/departments",
  },
];

const Footer = () => {
  return (
    <footer className="amh-footer">

      <div className="amh-footer-container">

        {/* HOSPITAL BRAND */}
        <div className="amh-footer-brand">

          <Link to="/" className="amh-footer-logo">
            <span className="amh-footer-logo-mark">AMH</span>

            <span className="amh-footer-logo-line"></span>

            <span className="amh-footer-logo-name">
              Ahmadiyya Muslim Hospital
            </span>
          </Link>

          <p className="amh-footer-location">
            <MapPin size={15} />
            Daboase, Western Region, Ghana
          </p>

          <p className="amh-footer-description">
            Serving humanity through health service delivery
            relevant to the needs of the people.
          </p>

          <Link to="/about" className="amh-footer-learn-more">
            Learn more about us
            <ArrowRight size={16} />
          </Link>

        </div>


        {/* QUICK LINKS */}
        <div className="amh-footer-column">

          <h3>Explore</h3>

          <ul>
            {quickLinks.map((item) => (
              <li key={item.name}>
                <Link to={item.link}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

        </div>


        {/* DEPARTMENTS */}
        <div className="amh-footer-column">

          <h3>Our Departments</h3>

          <ul>
            {departmentLinks.map((item) => (
              <li key={item.name}>
                <Link to={item.link}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="amh-footer-department-note">
            <Building2 size={17} />
            <span>
              Discover the different units supporting
              healthcare delivery at our hospital.
            </span>
          </div>

        </div>


        {/* CONTACT INFORMATION */}
        <div className="amh-footer-column amh-footer-contact">

          <h3>Get in Touch</h3>

          <div className="amh-footer-contact-item">
            <MapPin size={19} />

            <div>
              <span>Hospital Location</span>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Daboase+near+the+cemetery+Wassa+East+District+Ghana"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wassa East District, Daboase,
                near the cemetery
              </a>
            </div>
          </div>

          <div className="amh-footer-contact-item">
            <Phone size={19} />

            <div>
              <span>Telephone</span>
              <a href="tel:0206301219">
                0206-301-219
              </a>
            </div>
          </div>

          <div className="amh-footer-contact-item">
            <Mail size={19} />

            <div>
              <span>Email Address</span>
              <a href="mailto:ahmadiyyahospital.daboase@gmail.com">
                ahmadiyyahospital.daboase@gmail.com
              </a>
            </div>
          </div>

          {/* EMERGENCY CONTACT */}
          <a
            href="tel:0542663331"
            className="amh-footer-emergency"
          >
            <div className="amh-footer-emergency-icon">
              <HeartPulse size={19} />
            </div>

            <div>
              <span>Emergency Telephone</span>
              <strong>0542-663-331</strong>
              <small>Tap to call</small>
            </div>

            <ArrowUpRight size={17} />
          </a>

        </div>

      </div>


      {/* FOOTER BOTTOM */}
      <div className="amh-footer-bottom">

        <div className="amh-footer-bottom-container">

          <p>
            © {new Date().getFullYear()} Ahmadiyya Muslim Hospital.
            All rights reserved.
          </p>

          <div className="amh-footer-bottom-links">
            <span>
              <ShieldCheck size={15} />
              Healthcare with professionalism and integrity
            </span>

            <a href="#top" className="amh-footer-back-top">
              Back to Top
              <ArrowUpRight size={16} />
            </a>
          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;
