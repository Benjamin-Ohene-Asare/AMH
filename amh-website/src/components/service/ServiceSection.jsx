
import {
  ArrowUpRight,
  ArrowRight,
  Stethoscope,
  ClipboardList,
  Microscope,
  Pill,
  Building2,
  ShieldCheck,
  Baby,
} from "lucide-react";

import s1 from "../../assets/s1.avif";
import s2 from "../../assets/s2.avif";
import s3 from "../../assets/s3.avif";
import s4 from "../../assets/s4.avif";
import s5 from "../../assets/s5.avif";
import s6 from "../../assets/s6.avif";
import s7 from "../../assets/s7.avif";

import ScrollReveal from "../../components/ScrollReveal";
import "./ServiceSection.css";

const services = [
  {
    id: 1,
    title: "Specialist Services",
    description:
      "Specialist consultations and medical care tailored to individual patient needs.",
    image: s1,
    icon: Stethoscope,
    slug: "specialist-services",
  },
  {
    id: 2,
    title: "Outpatient Department",
    description:
      "Consultation, assessment and treatment for patients visiting the hospital.",
    image: s2,
    icon: ClipboardList,
    slug: "outpatient-department",
  },
  {
    id: 3,
    title: "Diagnostics & Laboratory",
    description:
      "Medical investigations and diagnostic services supporting effective patient care.",
    image: s3,
    icon: Microscope,
    slug: "diagnostics-laboratory",
  },
  {
    id: 4,
    title: "Pharmaceutical Care",
    description:
      "Medication dispensing and professional pharmaceutical support for patients.",
    image: s4,
    icon: Pill,
    slug: "pharmaceutical-care",
  },
  {
    id: 5,
    title: "Support Services",
    description:
      "Essential hospital support services that contribute to patient care and daily operations.",
    image: s5,
    icon: Building2,
    slug: "support-services",
  },
  {
    id: 6,
    title: "Public Health",
    description:
      "Community health education, preventive care and public health initiatives.",
    image: s6,
    icon: ShieldCheck,
    slug: "public-health",
  },
  {
    id: 7,
    title: "Antenatal Care",
    description:
      "Maternal healthcare and support throughout pregnancy.",
    image: s7,
    icon: Baby,
    slug: "antenatal-care",
  },
];

function ServiceCard({ service, index }) {
  const Icon = service.icon;

  return (
    <ScrollReveal
      direction="up"
      delay={index * 0.1}
      className="amh-service-reveal"
    >
      <article className="amh-service-card">
        <div className="amh-service-image">
          <img
            src={service.image}
            alt=""
            loading="lazy"
          />
        </div>

        <div className="amh-service-overlay" />

        <div className="amh-service-card-content">
          <div className="amh-service-card-top">
            <span className="amh-service-number">
              {String(service.id).padStart(2, "0")}
            </span>

            <div className="amh-service-icon">
              <Icon size={25} strokeWidth={1.7} />
            </div>
          </div>

          <div className="amh-service-card-bottom">
            <div className="amh-service-accent-line" />

            <h3>{service.title}</h3>

            <p>{service.description}</p>

            <a
              href={`/services#${service.slug}`}
              className="amh-service-link"
              aria-label={`Explore ${service.title}`}
            >
              Explore Service
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}

export default function ServiceSections() {
  return (
    <section className="amh-services-section" id="services">
      <div className="amh-services-wrapper">

        {/* Section introduction */}
        <ScrollReveal direction="up">
          <div className="amh-services-heading">
            <div className="amh-services-heading-text">
              <span className="amh-services-label">
                CARE THAT MATTERS
              </span>

              <h2>
                Healthcare Services <span>For Every Need</span>
              </h2>

              <p>
                Explore the healthcare services available at
                Ahmadiyya Muslim Hospital, Daboase.
              </p>
            </div>

            <a href="/services" className="amh-services-viewall">
              View All Services
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </ScrollReveal>

        {/* Service cards */}
        <div className="amh-services-list">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>

        {/* Closing link */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="amh-services-footer">
            <p>
              Discover more about the care and services we provide.
            </p>

            <a href="/services">
              Explore all our services
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
