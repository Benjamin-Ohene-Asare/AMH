
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import aboutImage from "../../assets/about.avif";
import ScrollReveal from "../../components/ScrollReveal";
import "./AboutSection.css";

export default function AboutSection() {
  return (
    <section className="amh-about" id="about">
      <div className="amh-about-container">

        {/* Hospital image and statistics */}
        <ScrollReveal direction="left">
          <div className="amh-about-visual">
            <div className="amh-about-image-frame">
              <img
                src={aboutImage}
                alt="Ahmadiyya Muslim Hospital Daboase logo"
                className="amh-about-image"
                loading="lazy"
              />
            </div>

            <ul className="amh-about-stats">
              <li>
                <strong>76</strong>
                <span>Beds</span>
              </li>
              <li>
                <strong>1979</strong>
                <span>Established</span>
              </li>
            </ul>
          </div>
        </ScrollReveal>

        {/* Hospital introduction and information */}
        <ScrollReveal direction="right" delay={0.15}>
          <div className="amh-about-content">
            <h2>
              Welcome to{" "}
              <span>Ahmadiyya Muslim Hospital</span>
            </h2>

            <div
              className="amh-about-title-line"
              aria-hidden="true"
            />

            <p className="amh-about-lead">
              Welcome to the official website of Ahmadiyya Muslim
              Hospital, Daboase, the District Hospital for Wassa
              East District. Your health, comfort, and well-being
              are our top priorities.
            </p>

            <p>
              As a HeFRA-registered and NHIA-accredited primary
              hospital, we are committed to providing quality,
              affordable, and compassionate healthcare to all,
              regardless of creed, race, or background. With a bed
              capacity of seventy-six (76), our dedicated team
              delivers a wide range of medical and diagnostic
              services designed to meet the needs of our community
              and beyond.
            </p>

            <div className="amh-about-mission">
              <CheckCircle2 size={26} aria-hidden="true" />

              <p>
                Guided by our mission{" "}
                <strong>
                  “to serve humanity through health service
                  delivery relevant to the needs of the people”,
                </strong>{" "}
                we continue to uphold the values of excellence,
                compassion, and faith — where Allah is the
                only Healer.
              </p>
            </div>

            <p className="amh-about-closing">
              We welcome you to experience healthcare delivered
              with professionalism, empathy, and excellence.
            </p>

            <a href="/about" className="amh-about-button">
              Learn more about us
              <ArrowUpRight size={19} aria-hidden="true" />
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
