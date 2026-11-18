
import React from "react";
import { ArrowUpRight, Stethoscope } from "lucide-react";
import ScrollReveal from "../../components/ScrollReveal";
import "./CliniciansSection.css";

import dr1 from "../../assets/dr1.avif";
import dr2 from "../../assets/dr2.avif";
import dr3 from "../../assets/dr3.avif";
import dr4 from "../../assets/dr4.avif";

const clinicians = [
  {
    name: "Dr. Charles Appiah",
    role: "Senior Specialist",
    image: dr1,
    bio: "A highly experienced Senior Specialist with over 20 years of dedicated clinical practice, performing a wide range of general surgeries. He provides comprehensive patient management across the facility, ensuring high standards of surgical care, accurate diagnosis, and effective treatment outcomes.",
  },
  {
    name: "Ms. Edna Duah",
    role: "Principal Clinician",
    image: dr2,
    bio: "A dedicated Principal Clinician with several years of progressive experience in the medical field, providing comprehensive care across inpatient, outpatient, and emergency settings. She is responsible for leading the clinical unit, overseeing prescribers, and ensuring the highest standards of patient management.",
  },
  {
    name: "Dr. Gosh Rockson",
    role: "Medical Officer",
    image: dr3,
    bio: "Dr. Rockson Gosh is a dedicated Medical Officer with experience in General Surgery, Internal Medicine, and Pediatrics. He is committed to providing patient-centered, evidence-based care with professionalism and compassion. He has experience in the assessment and management of both emergency and routine cases and works collaboratively within multidisciplinary teams to ensure optimal patient outcomes. Dr. Gosh values clear communication, continuous learning, and delivering healthcare that prioritizes patient safety and dignity.",
  },
  {
    name: "Dr. Yvonne Agyapong",
    role: "Dental Surgeon",
    image: dr4,
    bio: "A dedicated and empathetic Dental Surgeon with strong clinical expertise in oral healthcare delivery. Skilled in providing both preventive and comprehensive dental treatments, while effectively assessing, diagnosing, and managing a wide range of oral health conditions. Committed to ensuring high standards of patient care and coordinating appropriate clinical interventions to meet individual patient needs.",
  },
];

const CliniciansSection = () => {
  return (
    <section className="amh-clinicians-section">
      <div className="amh-clinicians-container">

        <ScrollReveal direction="up">
          <div className="amh-clinicians-heading">
            <span>OUR CLINICAL TEAM</span>

            <h2>
              Providing you with the best
              <br />
              <span>Clinicians for the best care.</span>
            </h2>

            <p>
              Meet our dedicated healthcare professionals committed to
              delivering quality care with expertise, compassion,
              and professionalism.
            </p>
          </div>
        </ScrollReveal>

        <div className="amh-clinicians-grid">
          {clinicians.map((clinician, index) => (
            <ScrollReveal
              key={clinician.name}
              direction="up"
              delay={index * 0.12}
            >
              <article className="amh-clinician-card">
                <div className="amh-clinician-image">
                  <img
                    src={clinician.image}
                    alt={clinician.name}
                    loading="lazy"
                  />
                </div>

                <div className="amh-clinician-info">
                  <span className="amh-clinician-role">
                    <Stethoscope size={14} />
                    {clinician.role}
                  </span>

                  <h3>{clinician.name}</h3>

                  <p>{clinician.bio}</p>

                  <div className="amh-clinician-card-bottom">
                    <span>Dedicated to Quality Care</span>
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CliniciansSection;
