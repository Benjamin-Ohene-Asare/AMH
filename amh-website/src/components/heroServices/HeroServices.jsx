
import {
  Stethoscope,
  BedDouble,
  Microscope,
  ArrowUpRight,
} from "lucide-react";

import "./HeroServices.css";

/*
 * AHMADIYYA MUSLIM HOSPITAL
 * COMPONENT: Featured Hero Services
 *
 * DESIGN:
 * Premium floating service cards with gradients,
 * distinct icons, interactive hover effects,
 * and responsive layouts.
 *
 * DEVELOPER NOTES:
 * - Update service details when officially confirmed.
 * - Replace section anchors with real service routes.
 * - Keep icons decorative; link text is accessible.
 * - Do not add introductory eyebrow headings.
 */

const services = [
  {
    id: "specialist",
    number: "01",
    title: "Specialist Services",
    description:
      "Dedicated medical consultations and specialist care focused on your health and well-being.",
    icon: Stethoscope,
    href: "#specialist-services",
  },
  {
    id: "patient",
    number: "02",
    title: "Outpatient & Inpatient Care",
    description:
      "Compassionate medical attention and coordinated care throughout your treatment and recovery.",
    icon: BedDouble,
    href: "#patient-care",
  },
  {
    id: "laboratory",
    number: "03",
    title: "Laboratory Investigations",
    description:
      "Diagnostic laboratory services supporting informed clinical decisions and patient care.",
    icon: Microscope,
    href: "#laboratory",
  },
];

export default function HeroServices() {
  return (
    <section
      className="amh-hero-services"
      aria-label="Featured hospital services"
    >
      <div className="amh-services-container">
        <div className="amh-services-grid">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article className="amh-feature-card" key={service.id}>
                <div className="amh-feature-top">
                  <div className="amh-feature-icon">
                    <Icon size={30} strokeWidth={1.7} aria-hidden="true" />
                  </div>

                  <span className="amh-feature-number">
                    {service.number}
                  </span>
                </div>

                <div className="amh-feature-body">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>

                <a href={service.href} className="amh-feature-link">
                  <span>Explore Service</span>
                  <span className="amh-feature-arrow">
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </span>
                </a>

                <div className="amh-feature-decoration" aria-hidden="true" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
