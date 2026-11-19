
import React from "react";
import {
  Building2,
  Users,
  HeartHandshake,
  ArrowUpRight,
} from "lucide-react";

import ScrollReveal from "../ScrollReveal";
import supportImage from "../../assets/s5.avif";
import "./SupportServices.css";

const supportAreas = [
  {
    number: "01",
    icon: Building2,
    title: "Facility Operations",
    description:
      "Essential non-clinical functions that help the hospital operate smoothly and efficiently.",
  },
  {
    number: "02",
    icon: Users,
    title: "Clinical Team Support",
    description:
      "Supporting the work of clinical teams so they can focus on delivering patient care.",
  },
  {
    number: "03",
    icon: HeartHandshake,
    title: "Patient Experience",
    description:
      "Contributing to a safe, organised and welcoming environment for patients.",
  },
];

const SupportServices = () => {
  return (
    <section className="amh-support-section">
      <div className="amh-support-container">

        <ScrollReveal direction="up">
          <div className="amh-support-heading">
            <div>
              <span className="amh-support-label">BEYOND MEDICAL CARE</span>
              <h2>
                The Support Behind <span>Better Healthcare</span>
              </h2>
            </div>

            <p>
              Our Support Services provide essential non-clinical functions
              that help the hospital operate smoothly, safely and efficiently.
              They play an important role in enhancing the overall patient
              experience.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up">
          <div className="amh-support-image">
            <img
              src={supportImage}
              alt="Support services at Ahmadiyya Muslim Hospital"
            />

            <div className="amh-support-image-overlay" />

            <div className="amh-support-image-text">
              <span>EVERY ROLE MATTERS</span>
              <h3>Working Together for a Better Patient Experience</h3>
            </div>

            <div className="amh-support-image-mark">
              <ArrowUpRight size={27} />
            </div>
          </div>
        </ScrollReveal>

        <div className="amh-support-grid">
          {supportAreas.map((item, index) => {
            const Icon = item.icon;

            return (
              <ScrollReveal
                key={item.number}
                direction="up"
                delay={index * 0.12}
              >
                <article className="amh-support-card">
                  <div className="amh-support-card-top">
                    <span>{item.number}</span>
                    <Icon size={25} strokeWidth={1.6} />
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal direction="up">
          <div className="amh-support-footer">
            <span />
            <p>
              By enabling our clinical teams to focus on patient care,
              support services help improve service delivery and promote
              greater patient satisfaction.
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default SupportServices;
