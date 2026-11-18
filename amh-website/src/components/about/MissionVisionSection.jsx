
import React from "react";
import {
  Target,
  Eye,
  ShieldCheck,
  Scale,
  Award,
  Users,
  HeartHandshake,
} from "lucide-react";
import ScrollReveal from "../../components/ScrollReveal";
import "./MissionVisionSection.css";

const values = [
  {
    icon: <ShieldCheck size={24} />,
    title: "Professionalism",
    description: "Upholding professional standards in healthcare delivery.",
  },
  {
    icon: <HeartHandshake size={24} />,
    title: "Integrity",
    description: "Acting with honesty, responsibility and transparency.",
  },
  {
    icon: <Scale size={24} />,
    title: "Justice",
    description: "Promoting fairness and equal treatment for all.",
  },
  {
    icon: <Award size={24} />,
    title: "Excellence",
    description: "Striving for quality in every aspect of our work.",
  },
  {
    icon: <Users size={24} />,
    title: "Teamwork",
    description: "Working together to achieve better patient care.",
  },
];

const MissionVisionSection = () => {
  return (
    <section className="amh-mission-vision">
      <div className="amh-mv-container">

        <ScrollReveal direction="up">
          <div className="amh-mv-heading">
            <span>OUR PURPOSE AND DIRECTION</span>
            <h2>
              Guided by purpose.
              <br />
              <span>Driven by compassion.</span>
            </h2>
            <p>
              Our mission and vision guide our commitment to delivering
              quality healthcare and serving humanity.
            </p>
          </div>
        </ScrollReveal>

        {/* MISSION AND VISION */}
        <div className="amh-mv-panels">

          <ScrollReveal direction="left">
            <article className="amh-mv-panel amh-mv-mission">
              <div className="amh-mv-icon">
                <Target size={29} />
              </div>

              <span className="amh-mv-panel-label">01 / OUR MISSION</span>

              <h3>Why we exist</h3>

              <p>
                To serve humanity through health service delivery relevant
                to the needs of the people.
              </p>

              <div className="amh-mv-panel-line" />
            </article>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15}>
            <article className="amh-mv-panel amh-mv-vision">
              <div className="amh-mv-icon">
                <Eye size={29} />
              </div>

              <span className="amh-mv-panel-label">02 / OUR VISION</span>

              <h3>What we aspire to</h3>

              <p>
                To be a leading healthcare institution providing quality
                and accessible healthcare services to all.
              </p>

              <div className="amh-mv-panel-line" />
            </article>
          </ScrollReveal>

        </div>

        {/* CORE VALUES */}
        <div className="amh-mv-values-section">
          <ScrollReveal direction="up">
            <div className="amh-mv-values-heading">
              <span>WHAT DEFINES US</span>
              <h3>Our Core Values</h3>
              <p>
                The principles that shape our conduct and guide our service.
              </p>
            </div>
          </ScrollReveal>

          <div className="amh-mv-values-grid">
            {values.map((value, index) => (
              <ScrollReveal
                key={value.title}
                direction="up"
                delay={index * 0.1}
              >
                <div className="amh-mv-value-card">
                  <div className="amh-mv-value-icon">
                    {value.icon}
                  </div>

                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default MissionVisionSection;
