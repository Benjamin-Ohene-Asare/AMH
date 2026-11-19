
import React from "react";
import {
  Activity,
  HeartPulse,
  Apple,
  ArrowUpRight,
} from "lucide-react";

import ScrollReveal from "../ScrollReveal";
import publicHealthImage from "../../assets/s6.avif";
import "./PublicHealthServices.css";

const publicHealthAreas = [
  {
    number: "01",
    icon: Activity,
    title: "Disease Surveillance",
    description:
      "Routine monitoring of disease trends to identify, track and respond to potential outbreaks through timely interventions.",
  },
  {
    number: "02",
    icon: HeartPulse,
    title: "Wellness Clinic",
    description:
      "Health promotion, lifestyle modification and preventive screenings to help clients maintain their physical and mental wellbeing.",
  },
  {
    number: "03",
    icon: Apple,
    title: "Nutrition Services",
    description:
      "Growth monitoring, dietary counselling and management of nutrition-related conditions for healthy living across all age groups.",
  },
];

const PublicHealthServices = () => {
  return (
    <section className="amh-public-health-section">
      <div className="amh-public-health-container">

        <ScrollReveal direction="up">
          <div className="amh-public-health-heading">
            <div className="amh-public-health-heading-main">
              <span className="amh-public-health-label">
                PREVENTION · WELLNESS · COMMUNITY
              </span>

              <h2>
                Promoting Health <br />
                <span>Beyond the Hospital</span>
              </h2>
            </div>

            <p>
              Our Public Health and Support Services unit plays a vital
              role in promoting community wellbeing through preventive
              care, early detection and continuous monitoring of health
              trends.
            </p>
          </div>
        </ScrollReveal>

        <div className="amh-public-health-layout">

          <ScrollReveal
            direction="left"
            className="amh-public-health-visual"
          >
            <div className="amh-public-health-image">
              <img
                src={publicHealthImage}
                alt="Public health services at Ahmadiyya Muslim Hospital"
              />

              <div className="amh-public-health-image-overlay" />

              <div className="amh-public-health-image-caption">
                <span>HEALTHIER COMMUNITIES</span>
                <h3>Prevention Today. Better Health Tomorrow.</h3>
              </div>
            </div>

            <div className="amh-public-health-image-decoration" />
          </ScrollReveal>

          <div className="amh-public-health-list">
            {publicHealthAreas.map((item, index) => {
              const Icon = item.icon;

              return (
                <ScrollReveal
                  key={item.number}
                  direction="right"
                  delay={index * 0.12}
                >
                  <article className="amh-public-health-item">
                    <div className="amh-public-health-item-number">
                      {item.number}
                    </div>

                    <div className="amh-public-health-item-icon">
                      <Icon size={23} strokeWidth={1.7} />
                    </div>

                    <div className="amh-public-health-item-content">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>

                    <ArrowUpRight
                      className="amh-public-health-item-arrow"
                      size={19}
                    />
                  </article>
                </ScrollReveal>
              );
            })}
          </div>

        </div>

        <ScrollReveal direction="up">
          <div className="amh-public-health-bottom">
            <span className="amh-public-health-bottom-line" />

            <p>
              Our commitment to preventive care and health promotion
              supports healthier individuals and communities.
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default PublicHealthServices;
