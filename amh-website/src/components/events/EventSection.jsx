
import React, { useEffect, useState } from "react";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

import ScrollReveal from "../../components/ScrollReveal";
import { getPublicEvents } from "../../api/api";

import "./EventSection.css";

const formatDate = (date) => {
  if (!date) return "Date to be announced";

  return new Date(date).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const EventSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getPublicEvents();
        const publishedEvents = Array.isArray(data)
          ? data
          : data.results || [];

        setEvents(publishedEvents.slice(0, 4));
      } catch (error) {
        console.error("Failed to load homepage events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="amh-events-section" id="events">
      <div className="amh-events-container">

        {/* SECTION INTRODUCTION */}
        <ScrollReveal direction="up">
          <div className="amh-events-heading">
            <span className="amh-events-label">
              HOSPITAL ACTIVITIES
            </span>

            <h2>
              Events & <span>Activities</span>
            </h2>

            <p>
              Stay connected with the programmes, activities and special
              events taking place at Ahmadiyya Muslim Hospital.
            </p>
          </div>
        </ScrollReveal>

        {/* EVENTS */}
        {loading ? (
          <div className="amh-events-footer">
            <p>Loading hospital events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="amh-events-footer">
            <p>
              No published events at the moment. Please check back soon.
            </p>
          </div>
        ) : (
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
                      <span>{formatDate(event.start_date)}</span>
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

                    <Link
                      to={`/events/${event.id}`}
                      className="amh-event-link"
                    >
                      <span>Explore Event</span>

                      <span className="amh-event-link-icon">
                        <ArrowUpRight size={17} />
                      </span>
                    </Link>
                  </div>

                  <div className="amh-event-card-accent" />

                </article>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* BOTTOM MESSAGE */}
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
