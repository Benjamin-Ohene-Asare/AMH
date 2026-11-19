
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

import ScrollReveal from "../../../components/ScrollReveal";
import nonClinicalData from "../../../data/nonClinicalData";

import "./NonClinical.css";

const NonClinical = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const closeModal = () => {
    setSelectedDepartment(null);
  };

  return (
    <main className="nonclinical-page">

      {/* HERO */}
      <section className="nonclinical-hero">
        <div className="nonclinical-hero-overlay"></div>

        <div className="nonclinical-hero-content">
          <ScrollReveal direction="up">
            <div className="nonclinical-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/departments">Departments</Link>
              <span>/</span>
              <span>Non-Clinical</span>
            </div>

            <h1>Non-Clinical Departments</h1>

            <p>
              Our non-clinical departments provide essential administrative,
              operational, and support services that help keep our hospital
              running efficiently and support quality healthcare delivery.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* DEPARTMENT INTRODUCTION */}
      <section className="nonclinical-intro">
        <div className="nonclinical-container">

          <ScrollReveal direction="up">
            <div className="nonclinical-intro-content">
              <span className="nonclinical-label">
                OUR SUPPORT UNITS
              </span>

              <h2>
                Behind Every Great Care. <span>Dedicated Support.</span>
              </h2>

              <p>
                Meet the departments and teams working behind the scenes
                to support the daily operations of Ahmadiyya Muslim Hospital.
              </p>
            </div>
          </ScrollReveal>

          {/* DEPARTMENT CARDS */}
          <div className="nonclinical-department-grid">
            {nonClinicalData.map((department, index) => (
              <ScrollReveal
                key={department.id}
                direction="up"
                delay={(index % 4) * 0.08}
              >
                <article className="nonclinical-card">

                  <div className="nonclinical-card-image">
                    {department.image ? (
                      <img
                        src={department.image}
                        alt={department.name}
                        loading="lazy"
                      />
                    ) : (
                      <div className="nonclinical-image-placeholder">
                        <span>{department.name.charAt(0)}</span>
                      </div>
                    )}

                    <span className="nonclinical-card-index">
                      {String(department.id).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="nonclinical-card-content">
                    <h3>{department.name}</h3>

                    <button
                      type="button"
                      className="nonclinical-view-button"
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
            className="nonclinical-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="nonclinical-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="nonclinical-modal-title"
              initial={{ opacity: 0, y: 45, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.97 }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              {/* POPUP IMAGE */}
              <div className="nonclinical-modal-image">
                {selectedDepartment.image ? (
                  <img
                    src={selectedDepartment.image}
                    alt={selectedDepartment.name}
                  />
                ) : (
                  <div className="nonclinical-image-placeholder">
                    <span>{selectedDepartment.name.charAt(0)}</span>
                  </div>
                )}

                <span className="nonclinical-modal-image-tag">
                  Non-Clinical Department
                </span>
              </div>

              {/* POPUP CONTENT */}
              <div className="nonclinical-modal-content">

                <div className="nonclinical-modal-heading">
                  <div>
                    <span className="nonclinical-label">
                      DEPARTMENT INFORMATION
                    </span>

                    <h2 id="nonclinical-modal-title">
                      {selectedDepartment.name}
                    </h2>
                  </div>

                  <span className="nonclinical-modal-icon">
                    <CheckCircle2 size={22} />
                  </span>
                </div>

                {selectedDepartment.overview && (
                  <div className="nonclinical-modal-section">
                    <h3>Overview</h3>
                    <p>{selectedDepartment.overview}</p>
                  </div>
                )}

                {/* FOOTER */}
                <div className="nonclinical-modal-footer">
                  <button
                    type="button"
                    className="nonclinical-modal-cancel"
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

export default NonClinical;
