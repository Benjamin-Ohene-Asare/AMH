
import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  Send,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import ScrollReveal from "../../components/ScrollReveal";
import { submitContactMessage } from "../../api/api";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (submitError) {
      setSubmitError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      await submitContactMessage({
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      setSubmitted(true);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      const responseData = error.response?.data;

      let errorMessage =
        "We couldn't send your message. Please try again.";

      if (!error.response) {
        errorMessage =
          "Unable to connect to the hospital server. Please check your internet connection and try again.";
      } else if (responseData?.detail) {
        errorMessage = responseData.detail;
      } else if (responseData && typeof responseData === "object") {
        const firstError = Object.values(responseData).flat()[0];

        if (typeof firstError === "string") {
          errorMessage = firstError;
        }
      }

      setSubmitError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSendAnother = () => {
    setSubmitted(false);
    setSubmitError("");
  };

  return (
    <main className="amh-contact-page">

      {/* HERO */}
      <section className="amh-contact-hero">
        <div className="amh-contact-hero-content">
          <span className="amh-contact-breadcrumb">
            <a href="/">Home</a> / Contact Us
          </span>

          <h1>Contact Us</h1>

          <p>
            We're here to listen, assist and help you access the care you need.
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="amh-contact-section">
        <div className="amh-contact-container">

          {/* LEFT INFORMATION */}
          <ScrollReveal direction="left">
            <div className="amh-contact-information">

              <span className="amh-contact-label">GET IN TOUCH</span>

              <h2>
                We'd love to
                <br />
                <span>hear from you.</span>
              </h2>

              <p className="amh-contact-intro">
                Have a question or need assistance? Reach out to
                Ahmadiyya Muslim Hospital. Our team is ready to help.
              </p>

              <div className="amh-contact-details">

                <div className="amh-contact-detail">
                  <div className="amh-contact-detail-icon">
                    <MapPin size={21} />
                  </div>

                  <div>
                    <h3>Our Location</h3>
                    <p>
                      Western Region – Wassa East District
                      <br />
                      Daboase, near the cemetery
                    </p>
                  </div>
                </div>

                <div className="amh-contact-detail">
                  <div className="amh-contact-detail-icon">
                    <Phone size={21} />
                  </div>

                  <div>
                    <h3>Telephone</h3>
                    <a href="tel:0206301219">0206-301-219</a>
                  </div>
                </div>

                <div className="amh-contact-detail amh-contact-emergency">
                  <div className="amh-contact-detail-icon">
                    <Phone size={21} />
                  </div>

                  <div>
                    <h3>Emergency Telephone</h3>
                    <a href="tel:0542663331">0542-663-331</a>
                  </div>
                </div>

                <div className="amh-contact-detail">
                  <div className="amh-contact-detail-icon">
                    <Mail size={21} />
                  </div>

                  <div>
                    <h3>Email Address</h3>
                    <a href="mailto:ahmadiyyahospital.daboase@gmail.com">
                      ahmadiyyahospital.daboase@gmail.com
                    </a>
                  </div>
                </div>

              </div>

              <div className="amh-contact-emergency-note">
                <div className="amh-contact-emergency-note-icon">
                  <MessageCircle size={20} />
                </div>

                <div>
                  <strong>Need urgent assistance?</strong>
                  <p>
                    For emergencies, contact our emergency telephone number.
                  </p>
                </div>
              </div>

            </div>
          </ScrollReveal>

          {/* RIGHT CONTACT FORM */}
          <ScrollReveal direction="right" delay={0.15}>
            <div className="amh-contact-form-wrapper">

              <div className="amh-contact-form-heading">
                <div className="amh-contact-form-icon">
                  <Send size={22} />
                </div>

                <div>
                  <h2>Send us a message</h2>
                  <p>Complete the form below and get in touch with us.</p>
                </div>
              </div>

              {submitted ? (
                <div className="amh-contact-success" role="status">
                  <div className="amh-contact-success-icon">
                    <CheckCircle2 size={30} />
                  </div>

                  <h3>Thank you for reaching out!</h3>

                  <p>
                    Your message has been successfully sent to Ahmadiyya
                    Muslim Hospital. Thank you for contacting us.
                  </p>

                  <button
                    type="button"
                    onClick={handleSendAnother}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  className="amh-contact-form"
                  onSubmit={handleSubmit}
                >

                  {submitError && (
                    <div
                      className="amh-contact-error"
                      role="alert"
                    >
                      <AlertCircle size={18} />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="amh-contact-form-row">

                    <div className="amh-contact-field">
                      <label htmlFor="firstName">First Name *</label>

                      <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        placeholder="Enter first name"
                        value={formData.firstName}
                        onChange={handleChange}
                        autoComplete="given-name"
                        maxLength={100}
                        required
                        disabled={submitting}
                      />
                    </div>

                    <div className="amh-contact-field">
                      <label htmlFor="lastName">Last Name *</label>

                      <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        placeholder="Enter last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        autoComplete="family-name"
                        maxLength={100}
                        required
                        disabled={submitting}
                      />
                    </div>

                  </div>

                  <div className="amh-contact-field">
                    <label htmlFor="email">Email Address *</label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      maxLength={254}
                      required
                      disabled={submitting}
                    />
                  </div>

                  <div className="amh-contact-field">
                    <label htmlFor="subject">Subject</label>

                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      placeholder="What is your message about?"
                      value={formData.subject}
                      onChange={handleChange}
                      maxLength={200}
                      disabled={submitting}
                    />
                  </div>

                  <div className="amh-contact-field">
                    <label htmlFor="message">Message *</label>

                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={submitting}
                    />
                  </div>

                  <button
                    type="submit"
                    className="amh-contact-submit"
                    disabled={submitting}
                  >
                    <span>
                      {submitting ? "Sending Message..." : "Submit Message"}
                    </span>

                    <ArrowUpRight size={19} />
                  </button>

                  <p className="amh-contact-form-note">
                    Please do not include sensitive medical or personal
                    information in this general enquiry form.
                  </p>

                </form>
              )}

            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* MAP */}
      <section className="amh-contact-map-section">
        <div className="amh-contact-map-heading">
          <ScrollReveal direction="up">
            <span>FIND YOUR WAY TO US</span>

            <h2>Our Location</h2>

            <p>
              Find Ahmadiyya Muslim Hospital, Daboase, on the map.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="up" delay={0.1}>
          <div className="amh-contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.7505901416803!2d-1.6615487250177026!3d5.143801394833526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdd8f4a551970ad%3A0x3436f0de3126e681!2sAhmadiyya%20Muslim%20Hospital!5e0!3m2!1sen!2sgh!4v1795082175306!5m2!1sen!2sgh"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Ahmadiyya Muslim Hospital location map"
            />
          </div>
        </ScrollReveal>
      </section>

    </main>
  );
};

export default Contact;
