
import React from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "../../components/ScrollReveal";
import "./Departments.css";

import clinicalImage from "../../assets/IMG_2767.avif";
import nonClinicalImage from "../../assets/IMG_9871.avif";

const departments = [
  {
    id: "01",
    title: "Clinical Departments",
    description:
      "Our clinical units are supported by skilled professionals who provide high-quality healthcare tailored to meet patient needs and achieve better health outcomes.",
    image: clinicalImage,
    link: "/departments/clinical",
    label: "Explore Clinical Departments",
  },
  {
    id: "02",
    title: "Non-Clinical Departments",
    description:
      "Our non-clinical units provide essential support services that ensure the smooth functioning of our facility and contribute significantly to the overall patient experience.",
    image: nonClinicalImage,
    link: "/departments/non-clinical",
    label: "Explore Non-Clinical Departments",
  },
];

const Departments = () => {
  return (
    <main className="departments-page">

      <section className="departments-hero">
        <div className="departments-hero-overlay"></div>

        <div className="departments-hero-content">
          <ScrollReveal direction="up">
            <span className="departments-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              Departments
            </span>

            <h1>Our Departments</h1>

            <p>
              Discover the clinical and non-clinical teams working together
              to deliver quality healthcare and support services.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="departments-overview">
        <div className="departments-container">

          <ScrollReveal direction="up">
            <div className="departments-intro">
              <span className="departments-section-label">
                HOW WE ARE ORGANISED
              </span>

              <h2>
                Two Pillars. <span>One Commitment to Care.</span>
              </h2>

              <p>
                Every department plays an important role in our hospital.
                From direct patient care to essential operational support,
                our teams work together to serve our community.
              </p>
            </div>
          </ScrollReveal>

          <div className="departments-category-grid">
            {departments.map((department, index) => (
              <ScrollReveal
                key={department.id}
                direction="up"
                delay={index * 0.15}
              >
                <article className="department-category-card">

                  <div className="department-category-image">
                    <img
                      src={department.image}
                      alt={department.title}
                    />

                    <span className="department-category-number">
                      {department.id}
                    </span>

                    <div className="department-category-image-overlay"></div>
                  </div>

                  <div className="department-category-content">
                    <h3>{department.title}</h3>

                    <p>{department.description}</p>

                    <Link
                      to={department.link}
                      className="department-category-link"
                    >
                      {department.label}
                      <span>
                        <ArrowUpRight size={19} />
                      </span>
                    </Link>
                  </div>

                </article>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      <section className="departments-bottom">
        <ScrollReveal direction="up">
          <div className="departments-bottom-content">
            <h2>Working Together for Better Healthcare</h2>
            <p>
              Quality healthcare is made possible through the dedication
              and collaboration of every department.
            </p>
            <Link to="/contact">
              Contact Us <ArrowRight size={18} />
            </Link>
          </div>
        </ScrollReveal>
      </section>

    </main>
  );
};

export default Departments;
