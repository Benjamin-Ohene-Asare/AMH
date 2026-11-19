
import React from "react";
import "./Services.css";
import SpecialistServices from "../../components/service/SpecialistServices";
import OutpatientServices from "../../components/service/OutpatientServices";
import DiagnosticsServices from "../../components/service/DiagnosticsServices";
import PharmaceuticalServices from "../../components/service/PharmaceuticalServices";
import SupportServices from "../../components/service/SupportServices";
import PublicHealthServices from "../../components/service/PublicHealthServices";
import ServicesCTA from "../../components/service/ServicesCTA";

import AntenatalServices from "../../components/service/AntenatalServices";
export const Services = () => {
  return (
    <main className="amh-services-page">
      <section className="amh-services-hero">
        <div className="amh-services-hero-overlay">
          <div className="amh-services-hero-content">

            <div className="amh-services-breadcrumb">
              <a href="/">Home</a>
              <span>/</span>
              <span>Services</span>
            </div>

            <div className="amh-services-hero-line" />

            <h1>Our Services</h1>

            <p>
              Providing quality healthcare through expert medical
              services, compassionate care and professional support.
            </p>

          </div>
        </div>
      </section>

      <SpecialistServices/>
      <OutpatientServices/>
      <DiagnosticsServices/>
      <PharmaceuticalServices/>
      <SupportServices/>
      <PublicHealthServices/>
      <AntenatalServices/>
      <ServicesCTA/>
    </main>
  );
};

export default Services;
