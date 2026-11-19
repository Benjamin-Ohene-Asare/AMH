
import React from "react";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  CalendarCheck,
} from "lucide-react";

import ScrollReveal from "../../components/ScrollReveal";

import ev1 from "../../assets/e1.avif";
import ev2 from "../../assets/e2.avif";
import ev3 from "../../assets/e3.avif";
import ev4 from "../../assets/e4.avif";

import "./Events.css";

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

const Events = () => {
  return (
    <main className="amh-events-page">

      {/* PAGE HERO */}
      <section className="amh-events-hero">
        <div className="amh-events-hero-content">
          <span className="amh-events-breadcrumb">
            <a href="/">Home</a> / Events
          </span>

          <h1>Events & Activities</h1>

          <p>
            Discover the programmes and activities of Ahmadiyya Muslim Hospital.
          </p>
        </div>
      </section>

      {/* EVENTS LISTING */}
      <section className="amh-events-listing">
        <div className="amh-events-container">

          <ScrollReveal direction="up">
            <div className="amh-events-heading">
              <span>WHAT'S HAPPENING</span>
              <h2>
                Hospital <span>Events</span>
              </h2>
              <p>
                Stay informed about our hospital programmes, health
                awareness activities and special occasions.
              </p>
            </div>
          </ScrollReveal>

          <div className="amh-events-grid">
            {events.map((event, index) => (
              <ScrollReveal
                key={event.id}
                direction="up"
                delay={index * 0.1}
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
                      Explore Event
                      <span>
                        <ArrowUpRight size={17} />
                      </span>
                    </a>
                  </div>

                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up">
            <div className="amh-events-bottom">
              <div className="amh-events-bottom-icon">
                <CalendarCheck size={27} />
              </div>

              <div>
                <h3>Connected through meaningful activities</h3>
                <p>
                  Building healthier communities through education,
                  awareness and collaboration.
                </p>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

    </main>
  );
};

export default Events;
