
import {
  HeartHandshake,
  UserRoundCheck,
  Stethoscope,
  HandHeart,
} from "lucide-react";

import ScrollReveal from "../../components/ScrollReveal";
import "./HospitalHighlights.css";

const highlights = [
  {
    icon: HeartHandshake,
    number: "01",
    title: "Patient-Centred Care",
    description:
      "We put the health, comfort and well-being of every patient at the heart of our care.",
  },
  {
    icon: UserRoundCheck,
    number: "02",
    title: "Dedicated Professionals",
    description:
      "Our dedicated team is committed to delivering healthcare with professionalism and compassion.",
  },
  {
    icon: Stethoscope,
    number: "03",
    title: "Comprehensive Healthcare",
    description:
      "We provide medical and diagnostic services designed to support the healthcare needs of our community.",
  },
  {
    icon: HandHeart,
    number: "04",
    title: "Service to Humanity",
    description:
      "We believe everyone deserves quality healthcare, regardless of creed, race or background.",
  },
];

export default function HospitalHighlights() {
  return (
    <section className="amh-highlights">
      <div className="amh-highlights-container">

        {/* Section heading */}
        <ScrollReveal direction="up">
          <div className="amh-highlights-heading">
            <span className="amh-highlights-label">
              THE AHMADIYYA DIFFERENCE
            </span>

            <h2>
              Healthcare Built <span>Around You</span>
            </h2>

            <p>
              Our commitment goes beyond treatment. We believe
              in delivering healthcare through compassion,
              professionalism and service to humanity.
            </p>
          </div>
        </ScrollReveal>

        {/* Highlight cards */}
        <div className="amh-highlights-grid">
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <ScrollReveal
                key={item.number}
                direction="up"
                delay={index * 0.15}
              >
                <article className="amh-highlight-card">
                  <div className="amh-highlight-top">
                    <div className="amh-highlight-icon">
                      <Icon size={27} strokeWidth={1.7} />
                    </div>

                    <span className="amh-highlight-number">
                      {item.number}
                    </span>
                  </div>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>

                  <div className="amh-highlight-line" />
                </article>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
