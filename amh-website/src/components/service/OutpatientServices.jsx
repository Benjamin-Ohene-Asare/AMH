
import React from "react";
import {
  ArrowUpRight,
  ClipboardList,
  Stethoscope,
  HeartPulse,
  CheckCircle2,
} from "lucide-react";

import s2 from "../../assets/s2.avif";
import ScrollReveal from "../ScrollReveal";
import "./OutpatientServices.css";

const careStages = [
  {
    icon: ClipboardList,
    title: "Patient Assessment",
    description: "Initial assessment and triaging to understand patient needs.",
  },
  {
    icon: Stethoscope,
    title: "Medical Consultation",
    description: "Consultation with clinicians for professional medical attention.",
  },
  {
    icon: HeartPulse,
    title: "Treatment & Care",
    description: "Appropriate treatment and guidance based on clinical assessment.",
  },
];

const OutpatientServices = () => {
  return (
    <section className="amh-opd-section" id="outpatient-department">
      <div className="amh-opd-container">

        <div className="amh-opd-layout">

          <div className="amh-opd-content">
            <ScrollReveal direction="left">
              <span className="amh-opd-label">
                ACCESSIBLE HEALTHCARE
              </span>

              <h2>
                Outpatient <span>Department</span>
              </h2>

              <p className="amh-opd-description">
                Our Outpatient Department provides the first point of
                contact for patients seeking medical care at our facility.
                We offer general consultations, assessment, diagnosis,
                and treatment for a wide range of health conditions.
              </p>

              <p className="amh-opd-description">
                With a committed team of clinicians and nurses, the OPD
                ensures timely care, effective triaging, and smooth patient
                flow, making healthcare accessible, efficient, and
                patient-centered.
              </p>
            </ScrollReveal>

            <div className="amh-opd-stages">
              {careStages.map((stage, index) => {
                const Icon = stage.icon;

                return (
                  <ScrollReveal
                    key={stage.title}
                    direction="up"
                    delay={index * 0.1}
                  >
                    <div className="amh-opd-stage">
                      <div className="amh-opd-stage-icon">
                        <Icon size={21} />
                      </div>

                      <div>
                        <h4>{stage.title}</h4>
                        <p>{stage.description}</p>
                      </div>

                      <CheckCircle2
                        className="amh-opd-check"
                        size={18}
                      />
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          <ScrollReveal direction="right" className="amh-opd-visual">
            <div className="amh-opd-image">
              <img
                src={s2}
                alt="Outpatient Department at Ahmadiyya Muslim Hospital"
                loading="lazy"
              />

              <div className="amh-opd-image-overlay" />

              <div className="amh-opd-image-caption">
                <span className="amh-opd-caption-icon">
                  <Stethoscope size={22} />
                </span>

                <div>
                  <strong>Patient-centred care</strong>
                  <span>Supporting your journey to better health</span>
                </div>
              </div>
            </div>

            <div className="amh-opd-side-accent" />
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};

export default OutpatientServices;
