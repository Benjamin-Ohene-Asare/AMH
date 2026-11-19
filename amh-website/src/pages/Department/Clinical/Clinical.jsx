
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

import ScrollReveal from "../../../components/ScrollReveal";
import clinicalData from "../../../data/clinicalData";
import clinicalHeroImage from "../../../assets/BC.png";
import "./Clinical.css";

const Clinical = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const closeModal = () => {
    setSelectedDepartment(null);
  };

  return (
    <main className="clinical-page">

      {/* HERO */}
   {/* HERO */}
<section
  className="clinical-hero"
  style={{ backgroundImage: `url(${clinicalHeroImage})` }}
>
  <div className="clinical-hero-overlay"></div>

  <div className="clinical-hero-content">
    <ScrollReveal direction="up">
      <div className="clinical-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/departments">Departments</Link>
        <span>/</span>
        <span>Clinical</span>
      </div>

      <h1>Clinical Departments</h1>

      <p>
        Our clinical units are supported by skilled professionals
        who provide high-quality healthcare tailored to meet
        patient needs and achieve better health outcomes.
      </p>
    </ScrollReveal>
  </div>
</section>

      {/* DEPARTMENT INTRODUCTION */}
      <section className="clinical-intro">
        <div className="clinical-container">

          <ScrollReveal direction="up">
            <div className="clinical-intro-content">
              <span className="clinical-label">
                OUR CLINICAL UNITS
              </span>

              <h2>
                Dedicated Teams. <span>Quality Patient Care.</span>
              </h2>

              <p>
                Explore the different clinical departments at
                Ahmadiyya Muslim Hospital. Each unit plays a role
                in supporting the healthcare needs of our patients.
              </p>
            </div>
          </ScrollReveal>

          {/* DEPARTMENT CARDS */}
          <div className="clinical-department-grid">
            {clinicalData.map((department, index) => (
              <ScrollReveal
                key={department.id}
                direction="up"
                delay={(index % 4) * 0.08}
              >
                <article className="clinical-card">

                  <div className="clinical-card-image">
                    <img
                      src={department.image}
                      alt={department.name}
                      loading="lazy"
                    />

                    <span className="clinical-card-index">
                      {String(department.id).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="clinical-card-content">
                    <h3>{department.name}</h3>

            

                    <button
                      type="button"
                      className="clinical-view-button"
                      onClick={() => setSelectedDepartment(department)}
                    >
                      View More
                      <ArrowUpRight size={18} />
                    </button>
                  </div>

                </article>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* DEPARTMENT DETAILS MODAL */}
      <AnimatePresence>
        {selectedDepartment && (
          <motion.div
            className="clinical-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            aria-hidden="false"
          >
            <motion.div
              className="clinical-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="clinical-modal-title"
              initial={{ opacity: 0, y: 45, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.97 }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              {/* POPUP IMAGE */}
              <div className="clinical-modal-image">
                <img
                  src={
                    selectedDepartment.detailImage ||
                    selectedDepartment.image
                  }
                  alt={selectedDepartment.name}
                />

                <span className="clinical-modal-image-tag">
                  Clinical Department
                </span>
              </div>

              {/* POPUP CONTENT */}
              <div className="clinical-modal-content">

                <div className="clinical-modal-heading">
                  <div>
                    <span className="clinical-label">
                      DEPARTMENT INFORMATION
                    </span>

                    <h2 id="clinical-modal-title">
                      {selectedDepartment.name}
                    </h2>
                  </div>

                  <span className="clinical-modal-icon">
                    <CheckCircle2 size={22} />
                  </span>
                </div>

                {/* OVERVIEW */}
                {selectedDepartment.overview && (
                  <div className="clinical-modal-section">
                    <h3>Overview</h3>
                    <p>{selectedDepartment.overview}</p>
                  </div>
                )}

                {/* SERVICES */}
                {selectedDepartment.services?.length > 0 && (
                  <div className="clinical-modal-section">
                    <h3>Services &amp; Responsibilities</h3>

                    <ul>
                      {selectedDepartment.services.map((service, index) => (
                        <li key={index}>
                          <CheckCircle2 size={17} />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* FOOTER */}
                <div className="clinical-modal-footer">
                  <button
                    type="button"
                    className="clinical-modal-cancel"
                    onClick={closeModal}
                  >
                    <X size={17} />
                    Cancel
                  </button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
};

export default Clinical;
