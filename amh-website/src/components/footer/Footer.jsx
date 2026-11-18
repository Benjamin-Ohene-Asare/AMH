
import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
} from "lucide-react";

import "./Footer.css";

// Footer navigation links
const quickLinks = [
  { name: "Home", link: "/" },
  { name: "About Us", link: "/about" },
  { name: "News & Updates", link: "/news" },
  { name: "All Departments", link: "/departments" },
  { name: "Services", link: "/services" },
  { name: "Book Appointment", link: "/appointments" },
  { name: "Contact Us", link: "/contact" },
];

// Hospital departments
const departments = [
  { name: "Emergency & Casualty", link: "/departments/emergency" },
  { name: "Maternity & Obstetrics", link: "/departments/maternity" },
  { name: "Paediatrics", link: "/departments/paediatrics" },
  { name: "Surgery", link: "/departments/surgery" },
  { name: "Laboratory", link: "/departments/laboratory" },
  { name: "Pharmacy", link: "/departments/pharmacy" },
];

const Footer = () => {
  return (
    <footer className="amh-footer">

      <div className="amh-footer-container">

        {/* =====================================
            HOSPITAL INFORMATION
        ====================================== */}

        <div className="amh-footer-brand">

          <a href="/" className="amh-footer-logo">
            <span className="amh-footer-logo-mark">AMH</span>
            <span className="amh-footer-logo-line"></span>
            <span className="amh-footer-logo-name">
              Ahmadiyya Muslim Hospital
            </span>
          </a>

          <p className="amh-footer-location">
            Daboase, Ghana
          </p>

          <p className="amh-footer-description">
            Providing quality, compassionate healthcare to
            the people of Daboase and surrounding communities
            since 1979.
          </p>

        </div>


        {/* =====================================
            QUICK LINKS
        ====================================== */}

        <div className="amh-footer-column">

          <h3>Quick Links</h3>

          <ul>
            {quickLinks.map((item) => (
              <li key={item.name}>
                <a href={item.link}>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

        </div>


        {/* =====================================
            KEY DEPARTMENTS
        ====================================== */}

        <div className="amh-footer-column">

          <h3>Key Departments</h3>

          <ul>
            {departments.map((item) => (
              <li key={item.name}>
                <a href={item.link}>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

        </div>


        {/* =====================================
            CONTACT INFORMATION
        ====================================== */}

        <div className="amh-footer-column amh-footer-contact">

          <h3>Contact Us</h3>

          <div className="amh-footer-contact-item">
            <MapPin size={18} />
            <p>
              Ahmadiyya Muslim Hospital,
              Daboase, Western Region, Ghana
            </p>
          </div>

          <div className="amh-footer-contact-item">
            <Phone size={18} />
            <a href="tel:+233000000000">
              +233 (0) 000-000-000
            </a>
          </div>

          <div className="amh-footer-contact-item">
            <Mail size={18} />
            <a href="mailto:info@amhdaboase.org">
              info@amhdaboase.org
            </a>
          </div>

          <div className="amh-footer-contact-item">
            <Clock size={18} />
            <p>
              <strong>OPD:</strong> Mon–Fri, 8am–5pm
            </p>
          </div>

          <div className="amh-footer-emergency">
            <span className="amh-footer-emergency-dot"></span>
            <p>
              <strong>Emergency:</strong> Available 24/7
            </p>
          </div>

        </div>

      </div>


      {/* =====================================
          FOOTER BOTTOM / COPYRIGHT
      ====================================== */}

      <div className="amh-footer-bottom">

        <div className="amh-footer-bottom-container">

          <p>
            © {new Date().getFullYear()} Ahmadiyya Muslim Hospital.
            All rights reserved.
          </p>

          <a href="/" className="amh-footer-back-top">
            Back to Top
            <ArrowUpRight size={16} />
          </a>

        </div>

      </div>

    </footer>
  );
};

export default Footer;
