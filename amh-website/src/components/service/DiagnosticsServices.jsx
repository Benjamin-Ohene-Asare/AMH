
import React from "react";
import {
  ArrowUpRight,
  Microscope,
  TestTube2,
  Droplets,
  Activity,
  ScanLine,
  HeartPulse,
  Check,
} from "lucide-react";

import s3 from "../../assets/s3.avif";
import ScrollReveal from "../ScrollReveal";
import "./DiagnosticsServices.css";

const investigations = [
  { icon: TestTube2, title: "Routine and specialized laboratory tests" },
  { icon: Microscope, title: "Biochemistry and haematology investigations" },
  { icon: Droplets, title: "Urinalysis" },
  { icon: Activity, title: "Blood grouping and cross-matching" },
  { icon: TestTube2, title: "Malaria, typhoid and infectious disease tests" },
  { icon: HeartPulse, title: "Pregnancy and hormone testing" },
  { icon: ScanLine, title: "X-ray and ultrasound services" },
  { icon: Activity, title: "ECG" },
];

const DiagnosticsServices = () => {
  return (
    <section
      className="amh-diagnostics-section"
      id="diagnostics-laboratory"
    >
      <div className="amh-diagnostics-container">

        <ScrollReveal direction="up">
          <div className="amh-diagnostics-heading">
            <span>ACCURACY THAT MATTERS</span>
            <h2>
              Diagnostics <span>& Laboratory</span>
            </h2>
            <p>
              Supporting early detection, accurate diagnosis and
              effective treatment through essential medical
              investigations and diagnostic services.
            </p>
          </div>
        </ScrollReveal>

        <div className="amh-diagnostics-layout">

          <ScrollReveal
            direction="left"
            className="amh-diagnostics-visual"
          >
            <div className="amh-diagnostics-image">
              <img
                src={s3}
                alt="Diagnostic and laboratory services"
                loading="lazy"
              />

              <div className="amh-diagnostics-image-overlay">
                <Microscope size={30} />
                <div>
                  <strong>Reliable Diagnostics</strong>
                  <p>Supporting informed clinical decisions</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="amh-diagnostics-content">
            <ScrollReveal direction="right">
              <h3>Our Diagnostic Services</h3>
              <p className="amh-diagnostics-intro">
                Our diagnostic and laboratory unit plays a vital
                role in identifying health conditions and supporting
                effective patient management.
              </p>
            </ScrollReveal>

            <div className="amh-investigation-grid">
              {investigations.map((item, index) => {
                const Icon = item.icon;

                return (
                  <ScrollReveal
                    key={item.title}
                    direction="up"
                    delay={index * 0.05}
                  >
                    <div className="amh-investigation-item">
                      <div className="amh-investigation-icon">
                        <Icon size={19} strokeWidth={1.8} />
                      </div>
                      <span>{item.title}</span>
                      <Check
                        className="amh-investigation-check"
                        size={16}
                      />
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            <ScrollReveal direction="up">
              <div className="amh-diagnostics-note">
                All investigations are conducted using modern
                equipment and handled by qualified laboratory
                technologists, ensuring reliable and timely results.
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DiagnosticsServices;
