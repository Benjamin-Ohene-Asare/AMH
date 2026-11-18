
import {
  Target,
  Eye,
  Award,
  ShieldCheck,
  Scale,
  Star,
  Users,
} from "lucide-react";

import ScrollReveal from "../../components/ScrollReveal";
import "./MissionVision.css";

const coreValues = [
  {
    icon: Award,
    number: "01",
    title: "Professionalism",
    description:
      "We uphold the highest standards while demonstrating competence, respect and ethical behaviour in the delivery of healthcare to ensure the best possible health outcomes.",
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "Integrity",
    description:
      "A commitment to honesty, transparency, and accountability in all our interactions, building trust with all who seek healthcare in our facility.",
  },
  {
    icon: Scale,
    number: "03",
    title: "Justice",
    description:
      "We believe in fairness and equality in the provision of quality healthcare where every patient is treated with dignity and respect, without any form of discrimination.",
  },
  {
    icon: Star,
    number: "04",
    title: "Excellence",
    description:
      "Services are not just rendered but we prioritize providing patients with top-notch quality healthcare to their satisfaction.",
  },
  {
    icon: Users,
    number: "05",
    title: "Teamwork",
    description:
      "By working as one team across all departments, we strengthen our service delivery while enhancing patient satisfaction and quality healthcare.",
  },
];

export default function MissionVision() {
  return (
    <section className="amh-purpose" id="mission-vision">
      <div className="amh-purpose-container">

        {/* Section heading */}
        <ScrollReveal direction="up">
          <div className="amh-purpose-heading">
            <span className="amh-purpose-label">
              WHAT GUIDES US
            </span>

            <h2>
              Our Purpose & <span>Principles</span>
            </h2>

            <p>
              Guided by our commitment to quality healthcare
              and service to humanity.
            </p>
          </div>
        </ScrollReveal>

        {/* Vision and Mission */}
        <div className="amh-purpose-top">

          <ScrollReveal direction="left">
            <article className="amh-vision-card">
              <div className="amh-purpose-icon">
                <Eye size={29} strokeWidth={1.7} />
              </div>

              <span className="amh-purpose-card-label">
                OUR VISION
              </span>

              <h3>A Centre of Excellence</h3>

              <p>
                A centre of excellence providing world-class
                health service preferred by most clients.
              </p>

              <div className="amh-purpose-card-decoration" />
            </article>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15}>
            <article className="amh-mission-card">
              <div className="amh-purpose-icon">
                <Target size={29} strokeWidth={1.7} />
              </div>

              <span className="amh-purpose-card-label">
                OUR MISSION
              </span>

              <h3>To Serve Humanity</h3>

              <p>
                To serve humanity through health service
                delivery relevant to the needs of the people,
                irrespective of creed, race, colour, cultural
                differences, as well as religious, social and
                economic status.
              </p>

              <div className="amh-purpose-card-decoration" />
            </article>
          </ScrollReveal>

        </div>

        {/* Core values heading */}
        <ScrollReveal direction="up">
          <div className="amh-values-heading">
            <div>
              <span className="amh-purpose-label">
                WHAT WE STAND FOR
              </span>

              <h2>Our Core Values</h2>
            </div>

            <p>
              Our values shape our commitment to quality,
              fairness, and compassionate healthcare.
            </p>
          </div>
        </ScrollReveal>

        {/* Core values cards */}
        <div className="amh-values-grid">
          {coreValues.map((value, index) => {
            const Icon = value.icon;

            return (
              <ScrollReveal
                key={value.number}
                direction="up"
                delay={index * 0.12}
              >
                <article className="amh-value-card">
                  <div className="amh-value-top">
                    <div className="amh-value-icon">
                      <Icon size={25} strokeWidth={1.7} />
                    </div>

                    <span>{value.number}</span>
                  </div>

                  <h3>{value.title}</h3>

                  <p>{value.description}</p>

                  <div className="amh-value-bottom-line" />
                </article>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
