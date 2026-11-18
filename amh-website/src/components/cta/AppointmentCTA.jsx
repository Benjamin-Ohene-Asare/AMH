
import React from "react";
import { ArrowRight, MapPin } from "lucide-react";

import "./AppointmentCTA.css";

const AppointmentCTA = () => {
  return (
    <section className="amh-appointment-cta">

      <div className="amh-cta-container">

        {/* CTA text */}
        <div className="amh-cta-content">

          <span className="amh-cta-label">
            YOUR HEALTH MATTERS
          </span>

          <h2>
            Ready to See a Doctor?
          </h2>

          <p>
            Book an appointment online or visit us in person.
            Our team is ready to provide you with the best
            care possible.
          </p>

        </div>

        {/* CTA buttons */}
        <div className="amh-cta-actions">

          <a
            href="https://amhd.onhercules.app/appointments"
            target="_blank"
            rel="noopener noreferrer"
            className="amh-cta-primary"
          >
            Book an Appointment
            <ArrowRight size={18} />
          </a>

          <a
            href="https://amhd.onhercules.app/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="amh-cta-secondary"
          >
            <MapPin size={18} />
            Find Us
          </a>

        </div>

      </div>

    </section>
  );
};

export default AppointmentCTA;
