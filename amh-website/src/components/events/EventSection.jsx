
import React from "react";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import ScrollReveal from "../../components/ScrollReveal";

import ev1 from "../../assets/e1.avif";
import ev2 from "../../assets/e2.avif";
import ev3 from "../../assets/e3.avif";
import ev4 from "../../assets/e4.avif";

import "./EventSection.css";

const events = [
  {
    id: 1,
    image: ev1,
    title: "World Oral Health Day",
    date: "Fri, 20 Mar",
    location: "Ahmadiyya Muslim Hospital",
    link: "https://minaagyei2.wixsite.com/healthbridge-hospi-1/event-details/world-oral-health-day",
  },
  {
    id: 2,
    image: ev2,
    title: "2026 Annual Midwives Forum",
    date: "Wed, 04 Mar",
    location: "Ahmadiyya Muslim Hospital, Daboase",
    link: "https://minaagyei2.wixsite.com/healthbridge-hospi-1/event-details/2026-annual-midwives-forum",
  },
  {
    id: 3,
    image: ev3,
    title: "2026 Cervical Cancer Awareness Month",
    date: "Thu, 01 Jan",
    location: "Daboase",
    link: "https://minaagyei2.wixsite.com/healthbridge-hospi-1/event-details/2026-cervical-cancer-awareness-month",
  },
  {
    id: 4,
    image: ev4,
    title: "End of Year Staff Durbar",
    date: "Tue, 23 Dec",
    location: "Ahmadiyya Muslim Hospital",
    link: "https://minaagyei2.wixsite.com/healthbridge-hospi-1/event-details/end-of-year-staff-durbar",
  },
];

const EventSection = () => {
  return (
    <section className="amh-events-section" id="events">
      <div className="amh-events-container">

        {/* Section introduction */}
        <ScrollReveal direction="up">
          <div className="amh-events-heading">
            <span className="amh-events-label">HOSPITAL ACTIVITIES</span>

            <h2>
              Events & <span>Activities</span>
            </h2>

            <p>
              Stay connected with the programmes, activities and special
              events taking place at Ahmadiyya Muslim Hospital.
            </p>
          </div>
        </ScrollReveal>

        {/* Events */}
        <div className="amh-events-grid">
          {events.map((event, index) => (
            <ScrollReveal
              key={event.id}
              direction="up"
              delay={index * 0.12}
              duration={0.8}
              className="amh-event-reveal"
            >
              <article className="amh-event-card">

                <div className="amh-event-image">
                  <img
                    src={event.image}
                    alt={event.title}
                    loading="lazy"
                  />

                  <div className="amh-event-date">
                    <CalendarDays size={15} />
                    <span>{event.date}</span>
                  </div>

                  <div className="amh-event-image-overlay" />
                </div>

                <div className="amh-event-content">
                  <span className="amh-event-category">
                    Hospital Event
                  </span>

                  <h3>{event.title}</h3>

                  <div className="amh-event-location">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>

                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="amh-event-link"
                  >
                    <span>Explore Event</span>
                    <span className="amh-event-link-icon">
                      <ArrowUpRight size={17} />
                    </span>
                  </a>
                </div>

                <div className="amh-event-card-accent" />
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom message */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="amh-events-footer">
            <p>
              Building healthier communities through education,
              awareness and collaboration.
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default EventSection;
