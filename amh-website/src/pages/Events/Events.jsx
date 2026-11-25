
import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  CalendarCheck,
} from "lucide-react";

import ScrollReveal from "../../components/ScrollReveal";
import { getPublicEvents } from "../../api/api";

import "./Events.css";

const formatDate = (date) => {
  if (!date) return "Date to be announced";

  return new Date(date).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getPublicEvents();

        setEvents(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        console.error("Failed to load events:", err);
        setError("We couldn't load hospital events at the moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

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

          {loading ? (
            <div className="amh-events-status">
              Loading hospital events...
            </div>
          ) : error ? (
            <div className="amh-events-status">
              {error}
            </div>
          ) : events.length === 0 ? (
            <div className="amh-events-status">
              <CalendarDays size={32} />
              <h3>No upcoming events</h3>
              <p>
                Please check back later for updates on our hospital activities.
              </p>
            </div>
          ) : (
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
                        <span>{formatDate(event.start_date)}</span>
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
                        href={`/events/${event.id}`}
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
          )}

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
