
import { ArrowRight, HeartPulse, PhoneCall } from "lucide-react";
import heroImage from "../../assets/hero1.avif";
import "./Hero.css";



export default function Hero() {
  return (
    <section className="amh-hero" id="home">

      {/* Background photograph */}
      <div
        className="amh-hero-background"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
        aria-hidden="true"
      />

      {/* Dark overlay for readable text */}
      <div
        className="amh-hero-overlay"
        aria-hidden="true"
      />

      {/* Main hero content */}
      <div className="amh-hero-container">

        <div className="amh-hero-content">

          {/* Welcome label */}
         

          {/* Main heading */}
          <h1>
            Your Health.
            <br />
            <span>Our Priority.</span>
          </h1>

          {/* Introduction */}
          <p className="amh-hero-description">
            Welcome to Ahmadiyya Muslim Hospital, Daboase.
            We are committed to compassionate care,
            professional service, and supporting the
            health and well-being of our community.
          </p>

          {/* Action buttons */}
          <div className="amh-hero-actions">

            <a
              href="#services"
              className="amh-hero-btn-primary"
            >
              Explore Our Services
              <ArrowRight size={18} />
            </a>

            <a
              href="#contact"
              className="amh-hero-btn-secondary"
            >
              <PhoneCall size={18} />
              Contact Us
            </a>

          </div>

        </div>
      </div>

      {/* Bottom brand accent */}
      <div
        className="amh-hero-bottom-line"
        aria-hidden="true"
      />

    </section>
  );
}
