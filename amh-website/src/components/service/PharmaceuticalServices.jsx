
import React from "react";
import {
  Pill,
  ShieldCheck,
  Clock3,
  HeartHandshake,
  ArrowUpRight,
} from "lucide-react";

import ScrollReveal from "../ScrollReveal";
import pharmacyImage from "../../assets/s4.avif";
import "./PharmaceuticalServices.css";

const pharmacyFeatures = [
  {
    icon: ShieldCheck,
    title: "Safe Dispensing",
    description: "Safe and timely dispensing of prescribed medications.",
  },
  {
    icon: Pill,
    title: "Quality Medications",
    description: "Access to quality medications to support your treatment.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Care",
    description: "Individual attention and pharmaceutical care for every patient.",
  },
  {
    icon: Clock3,
    title: "Medication Guidance",
    description: "Expert advice on proper drug use and managing health conditions.",
  },
];

const PharmaceuticalServices = () => {
  return (
    <section className="amh-pharmacy-section">
      <div className="amh-pharmacy-container">

        <div className="amh-pharmacy-layout">

          <div className="amh-pharmacy-content">
            <ScrollReveal direction="left">
              <span className="amh-pharmacy-label">
                YOUR HEALTH, OUR PRIORITY
              </span>

              <h2>
                Pharmaceutical Care You Can <span>Trust</span>
              </h2>

              <p className="amh-pharmacy-intro">
                Our fully equipped pharmacy provides safe and timely
                dispensing of prescribed medications, expert advice on
                proper drug use, and guidance on managing your health
                conditions.
              </p>
            </ScrollReveal>

            <div className="amh-pharmacy-features">
              {pharmacyFeatures.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <ScrollReveal
                    key={feature.title}
                    direction="up"
                    delay={index * 0.1}
                  >
                    <div className="amh-pharmacy-feature">
                      <div className="amh-pharmacy-feature-icon">
                        <Icon size={21} strokeWidth={1.8} />
                      </div>

                      <div>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            <ScrollReveal direction="up">
              <div className="amh-pharmacy-note">
                <span className="amh-pharmacy-note-line" />
                <p>
                  Committed to supporting your overall well-being
                  through quality medications and personalized care.
                </p>
                <ArrowUpRight size={20} />
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="right" className="amh-pharmacy-visual">
            <div className="amh-pharmacy-image-wrap">
              <img
                src={pharmacyImage}
                alt="Pharmaceutical care at Ahmadiyya Muslim Hospital"
              />

              <div className="amh-pharmacy-image-overlay" />

              <div className="amh-pharmacy-image-caption">
                <span>QUALITY CARE</span>
                <h3>Supporting Every Step of Your Treatment</h3>
              </div>
            </div>

            <div className="amh-pharmacy-image-accent" />
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};

export default PharmaceuticalServices;
