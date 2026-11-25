
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Clock3,
  CalendarCheck,
  ArrowUpRight,
} from "lucide-react";

import ScrollReveal from "../../components/ScrollReveal";
import { getPublicEventDetails } from "../../api/api";

import "./EventDetails.css";

const formatDate = (date) => {
  if (!date) return "To be announced";

  return new Date(date).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatTime = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const EventDetails = () => {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getPublicEventDetails(id);
        setEvent(data);
      } catch (err) {
        console.error("Failed to load event:", err);
        setError("This event could not be found or is no longer available.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <main className="amh-event-details-status">
        <p>Loading event details...</p>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="amh-event-details-status">
        <CalendarDays size={40} />
        <h2>Event unavailable</h2>
        <p>{error || "The requested event could not be found."}</p>

        <Link to="/events" className="amh-event-back-button">
          <ArrowLeft size={17} />
          Back to Events
        </Link>
      </main>
    );
  }

  return (
    <main className="amh-event-details-page">

      {/* EVENT HERO */}
      <section className="amh-event-details-hero">
        <img
          src={event.image}
          alt={event.title}
          className="amh-event-details-hero-image"
        />

        <div className="amh-event-details-hero-overlay" />

        <div className="amh-event-details-hero-content">
          <Link to="/events" className="amh-event-back-link">
            <ArrowLeft size={17} />
            All Events
          </Link>

          <span className="amh-event-details-category">
            Hospital Event
          </span>

          <h1>{event.title}</h1>

          <div className="amh-event-hero-meta">
            <span>
              <CalendarDays size={17} />
              {formatDate(event.start_date)}
            </span>

            <span>
              <MapPin size={17} />
              {event.location}
            </span>
          </div>
        </div>
      </section>

      {/* EVENT CONTENT */}
      <section className="amh-event-details-content">
        <div className="amh-event-details-container">

          <div className="amh-event-details-main">

            <ScrollReveal direction="up">
              <div className="amh-event-description">
                <span className="amh-event-section-label">
                  ABOUT THIS EVENT
                </span>

                <h2>
                  About the <span>Event</span>
                </h2>

                <p>{event.description}</p>
              </div>
            </ScrollReveal>

            {event.guest_information && (
              <ScrollReveal direction="up" delay={0.1}>
                <div className="amh-event-guests">
                  <div className="amh-event-guests-icon">
                    <CalendarCheck size={25} />
                  </div>

                  <div>
                    <h3>Guest Information</h3>
                    <p>{event.guest_information}</p>
                  </div>
                </div>
              </ScrollReveal>
            )}

          </div>

          {/* EVENT INFORMATION */}
          <ScrollReveal direction="up" delay={0.15}>
            <aside className="amh-event-info-card">
              <h3>Event Information</h3>

              <div className="amh-event-info-item">
                <div className="amh-event-info-icon">
                  <CalendarDays size={20} />
                </div>

                <div>
                  <span>Event Date</span>
                  <strong>{formatDate(event.start_date)}</strong>
                </div>
              </div>

              <div className="amh-event-info-item">
                <div className="amh-event-info-icon">
                  <Clock3 size={20} />
                </div>

                <div>
                  <span>Starting Time</span>
                  <strong>{formatTime(event.start_date) || "To be announced"}</strong>
                </div>
              </div>

              {event.end_date && (
                <div className="amh-event-info-item">
                  <div className="amh-event-info-icon">
                    <CalendarCheck size={20} />
                  </div>

                  <div>
                    <span>Ending</span>
                    <strong>
                      {formatDate(event.end_date)}
                      <br />
                      {formatTime(event.end_date)}
                    </strong>
                  </div>
                </div>
              )}

              <div className="amh-event-info-item">
                <div className="amh-event-info-icon">
                  <MapPin size={20} />
                </div>

                <div>
                  <span>Location</span>
                  <strong>{event.location}</strong>
                </div>
              </div>

              <Link to="/events" className="amh-event-all-button">
                Explore Other Events
                <ArrowUpRight size={18} />
              </Link>
            </aside>
          </ScrollReveal>

        </div>
      </section>

    </main>
  );
};

export default EventDetails;
