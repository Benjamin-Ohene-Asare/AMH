
import React, { useState } from "react";
import { ArrowUpRight, ArrowRight, Users } from "lucide-react";
import ScrollReveal from "../../components/ScrollReveal";

import director from "../../assets/d1.avif";
import administrator from "../../assets/d2.avif";
import nursing from "../../assets/d3.avif";
import laboratory from "../../assets/d4.avif";
import procurement from "../../assets/d5.jpg";
import accounts from "../../assets/d6.avif";

import "./OurTeam.css";

const teamMembers = [
  {
    id: 1,
    name: "Dr. Fareeda Adusei Wilson",
    position: "Medical Director",
    image: director,
    shortBio: "Providing leadership and direction towards quality healthcare delivery.",
    fullBio: "Providing leadership and direction towards quality healthcare delivery, ensuring that the hospital continues to uphold high standards of professional medical practice and patient care.",
  },
  {
    id: 2,
    name: "Ms. Wilhelmina Agyel",
    position: "Head of Administration",
    image: administrator,
    shortBio: "Overseeing administrative operations and supporting effective hospital management.",
    fullBio: "Overseeing administrative operations and supporting effective hospital management through coordination, planning and efficient delivery of administrative services.",
  },
  {
    id: 3,
    name: "Ms. Priscilla Kabuki Caesar",
    position: "Head of Nursing",
    image: nursing,
    shortBio: "Leading nursing services and promoting quality patient-centred care.",
    fullBio: "Leading nursing services and promoting quality patient-centred care through effective nursing supervision, coordination and professional standards.",
  },
  {
    id: 4,
    name: "Mr. Kojo Hammond",
    position: "Head of Laboratory",
    image: laboratory,
    shortBio: "Supporting reliable laboratory services and diagnostic processes.",
    fullBio: "Supporting reliable laboratory services and diagnostic processes through the coordination of laboratory operations and professional standards.",
  },
  {
    id: 5,
    name: "Mr. Ishaque Ahmed Abakah",
    position: "Head of Procurement",
    image: procurement,
    shortBio: "Coordinating procurement activities and the supply of essential resources.",
    fullBio: "Coordinating procurement activities and the supply of essential resources to support the hospital's daily operations and healthcare delivery.",
  },
  {
    id: 6,
    name: "Miss Anna Okyere",
    position: "Head of Account",
    image: accounts,
    shortBio: "Supporting financial administration and accountability.",
    fullBio: "Supporting financial administration and accountability through the coordination of accounting activities and financial records.",
  },
];

const OurTeam = () => {
  const [expandedMembers, setExpandedMembers] = useState([]);

  const toggleReadMore = (id) => {
    setExpandedMembers((current) =>
      current.includes(id)
        ? current.filter((memberId) => memberId !== id)
        : [...current, id]
    );
  };

  return (
    <section className="amh-team-section" id="management">
      <div className="amh-team-container">

        <ScrollReveal direction="up" duration={0.8}>
          <div className="amh-team-intro">
            <span className="amh-team-eyebrow">OUR MANAGEMENT</span>

            <h2>
              Dedication. Expertise. <span>Passion.</span>
            </h2>

            <p>
              Meet the dedicated professionals providing leadership and
              direction at Ahmadiyya Muslim Hospital. Their commitment and
              expertise support our mission of delivering quality healthcare.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.1}>
          <div className="amh-team-heading">
            <div>
              <h3>Meet Our Leadership</h3>
              <p>The people behind our commitment to excellent healthcare.</p>
            </div>

            <div className="amh-team-count">
              <Users size={18} />
              <span>Management Team</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="amh-team-grid">
          {teamMembers.map((member, index) => {
            const isExpanded = expandedMembers.includes(member.id);

            return (
              <ScrollReveal
                key={member.id}
                direction="up"
                delay={index * 0.12}
                duration={0.75}
                className="amh-team-reveal"
              >
                <article className="amh-team-card">
                  <div className="amh-team-image">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                    />
                  </div>

                  <div className="amh-team-info">
                    <span className="amh-team-position">
                      {member.position}
                    </span>

                    <h3>{member.name}</h3>

                    <p className="amh-team-bio">
                      {isExpanded ? member.fullBio : member.shortBio}
                    </p>

                    <button
                      type="button"
                      className="amh-team-readmore"
                      onClick={() => toggleReadMore(member.id)}
                      aria-expanded={isExpanded}
                    >
                      <span>
                        {isExpanded ? "Read Less" : "Read Biography"}
                      </span>

                      {isExpanded ? (
                        <ArrowRight size={17} />
                      ) : (
                        <ArrowUpRight size={17} />
                      )}
                    </button>
                  </div>

                  <div className="amh-team-card-accent" />
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal direction="up" delay={0.2}>
          <div className="amh-team-footer">
            <span className="amh-team-footer-line" />
            <p>
              Leadership dedicated to serving our community with
              professionalism and compassion.
            </p>
            <span className="amh-team-footer-line" />
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default OurTeam;
