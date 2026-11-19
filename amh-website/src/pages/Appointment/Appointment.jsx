
import React, { useState } from "react";
import {
  CalendarDays,
  Clock3,
  UserRound,
  Phone,
  Mail,
  ClipboardList,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

import ScrollReveal from "../../components/ScrollReveal";
import bookingImage from "../../assets/book.jpg";
import "./Appointment.css";

const sanitizeText = (value, maxLength) =>
  value
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);

const initialForm = {
  fullName: "",
  phone: "",
  email: "",
  department: "",
  appointmentDate: "",
  preferredTime: "",
  reason: "",
  website: "",
};

const Appointment = () => {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const today = new Date().toLocaleDateString("en-CA");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setStatus({ type: "", message: "" });
  };

  const validateForm = (data) => {
    const newErrors = {};

    if (!data.fullName || data.fullName.length < 2) {
      newErrors.fullName = "Please enter your full name.";
    } else if (!/^[\p{L}\p{M} .'-]+$/u.test(data.fullName)) {
      newErrors.fullName = "Please enter a valid name.";
    }

    const normalizedPhone = data.phone.replace(/[\s()-]/g, "");

    if (!normalizedPhone) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^(?:\+233|0)\d{9}$/.test(normalizedPhone)) {
      newErrors.phone = "Enter a valid Ghanaian phone number.";
    }

    if (
      data.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!data.department || data.department.length < 2) {
      newErrors.department = "Please enter your preferred department.";
    }

    if (!data.appointmentDate) {
      newErrors.appointmentDate = "Please select an appointment date.";
    } else if (data.appointmentDate < today) {
      newErrors.appointmentDate = "Please select today or a future date.";
    }

    if (!data.preferredTime) {
      newErrors.preferredTime = "Please select your preferred time.";
    }

    if (!data.reason || data.reason.length < 5) {
      newErrors.reason = "Please provide a little more information.";
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.website.trim() !== "") return;

    const sanitizedData = {
      fullName: sanitizeText(formData.fullName, 100),
      phone: formData.phone.replace(/[^\d+]/g, "").slice(0, 13),
      email: sanitizeText(formData.email, 120).toLowerCase(),
      department: sanitizeText(formData.department, 100),
      appointmentDate: formData.appointmentDate,
      preferredTime: formData.preferredTime,
      reason: sanitizeText(formData.reason, 1000),
    };

    const validationErrors = validateForm(sanitizedData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({
        type: "error",
        message: "Please review the highlighted fields and try again.",
      });
      return;
    }

    setErrors({});
    setStatus({
      type: "info",
      message:
        "Your details passed the frontend checks. Online appointment submission is not yet connected. Please contact the hospital directly to arrange your appointment.",
    });
  };

  return (
    <main className="amh-booking-page">

      {/* Page heading */}
      <section className="amh-booking-hero">
        <div className="amh-booking-container">
          <ScrollReveal direction="up">
            <h1>Book an Appointment</h1>
            <p>
              Taking the first step towards better health starts here.
              Tell us how we can assist you.
            </p>

            <nav className="amh-booking-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>Appointment</span>
            </nav>
          </ScrollReveal>
        </div>
      </section>

      {/* Booking content */}
      <section className="amh-booking-section">
        <div className="amh-booking-container">

          <div className="amh-booking-intro">
            <ScrollReveal direction="up">
              <span className="amh-booking-eyebrow">
                APPOINTMENT REQUEST
              </span>

              <h2>Let's Get You the Care You Need</h2>

              <p>
                Complete the form with your details and preferred
                appointment information.
              </p>
            </ScrollReveal>
          </div>

          <div className="amh-booking-layout">

            {/* Consultation image */}
            <ScrollReveal
              direction="left"
              className="amh-booking-image-column"
            >
              <aside className="amh-booking-image-panel">
                <img
                  src={bookingImage}
                  alt="A doctor consulting with a patient"
                  className="amh-booking-photo"
                />

                <div className="amh-booking-image-shade">
                  <div className="amh-booking-image-copy">
                    <span>YOUR HEALTH, OUR PRIORITY</span>

                    <h2>
                      Compassionate Care.
                      <br />
                      Better Health.
                    </h2>

                    <p>
                      Your journey to better health starts here.
                      Schedule a consultation with our healthcare team.
                    </p>
                  </div>

                  <div className="amh-booking-image-note">
                    <div className="amh-booking-image-note-icon">
                      <ShieldCheck size={22} />
                    </div>

                    <div>
                      <strong>Care you can trust</strong>
                      <span>We are committed to your wellbeing.</span>
                    </div>
                  </div>
                </div>
              </aside>
            </ScrollReveal>

            {/* Booking form */}
            <ScrollReveal
              direction="right"
              className="amh-booking-form-column"
            >
              <div className="amh-booking-card">

                <div className="amh-booking-card-heading">
                  <div className="amh-booking-card-icon">
                    <CalendarDays size={23} />
                  </div>

                  <div>
                    <h3>Appointment Details</h3>
                    <p>Please provide your information below.</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="amh-booking-fields">

                    {/* Full name */}
                    <div className="amh-booking-field amh-booking-field--full">
                      <label htmlFor="fullName">
                        Full Name <span>*</span>
                      </label>

                      <div className="amh-booking-input">
                        <UserRound size={18} />
                        <input
                          id="fullName"
                          type="text"
                          name="fullName"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={handleChange}
                          maxLength={100}
                          autoComplete="name"
                          aria-invalid={Boolean(errors.fullName)}
                          required
                        />
                      </div>

                      {errors.fullName && (
                        <small className="amh-booking-error">
                          {errors.fullName}
                        </small>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="amh-booking-field">
                      <label htmlFor="phone">
                        Phone Number <span>*</span>
                      </label>

                      <div className="amh-booking-input">
                        <Phone size={18} />
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          placeholder="e.g. 0241234567"
                          value={formData.phone}
                          onChange={handleChange}
                          maxLength={16}
                          autoComplete="tel"
                          aria-invalid={Boolean(errors.phone)}
                          required
                        />
                      </div>

                      {errors.phone && (
                        <small className="amh-booking-error">
                          {errors.phone}
                        </small>
                      )}
                    </div>

                    {/* Email */}
                    <div className="amh-booking-field">
                      <label htmlFor="email">
                        Email Address
                        <span className="amh-booking-optional"> (Optional)</span>
                      </label>

                      <div className="amh-booking-input">
                        <Mail size={18} />
                        <input
                          id="email"
                          type="email"
                          name="email"
                          placeholder="example@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          maxLength={120}
                          autoComplete="email"
                          aria-invalid={Boolean(errors.email)}
                        />
                      </div>

                      {errors.email && (
                        <small className="amh-booking-error">
                          {errors.email}
                        </small>
                      )}
                    </div>

                    {/* Department */}
                    <div className="amh-booking-field amh-booking-field--full">
                      <label htmlFor="department">
                        Preferred Department <span>*</span>
                      </label>

                      <div className="amh-booking-input">
                        <ClipboardList size={18} />
                        <input
                          id="department"
                          type="text"
                          name="department"
                          placeholder="Enter your preferred department"
                          value={formData.department}
                          onChange={handleChange}
                          maxLength={100}
                          aria-invalid={Boolean(errors.department)}
                          required
                        />
                      </div>

                      {errors.department && (
                        <small className="amh-booking-error">
                          {errors.department}
                        </small>
                      )}
                    </div>

                    {/* Date */}
                    <div className="amh-booking-field">
                      <label htmlFor="appointmentDate">
                        Preferred Date <span>*</span>
                      </label>

                      <div className="amh-booking-input">
                        <CalendarDays size={18} />
                        <input
                          id="appointmentDate"
                          type="date"
                          name="appointmentDate"
                          min={today}
                          value={formData.appointmentDate}
                          onChange={handleChange}
                          aria-invalid={Boolean(errors.appointmentDate)}
                          required
                        />
                      </div>

                      {errors.appointmentDate && (
                        <small className="amh-booking-error">
                          {errors.appointmentDate}
                        </small>
                      )}
                    </div>

                    {/* Preferred time */}
                    <div className="amh-booking-field">
                      <label htmlFor="preferredTime">
                        Preferred Time <span>*</span>
                      </label>

                      <div className="amh-booking-input">
                        <Clock3 size={18} />
                        <select
                          id="preferredTime"
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleChange}
                          aria-invalid={Boolean(errors.preferredTime)}
                          required
                        >
                          <option value="">Select preferred time</option>
                          <option value="Morning">Morning</option>
                          <option value="Afternoon">Afternoon</option>
                          <option value="Any available time">
                            Any available time
                          </option>
                        </select>
                      </div>

                      {errors.preferredTime && (
                        <small className="amh-booking-error">
                          {errors.preferredTime}
                        </small>
                      )}
                    </div>

                    {/* Reason */}
                    <div className="amh-booking-field amh-booking-field--full">
                      <label htmlFor="reason">
                        Reason for Appointment <span>*</span>
                      </label>

                      <textarea
                        id="reason"
                        name="reason"
                        placeholder="Briefly describe the reason for your appointment..."
                        value={formData.reason}
                        onChange={handleChange}
                        maxLength={1000}
                        rows={4}
                        aria-invalid={Boolean(errors.reason)}
                        required
                      />

                      <div className="amh-booking-character-count">
                        {formData.reason.length}/1000 characters
                      </div>

                      {errors.reason && (
                        <small className="amh-booking-error">
                          {errors.reason}
                        </small>
                      )}
                    </div>

                    {/* Honeypot */}
                    <div className="amh-booking-trap" aria-hidden="true">
                      <label htmlFor="website">Leave this field empty</label>
                      <input
                        id="website"
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        tabIndex="-1"
                        autoComplete="off"
                      />
                    </div>

                  </div>

                  {/* Form feedback */}
                  {status.message && (
                    <div
                      className={`amh-booking-feedback amh-booking-feedback--${status.type}`}
                      role="status"
                      aria-live="polite"
                    >
                      {status.type === "error" ? (
                        <AlertCircle size={19} />
                      ) : (
                        <CheckCircle2 size={19} />
                      )}
                      <p>{status.message}</p>
                    </div>
                  )}

                  <button type="submit" className="amh-booking-submit">
                    Validate Appointment Request
                    <ArrowRight size={18} />
                  </button>

                  <div className="amh-booking-disclaimer">
                    <ShieldCheck size={17} />
                    <p>
                      This form currently checks your information in your
                      browser. It is not connected to the hospital's booking
                      system, and submitting it does not confirm an appointment.
                    </p>
                  </div>
                </form>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact information */}
          <div className="amh-booking-contact">
            <MapPin size={19} />
            <p>
              Need assistance? Contact the hospital on{" "}
              <a href="tel:0206301219">0206-301-219</a>.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Appointment;
