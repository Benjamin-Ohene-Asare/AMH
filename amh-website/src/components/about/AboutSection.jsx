
import {
  ArrowUpRight,
  CheckCircle2,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import aboutImage from "../../assets/about.avif";
import ScrollReveal from "../../components/ScrollReveal";
import "./AboutSection.css";

export default function AboutSection() {
  return (
    <section className="amh-about" id="about">
      <div className="amh-about-container">

        {/* Image presentation */}
        <ScrollReveal direction="left">
          <div className="amh-about-visual">
            <div className="amh-about-image-frame">
              <img
                src={aboutImage}
                alt="Ahmadiyya Muslim Hospital, Daboase"
                className="amh-about-image"
                loading="lazy"
              />
            </div>

            <div className="amh-about-image-accent" />
          </div>
        </ScrollReveal>

        {/* Hospital introduction */}
        <ScrollReveal direction="right" delay={0.15}>
          <div className="amh-about-content">

            <h2>
              Dedicated to your health.
              <span>Committed to humanity.</span>
            </h2>

            <div className="amh-about-title-line" />

            <p className="amh-about-lead">
              Welcome to Ahmadiyya Muslim Hospital, Daboase,
              the District Hospital for Wassa East District.
              We are here to make quality healthcare accessible,
              affordable, and compassionate for everyone.
            </p>

            <p className="amh-about-description">
              As a HeFRA-registered and NHIA-accredited primary
              hospital, we provide a wide range of medical and
              diagnostic services through a dedicated team of
              healthcare professionals. We serve every individual
              with dignity and respect, regardless of creed,
              race, or background.
            </p>

            {/* Hospital values */}
            <div className="amh-about-values">

              <div className="amh-about-value">
                <div className="amh-about-value-icon">
                  <HeartPulse size={23} />
                </div>

                <div>
                  <h3>Compassionate Care</h3>
                  <p>
                    Putting patients' comfort, dignity, and
                    well-being first.
                  </p>
                </div>
              </div>

              <div className="amh-about-value">
                <div className="amh-about-value-icon">
                  <ShieldCheck size={23} />
                </div>

                <div>
                  <h3>Quality Healthcare</h3>
                  <p>
                    Committed to professional standards and
                    responsible healthcare delivery.
                  </p>
                </div>
              </div>

              <div className="amh-about-value">
                <div className="amh-about-value-icon">
                  <Stethoscope size={23} />
                </div>

                <div>
                  <h3>Service to All</h3>
                  <p>
                    Providing respectful healthcare without
                    discrimination.
                  </p>
                </div>
              </div>

            </div>

            {/* Mission statement */}
            <div className="amh-about-mission">
              <CheckCircle2 size={23} />

              <p>
                Guided by our mission,{" "}
                <strong>
                  “to serve humanity through health service
                  delivery relevant to the needs of the people,”
                </strong>{" "}
                we uphold excellence, compassion, and faith —
                where Allah is the only Healer.
              </p>
            </div>

            <a href="/about" className="amh-about-button">
              Discover more about us
              <ArrowUpRight size={19} />
            </a>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
