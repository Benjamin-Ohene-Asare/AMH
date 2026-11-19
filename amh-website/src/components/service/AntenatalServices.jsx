
import React from "react";
import {
  HeartPulse,
  Stethoscope,
  Activity,
  ArrowRight,
} from "lucide-react";

import ScrollReveal from "../ScrollReveal";
import antenatalImage from "../../assets/s7.avif";
import "./AntenatalServices.css";

const services = [
  {
    icon: Stethoscope,
    title: "General Medicine",
    description: "Comprehensive care for adult medical conditions.",
  },
  {
    icon: HeartPulse,
    title: "Obstetrics & Gynaecology",
    description: "Maternity care, safe delivery, and women's health.",
  },
  {
    icon: Activity,
    title: "General Surgery",
    description:
      "Minor and selected major surgical procedures in a safe environment.",
  },
  {
    icon: Stethoscope,
    title: "ENT",
    description:
      "Diagnosis and management of ear, nose and throat problems.",
  },
  {
    icon: HeartPulse,
    title: "Cancer Prevention",
    description: "",
  },
  {
    icon: Activity,
    title: "Eye Care",
    description: "Screening and treatment for common eye conditions.",
  },
];

const AntenatalServices = () => {
  return (
    <section className="amh-antenatal-section">
      <div className="amh-antenatal-container">

        <div className="amh-antenatal-layout">

          <ScrollReveal
            direction="left"
            className="amh-antenatal-visual"
          >
            <div className="amh-antenatal-image">
              <img
                src={antenatalImage}
                alt="Antenatal care at Ahmadiyya Muslim Hospital"
              />

              <div className="amh-antenatal-image-overlay" />

              <div className="amh-antenatal-image-caption">
                <span>AHMADIYYA MUSLIM HOSPITAL</span>
                <h3>Compassionate Care for Every Patient</h3>
              </div>
            </div>

            <div className="amh-antenatal-image-accent" />
          </ScrollReveal>

          <div className="amh-antenatal-content">
            <ScrollReveal direction="right">
              <span className="amh-antenatal-label">
                OUR HEALTHCARE SERVICES
              </span>

              <h2>
                Antenatal <span>Care</span>
              </h2>

              <h3>We offer:</h3>

              <p className="amh-antenatal-intro">
                At Ahmadiyya Muslim Hospital, Daboase, we provide expert
                medical care through our team of experienced specialists.
                Our goal is to offer accurate diagnosis, effective treatment,
                and compassionate support for a wide range of medical needs.
              </p>

              <h3 className="amh-antenatal-list-heading">
                Our specialist services include:
              </h3>
            </ScrollReveal>

            <div className="amh-antenatal-services-list">
              {services.map((service, index) => {
                const Icon = service.icon;

                return (
                  <ScrollReveal
                    key={service.title}
                    direction="up"
                    delay={index * 0.08}
                  >
                    <div className="amh-antenatal-service-item">
                      <div className="amh-antenatal-service-icon">
                        <Icon size={18} />
                      </div>

                      <div>
                        <h4>{service.title}</h4>
                        {service.description && (
                          <p>{service.description}</p>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            <ScrollReveal direction="up">
              <div className="amh-antenatal-note">
                <span />
                <p>
                  Our specialists work hand-in-hand with the general
                  practitioners and nurses to ensure continuity of care
                  from diagnosis through recovery.
                </p>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AntenatalServices;
