
import React from "react";
import { ArrowUpRight, MapPin, Globe2, HeartPulse } from "lucide-react";
import ScrollReveal from "../../components/ScrollReveal";
import "./JourneySection.css";
import JourneyImage from "../../assets/journey.avif";

const JourneySection = () => {
  return (
    <section className="amh-journey-section">
      <div className="amh-journey-container">

        {/* IMAGE */}
        <ScrollReveal direction="left" duration={0.9}>
          <div className="amh-journey-visual">
            <img
              src={JourneyImage}
              alt="Ahmadiyya Muslim Hospital's journey"
              loading="lazy"
            />

            <div className="amh-journey-image-caption">
              <span>OUR STORY</span>
              <h3>A legacy of service to humanity.</h3>
            </div>

            <div className="amh-journey-image-number">
              <HeartPulse size={27} />
            </div>
          </div>
        </ScrollReveal>

        {/* STORY */}
        <ScrollReveal direction="right" delay={0.15}>
          <div className="amh-journey-content">

            <span className="amh-journey-label">OUR JOURNEY</span>

            <h2>
              A journey built on
              <span> service and compassion.</span>
            </h2>

            <div className="amh-journey-line" />

            <p>
              Established under the Nusrat Jahan Scheme, Ahmadiyya
              Muslim Hospital, Daboase, operates under the Ahmadiyya
              Muslim Health Service, Ghana (AHMSG) — an agency of
              the Ministry of Health.
            </p>

            <p>
              The establishment of the hospital was necessitated by
              a request from the Chiefs and Elders of Daboase to address
              the healthcare needs of the community. In support of this
              vision, the Chief made available forty (40) acres of land
              for the construction of the hospital.
            </p>

            <p>
              Today, our facility serves as the District Hospital for
              Wassa East, providing both primary and specialist care
              to clients from all sixteen (16) regions of Ghana.
            </p>

            <p>
              Beyond serving the health needs of Ghanaians, we also
              attend to patients from neighbouring countries such as
              Côte d’Ivoire, Burkina Faso, Mali, Nigeria, Niger, and
              Togo, who seek medical care at our hospital due to our
              high success rate in surgical operations and our
              reputation for quality, compassionate healthcare delivery.
            </p>

            <div className="amh-journey-location">
              <div className="amh-journey-location-icon">
                <MapPin size={21} />
              </div>
              <div>
                <strong>Daboase, Western Region</strong>
                <span>Wassa East District, Ghana</span>
              </div>
            </div>

          </div>
        </ScrollReveal>

      </div>

      {/* REACH */}
      <div className="amh-journey-reach">
        <ScrollReveal direction="up">
          <div className="amh-journey-reach-heading">
            <Globe2 size={25} />
            <div>
              <h3>Beyond borders, serving humanity.</h3>
              <p>
                Our hospital welcomes patients from Ghana and neighbouring
                West African countries.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="amh-journey-countries">
          {[
            "Ghana",
            "Côte d’Ivoire",
            "Burkina Faso",
            "Mali",
            "Nigeria",
            "Niger",
            "Togo",
          ].map((country, index) => (
            <ScrollReveal
              key={country}
              direction="up"
              delay={index * 0.07}
            >
              <span className="amh-journey-country">{country}</span>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
