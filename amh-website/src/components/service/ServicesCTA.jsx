
import React from "react";
import {
  ArrowUpRight,
  CalendarDays,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "../ScrollReveal";
import "./ServicesCTA.css";

const ServicesCTA = () => {
  return (
    <section className="amh-services-cta">
      <div className="amh-services-cta-container">

        <ScrollReveal direction="up">
          <div className="amh-services-cta-card">

            <div className="amh-services-cta-decoration amh-cta-circle-one" />
            <div className="amh-services-cta-decoration amh-cta-circle-two" />

            <div className="amh-services-cta-content">
              <div className="amh-services-cta-label">
                <span />
                HERE FOR YOUR HEALTH
              </div>

              <h2>
                Better Health Begins
                <br />
                With the <span>Right Care.</span>
              </h2>

              <p>
                Whether you need a consultation, a medical examination
                or professional healthcare support, we are here to
                help you take the next step.
              </p>

              <div className="amh-services-cta-actions">
                <Link
                  to="/appointment"
                  className="amh-services-cta-primary"
                >
                  <CalendarDays size={18} />
                  Book an Appointment
                  <ArrowUpRight size={18} />
                </Link>

                <Link
                  to="/contact"
                  className="amh-services-cta-secondary"
                >
                  Contact Our Hospital
                  <ArrowUpRight size={17} />
                </Link>
              </div>

              <div className="amh-services-cta-trust">
                <div>
                  <ShieldCheck size={17} />
                  <span>Professional Care</span>
                </div>

                <div>
                  <HeartPulse size={17} />
                  <span>Patient-Centred Service</span>
                </div>
              </div>
            </div>

            <div className="amh-services-cta-visual">
              <div className="amh-services-cta-image">
                <img
                  src="/images/hospital-building.jpg"
                  alt="Ahmadiyya Muslim Hospital"
                />
              </div>

              <div className="amh-services-cta-image-badge">
                <div className="amh-cta-badge-icon">
                  <HeartPulse size={23} />
                </div>
                <div>
                  <strong>Your Health Matters</strong>
                  <span>Care with compassion</span>
                </div>
              </div>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ServicesCTA;
