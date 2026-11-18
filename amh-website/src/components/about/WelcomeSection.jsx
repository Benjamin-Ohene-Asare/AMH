
import React from "react";
import { ArrowUpRight, BedDouble, ShieldCheck, HeartPulse } from "lucide-react";
import ScrollReveal from "../../components/ScrollReveal";
import "./WelcomeSection.css";

const highlights = [
  {
    icon: <BedDouble size={23} />,
    value: "76",
    label: "Hospital Bed Capacity",
  },
  {
    icon: <ShieldCheck size={23} />,
    value: "HeFRA + NHIA",
    label: "Registered & Accredited",
  },
  {
    icon: <HeartPulse size={23} />,
    value: "Patient First",
    label: "Compassionate Healthcare",
  },
];

const WelcomeSection = () => {
  return (
    <section className="amh-welcome-section">
      <div className="amh-welcome-container">

        {/* IMAGE SIDE */}
        <ScrollReveal direction="left" duration={0.9}>
          <div className="amh-welcome-visual">
            <div className="amh-welcome-image">
              <img
                src="/images/hospital-building.jpg"
                alt="Ahmadiyya Muslim Hospital, Daboase"
                loading="lazy"
              />
            </div>

            <div className="amh-welcome-image-overlay">
              <span>AHMADIYYA MUSLIM HOSPITAL</span>
              <h3>Care with compassion. Service with purpose.</h3>
            </div>

            <div className="amh-welcome-image-accent" />
          </div>
        </ScrollReveal>

        {/* CONTENT SIDE */}
        <ScrollReveal direction="right" delay={0.15} duration={0.9}>
          <div className="amh-welcome-content">

            <span className="amh-welcome-label">
              WELCOME TO AHMADIYYA MUSLIM HOSPITAL
            </span>

            <h2>
              Your health.
              <br />
              Your comfort.
              <br />
              <span>Our priority.</span>
            </h2>

            <p>
              Welcome to the official website of Ahmadiyya Muslim Hospital,
              Daboase, the District Hospital for Wassa East District. Your
              health, comfort, and well-being are our top priorities.
            </p>

            <p>
              As a HeFRA-registered and NHIA-accredited primary hospital,
              we are committed to providing quality, affordable, and
              compassionate healthcare to all, regardless of creed, race
              or background.
            </p>

            <p>
              With a bed capacity of seventy-six (76), our dedicated team
              delivers a wide range of medical and diagnostic services
              designed to meet the needs of our community and beyond.
            </p>

            <div className="amh-welcome-quote">
              <span className="amh-welcome-quote-mark">“</span>
              <div>
                <p>
                  To serve humanity through health service delivery relevant
                  to the needs of the people.
                </p>
                <span>Our Mission</span>
              </div>
            </div>

            <p className="amh-welcome-closing">
              We welcome you to experience healthcare delivered with
              professionalism, empathy, and excellence.
            </p>

            <a href="/services" className="amh-welcome-link">
              Discover Our Services
              <ArrowUpRight size={18} />
            </a>

          </div>
        </ScrollReveal>

      </div>

      {/* HOSPITAL HIGHLIGHTS */}
      <div className="amh-welcome-highlights">
        {highlights.map((item, index) => (
          <ScrollReveal
            key={item.label}
            direction="up"
            delay={index * 0.12}
          >
            <div className="amh-welcome-highlight">
              <div className="amh-welcome-highlight-icon">
                {item.icon}
              </div>

              <div>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

    </section>
  );
};

export default WelcomeSection;
