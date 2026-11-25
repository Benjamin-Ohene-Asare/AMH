
import {
  ArrowUpRight,
  CalendarDays,
  HeartPulse,
  ShieldCheck,
  Building2,
  Stethoscope,
  Activity,
} from "lucide-react";

import { Link } from "react-router-dom";

import appointmentImage from "../../assets/cbook.png";
import ScrollReveal from "../../components/ScrollReveal";

import "./AppointmentSection.css";

export default function AppointmentSection() {
  return (
    <section
      className="amh-appointment-section"
      id="appointment"
      style={{
        backgroundImage: `url(${appointmentImage})`,
      }}
    >
      {/* Background overlay */}
      <div className="amh-appointment-overlay" />

      <div className="amh-appointment-container">

        {/* LEFT: APPOINTMENT CONTENT */}
        <ScrollReveal
          direction="left"
          delay={0.1}
          duration={0.9}
        >
          <div className="amh-appointment-content">

            <span className="amh-appointment-label">
              YOUR HEALTH, OUR PRIORITY
            </span>

            <h2>
              Quality Healthcare
              <span> Starts With You.</span>
            </h2>

            <p className="amh-appointment-intro">
              Your health deserves attention and care. Take the
              next step towards better health by connecting with
              Ahmadiyya Muslim Hospital, Daboase. Our team is
              ready to assist you.
            </p>

            {/* Appointment benefits */}
            <div className="amh-appointment-points">

              <div className="amh-appointment-point">
                <span className="amh-appointment-point-icon">
                  <CalendarDays size={21} />
                </span>

                <div>
                  <strong>Plan Your Visit</strong>
                  <p>
                    Make arrangements for your hospital visit.
                  </p>
                </div>
              </div>

              <div className="amh-appointment-point">
                <span className="amh-appointment-point-icon">
                  <ShieldCheck size={21} />
                </span>

                <div>
                  <strong>Compassionate Care</strong>
                  <p>
                    Professional care with your wellbeing in mind.
                  </p>
                </div>
              </div>

            </div>

            {/* Appointment button */}
            <div className="amh-appointment-actions">

              <Link
                to="/appointment"
                className="amh-appointment-button"
              >
                Request an Appointment
                <ArrowUpRight size={19} />
              </Link>

              <span className="amh-appointment-note">
                <HeartPulse size={16} />
                We're ready to assist you.
              </span>

            </div>

          </div>
        </ScrollReveal>

        {/* RIGHT: HOSPITAL VISUAL */}
        <ScrollReveal
          direction="right"
          delay={0.3}
          duration={1}
        >
          <div className="amh-appointment-art">

            {/* Main circular illustration */}
            <div className="amh-appointment-art-circle">

              <div className="amh-appointment-art-inner">

                <Building2
                  className="amh-appointment-building-icon"
                  strokeWidth={1.1}
                />

                <div className="amh-appointment-cross">
                  +
                </div>

              </div>

            </div>

            {/* Floating healthcare icons */}
            <div className="amh-appointment-floating amh-floating-one">
              <Stethoscope size={25} />
            </div>

            <div className="amh-appointment-floating amh-floating-two">
              <HeartPulse size={27} />
            </div>

            <div className="amh-appointment-floating amh-floating-three">
              <Activity size={25} />
            </div>

            {/* Visual caption */}
            <div className="amh-appointment-art-caption">
              <span className="amh-appointment-caption-line" />
              <span>Committed to your wellbeing</span>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
