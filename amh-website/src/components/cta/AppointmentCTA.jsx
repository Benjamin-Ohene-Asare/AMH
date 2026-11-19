
import React from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

import "./AppointmentCTA.css";

const AppointmentCTA = () => {
  return (
    <section className="amh-appointment-cta">
      <div className="amh-cta-container">

        <div className="amh-cta-content">
          <span className="amh-cta-label">
            YOUR HEALTH MATTERS
          </span>

          <h2>
            Ready to See a Doctor?
          </h2>

          <p>
            Book an appointment online or visit us in person.
            Our team is ready to provide you with quality
            healthcare and compassionate support.
          </p>
        </div>

        <div className="amh-cta-actions">

          <Link
            to="/appointment"
            className="amh-cta-primary"
          >
            Book an Appointment
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/contact"
            className="amh-cta-secondary"
          >
            <MapPin size={18} />
            Find Us
          </Link>

        </div>

      </div>
    </section>
  );
};

export default AppointmentCTA;
