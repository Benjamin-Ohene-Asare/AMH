
import React from "react";
import {
  ArrowUpRight,
  Stethoscope,
  HeartPulse,
  Baby,
  Activity,
  Ear,
  Eye,
  ShieldPlus,
} from "lucide-react";

import s1 from "../../assets/s1.avif";
import ScrollReveal from "../ScrollReveal";
import "./SpecialistServices.css";

const specialties = [
  {
    title: "General Medicine",
    description: "Comprehensive care for adult medical conditions.",
    icon: HeartPulse,
  },
  {
    title: "Obstetrics & Gynaecology",
    description: "Maternity care, safe delivery and women's health.",
    icon: Baby,
  },
  {
    title: "General Surgery",
    description: "Minor and selected major surgical procedures in a safe environment.",
    icon: Activity,
  },
  {
    title: "ENT",
    description: "Diagnosis and management of ear, nose and throat problems.",
    icon: Ear,
  },
  {
    title: "Cancer Prevention",
    description: "Cancer prevention services.",
    icon: ShieldPlus,
  },
  {
    title: "Eye Care",
    description: "Screening and treatment for common eye conditions.",
    icon: Eye,
  },
];

const SpecialistServices = () => {
  return (
    <section className="amh-specialist-section" id="specialist-services">
      <div className="amh-specialist-container">

        <ScrollReveal direction="up">
          <div className="amh-specialist-heading">
            <span className="amh-specialist-label">
              EXPERT MEDICAL CARE
            </span>

            <h2>
              Specialist <span>Services</span>
            </h2>

            <p>
              At Ahmadiyya Muslim Hospital, Daboase, we provide expert
              medical care through our team of experienced specialists.
              Our goal is to offer accurate diagnosis, effective treatment,
              and compassionate support for a wide range of medical needs.
            </p>
          </div>
        </ScrollReveal>

        <div className="amh-specialist-layout">

          <ScrollReveal direction="left" className="amh-specialist-image-wrap">
            <div className="amh-specialist-image">
              <img src={s1} alt="Medical care at Ahmadiyya Muslim Hospital" />

              <div className="amh-specialist-image-caption">
                <Stethoscope size={23} />
                <span>Care guided by medical expertise</span>
              </div>
            </div>
          </ScrollReveal>

          <div className="amh-specialist-content">
            <ScrollReveal direction="right">
              <div className="amh-specialist-subheading">
                <span>OUR SPECIALTIES</span>
                <h3>Comprehensive care for your health needs.</h3>
              </div>
            </ScrollReveal>

            <div className="amh-specialty-list">
              {specialties.map((item, index) => {
                const Icon = item.icon;

                return (
                  <ScrollReveal
                    key={item.title}
                    direction="up"
                    delay={index * 0.06}
                  >
                    <div className="amh-specialty-item">
                      <div className="amh-specialty-icon">
                        <Icon size={22} strokeWidth={1.7} />
                      </div>

                      <div className="amh-specialty-info">
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                      </div>

                      <ArrowUpRight
                        className="amh-specialty-arrow"
                        size={19}
                      />
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            <ScrollReveal direction="up">
              <p className="amh-specialist-note">
                Our specialists work hand-in-hand with general practitioners
                and nurses to ensure continuity of care from diagnosis
                through recovery.
              </p>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SpecialistServices;
