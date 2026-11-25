
import React, { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
  RefreshCw,
  XCircle,
  Plus,
  X,
  Eye,
  Pencil,
  Trash2,
  MapPin,
  Clock3,
  ImagePlus,
  CalendarCheck,
  Globe,
  EyeOff,
  Mail,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import {
  getAdminEvents,
  createAdminEvent,
  updateAdminEvent,
  deleteAdminEvent,
  logoutUser,
} from "../../../api/api";

import "./AdminEvents.css";

const emptyForm = {
  title: "",
  description: "",
  location: "",
  start_date: "",
  end_date: "",
  guest_information: "",
  image: null,
  is_published: false,
};

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminEvents();

      setEvents(
        Array.isArray(data) ? data : data.results || []
      );
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Unable to load hospital events. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      window.location.href = "/login";
    }
  };

  // Admin navigation
  const navigation = [
    {
      label: "OVERVIEW",
      items: [
        {
          name: "Dashboard",
          icon: LayoutDashboard,
          path: "/admin/dashboard",
        },
      ],
    },
    {
      label: "MANAGEMENT",
      items: [
        {
          name: "Appointments",
          icon: CalendarDays,
          path: "/admin/appointments",
        },
        {
          name: "Contact Messages",
          icon: Mail,
          path: "/admin/contact-messages",
        },
        {
          name: "Events",
          icon: ClipboardList,
          path: "/admin/events",
        },
      ],
    },
  ];

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = [
        event.title,
        event.location,
        event.description,
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "published" && event.is_published) ||
        (statusFilter === "draft" && !event.is_published);

      return matchesSearch && matchesStatus;
    });
  }, [events, searchTerm, statusFilter]);

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toDateTimeLocal = (date) => {
    if (!date) return "";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) return "";

    const localDate = new Date(
      parsed.getTime() - parsed.getTimezoneOffset() * 60000
    );

    return localDate.toISOString().slice(0, 16);
  };

  const openCreateForm = () => {
    setEditingEvent(null);
    setFormData(emptyForm);
    setImagePreview("");
    setFormError("");
    setShowForm(true);
  };

  const openEditForm = (event) => {
    setEditingEvent(event);

    setFormData({
      title: event.title || "",
      description: event.description || "",
      location: event.location || "",
      start_date: toDateTimeLocal(event.start_date),
      end_date: toDateTimeLocal(event.end_date),
      guest_information: event.guest_information || "",
      image: null,
      is_published: event.is_published,
    });

    setImagePreview(event.image || "");
    setFormError("");
    setShowForm(true);
    setSelectedEvent(null);
  };

  const closeForm = () => {
    if (saving) return;

    setShowForm(false);
    setEditingEvent(null);
    setFormData(emptyForm);
    setImagePreview("");
    setFormError("");
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFormData((previous) => ({
      ...previous,
      image: file,
    }));

    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError("");

    if (!editingEvent && !formData.image) {
      setFormError("Please select an event cover image.");
      return;
    }

    if (
      formData.end_date &&
      new Date(formData.end_date) < new Date(formData.start_date)
    ) {
      setFormError("The event end date cannot be earlier than its start date.");
      return;
    }

    try {
      setSaving(true);

      const payload = new FormData();

      payload.append("title", formData.title.trim());
      payload.append("description", formData.description);
      payload.append("location", formData.location.trim());

      payload.append(
        "start_date",
        new Date(formData.start_date).toISOString()
      );

      payload.append(
        "end_date",
        formData.end_date
          ? new Date(formData.end_date).toISOString()
          : ""
      );

      payload.append(
        "guest_information",
        formData.guest_information
      );

      payload.append(
        "is_published",
        formData.is_published ? "true" : "false"
      );

      if (formData.image) {
        payload.append("image", formData.image);
      }

      if (editingEvent) {
        await updateAdminEvent(editingEvent.id, payload);
      } else {
        await createAdminEvent(payload);
      }

      closeForm();
      await loadEvents();
    } catch (err) {
      const responseData = err.response?.data;

      if (responseData && typeof responseData === "object") {
        const firstError = Object.values(responseData).flat()[0];

        setFormError(
          typeof firstError === "string"
            ? firstError
            : "Unable to save the event. Please check your information."
        );
      } else {
        setFormError("Unable to save the event. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (event) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${event.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      await deleteAdminEvent(event.id);

      setSelectedEvent(null);
      await loadEvents();
    } catch (err) {
      window.alert(
        err.response?.data?.detail ||
        "Unable to delete this event. Please try again."
      );
    }
  };

  const togglePublish = async (event) => {
    const payload = new FormData();

    payload.append(
      "is_published",
      event.is_published ? "false" : "true"
    );

    try {
      await updateAdminEvent(event.id, payload);
      await loadEvents();
    } catch (err) {
      window.alert(
        err.response?.data?.detail ||
        "Unable to update the event publication status."
      );
    }
  };

  return (
    <div className="amh-admin">

      {sidebarOpen && (
        <div
          className="admin-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`admin-sidebar ${
          sidebarOpen ? "sidebar-open" : ""
        }`}
      >
        <div className="admin-brand">
          <div className="admin-brand-icon">A</div>

          <div>
            <h2>AMH</h2>
            <span>Hospital Administration</span>
          </div>
        </div>

        <div className="admin-sidebar-label">MAIN MENU</div>

        <nav className="admin-navigation">
          {navigation.map((section) => (
            <div className="admin-nav-section" key={section.label}>
              <p className="admin-nav-heading">{section.label}</p>

              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    end={item.path === "/admin/dashboard"}
                    className={({ isActive }) =>
                      `admin-nav-link ${isActive ? "active" : ""}`
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon size={19} strokeWidth={1.8} />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <button className="admin-nav-link admin-settings">
            <Settings size={19} />
            <span>Settings</span>
          </button>

          <button className="admin-logout" onClick={handleLogout}>
            <LogOut size={19} />
            <span>Sign Out</span>
          </button>

          <div className="admin-sidebar-footer">
            <span>Ahmadiyya Muslim Hospital</span>
            <small>Administration Portal</small>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <main className="admin-main">

        {/* Topbar */}
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              className="admin-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={22} />
            </button>

            <div>
              <h1>Events</h1>
              <p>Manage hospital events and public announcements.</p>
            </div>
          </div>

          <div className="admin-topbar-actions">
            <button
              className="admin-icon-button"
              title="Refresh events"
              onClick={loadEvents}
            >
              <RefreshCw size={19} />
            </button>

            <button className="admin-icon-button" title="Notifications">
              <Bell size={19} />
            </button>

            <div className="admin-profile">
              <div className="admin-profile-avatar">A</div>

              <div className="admin-profile-info">
                <strong>Administrator</strong>
                <span>Hospital Admin</span>
              </div>
            </div>
          </div>
        </header>

        <div className="admin-content">

          {/* Page heading */}
          <div className="admin-page-heading">
            <div>
              <h2>Event Management</h2>
              <p>Create, update and manage hospital events.</p>
            </div>

            <button
              className="events-add-button"
              onClick={openCreateForm}
            >
              <Plus size={18} />
              Add New Event
            </button>
          </div>

          {/* Summary */}
          <section className="events-summary">
            <div className="events-summary-card">
              <div className="events-summary-icon total">
                <CalendarDays size={21} />
              </div>
              <div>
                <span>Total Events</span>
                <strong>{events.length}</strong>
              </div>
            </div>

            <div className="events-summary-card">
              <div className="events-summary-icon published">
                <Globe size={21} />
              </div>
              <div>
                <span>Published</span>
                <strong>
                  {events.filter((event) => event.is_published).length}
                </strong>
              </div>
            </div>

            <div className="events-summary-card">
              <div className="events-summary-icon drafts">
                <EyeOff size={21} />
              </div>
              <div>
                <span>Drafts</span>
                <strong>
                  {events.filter((event) => !event.is_published).length}
                </strong>
              </div>
            </div>
          </section>

          {/* Events panel */}
          <section className="admin-panel events-panel">

            <div className="events-panel-heading">
              <div>
                <h3>Hospital Events</h3>
                <p>All events created for the hospital website.</p>
              </div>

              <span className="events-record-count">
                {filteredEvents.length} Records
              </span>
            </div>

            {/* Toolbar */}
            <div className="events-toolbar">
              <div className="events-search">
                <Search size={18} />

                <input
                  type="text"
                  placeholder="Search event title or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Events</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
              </select>

              <button
                className="events-refresh-button"
                onClick={loadEvents}
                disabled={loading}
              >
                <RefreshCw size={16} />
                Refresh
              </button>
            </div>

            {error && (
              <div className="admin-error">
                <XCircle size={20} />

                <div>
                  <strong>Unable to load events</strong>
                  <p>{error}</p>
                </div>

                <button onClick={loadEvents}>Try again</button>
              </div>
            )}

            {/* Event table */}
            <div className="events-table-wrapper">
              <table className="events-table">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Location</th>
                    <th>Event Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="events-table-message">
                        <RefreshCw
                          size={20}
                          className="appointment-spin"
                        />
                        <span>Loading hospital events...</span>
                      </td>
                    </tr>
                  ) : filteredEvents.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="events-table-message">
                        <CalendarDays size={26} />
                        <span>
                          {events.length === 0
                            ? "No events have been created yet."
                            : "No events match your search."}
                        </span>
                      </td>
                    </tr>
                  ) : (
                    filteredEvents.map((event) => (
                      <tr key={event.id}>
                        <td>
                          <div className="events-table-event">
                            {event.image ? (
                              <img
                                src={event.image}
                                alt={event.title}
                              />
                            ) : (
                              <div className="events-image-placeholder">
                                <ImagePlus size={21} />
                              </div>
                            )}

                            <div>
                              <strong>{event.title}</strong>
                              <span>
                                Created {formatDate(event.created_at)}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span className="events-location">
                            <MapPin size={15} />
                            {event.location || "Not specified"}
                          </span>
                        </td>

                        <td>{formatDate(event.start_date)}</td>

                        <td>
                          <span
                            className={`events-status ${
                              event.is_published
                                ? "published"
                                : "draft"
                            }`}
                          >
                            {event.is_published
                              ? "Published"
                              : "Draft"}
                          </span>
                        </td>

                        <td>
                          <div className="events-actions">
                            <button
                              title="View event"
                              onClick={() => setSelectedEvent(event)}
                            >
                              <Eye size={17} />
                            </button>

                            <button
                              title="Edit event"
                              onClick={() => openEditForm(event)}
                            >
                              <Pencil size={17} />
                            </button>

                            <button
                              title={
                                event.is_published
                                  ? "Unpublish event"
                                  : "Publish event"
                              }
                              onClick={() => togglePublish(event)}
                            >
                              {event.is_published ? (
                                <EyeOff size={17} />
                              ) : (
                                <Globe size={17} />
                              )}
                            </button>

                            <button
                              className="delete"
                              title="Delete event"
                              onClick={() => handleDelete(event)}
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <footer className="admin-content-footer">
            <span>
              © {new Date().getFullYear()} Ahmadiyya Muslim Hospital
            </span>
            <span>Administration Portal</span>
          </footer>
        </div>
      </main>

      {/* Create / Edit Event Modal */}
      {showForm && (
        <div className="events-modal-overlay">
          <div className="events-form-modal">

            <div className="events-modal-heading">
              <div>
                <h3>
                  {editingEvent ? "Edit Event" : "Create New Event"}
                </h3>
                <p>
                  Add the information that will appear on the hospital website.
                </p>
              </div>

              <button
                onClick={closeForm}
                disabled={saving}
                aria-label="Close form"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="events-form-body">

                <div className="events-form-group">
                  <label>Event Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. World Oral Health Day"
                    required
                  />
                </div>

                <div className="events-form-group">
                  <label>Event Cover Image *</label>

                  <label className="events-image-upload">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Event preview" />
                    ) : (
                      <div className="events-upload-placeholder">
                        <ImagePlus size={30} />
                        <strong>Choose an event image</strong>
                        <span>Click to upload a cover image</span>
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

                <div className="events-form-group">
                  <label>Event Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the event and what participants should expect..."
                    rows="5"
                    required
                  />
                </div>

                <div className="events-form-group">
                  <label>Event Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Ahmadiyya Muslim Hospital, Daboase"
                    required
                  />
                </div>

                <div className="events-form-grid">
                  <div className="events-form-group">
                    <label>Start Date & Time *</label>
                    <input
                      type="datetime-local"
                      name="start_date"
                      value={formData.start_date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="events-form-group">
                    <label>End Date & Time</label>
                    <input
                      type="datetime-local"
                      name="end_date"
                      value={formData.end_date}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="events-form-group">
                  <label>Guest / Speaker Information</label>
                  <textarea
                    name="guest_information"
                    value={formData.guest_information}
                    onChange={handleInputChange}
                    placeholder="Add guest speakers, facilitators or other relevant information..."
                    rows="3"
                  />
                </div>

                <label className="events-publish-option">
                  <input
                    type="checkbox"
                    name="is_published"
                    checked={formData.is_published}
                    onChange={handleInputChange}
                  />

                  <span>
                    <strong>Publish this event</strong>
                    <small>
                      Make this event visible on the public hospital website.
                    </small>
                  </span>
                </label>

                {formError && (
                  <div className="events-form-error">
                    <XCircle size={18} />
                    <span>{formError}</span>
                  </div>
                )}
              </div>

              <div className="events-form-footer">
                <button
                  type="button"
                  className="events-cancel-button"
                  onClick={closeForm}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="events-save-button"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <RefreshCw size={16} className="appointment-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <CalendarCheck size={17} />
                      {editingEvent ? "Save Changes" : "Create Event"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <div
          className="events-modal-overlay"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="events-details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="events-modal-heading">
              <div>
                <h3>Event Details</h3>
                <p>Hospital event information</p>
              </div>

              <button
                onClick={() => setSelectedEvent(null)}
                aria-label="Close event details"
              >
                <X size={21} />
              </button>
            </div>

            {selectedEvent.image && (
              <img
                className="events-details-image"
                src={selectedEvent.image}
                alt={selectedEvent.title}
              />
            )}

            <div className="events-details-body">
              <div className="events-details-title">
                <h2>{selectedEvent.title}</h2>

                <span
                  className={`events-status ${
                    selectedEvent.is_published
                      ? "published"
                      : "draft"
                  }`}
                >
                  {selectedEvent.is_published
                    ? "Published"
                    : "Draft"}
                </span>
              </div>

              <div className="events-detail-item">
                <CalendarDays size={18} />
                <div>
                  <span>Starts</span>
                  <strong>
                    {formatDateTime(selectedEvent.start_date)}
                  </strong>
                </div>
              </div>

              {selectedEvent.end_date && (
                <div className="events-detail-item">
                  <Clock3 size={18} />
                  <div>
                    <span>Ends</span>
                    <strong>
                      {formatDateTime(selectedEvent.end_date)}
                    </strong>
                  </div>
                </div>
              )}

              <div className="events-detail-item">
                <MapPin size={18} />
                <div>
                  <span>Location</span>
                  <strong>{selectedEvent.location}</strong>
                </div>
              </div>

              <div className="events-detail-description">
                <h4>Event Description</h4>
                <p>{selectedEvent.description}</p>
              </div>

              {selectedEvent.guest_information && (
                <div className="events-detail-description">
                  <h4>Guest / Speaker Information</h4>
                  <p>{selectedEvent.guest_information}</p>
                </div>
              )}
            </div>

            <div className="events-details-footer">
              <button
                className="events-cancel-button"
                onClick={() => setSelectedEvent(null)}
              >
                Close
              </button>

              <button
                className="events-save-button"
                onClick={() => openEditForm(selectedEvent)}
              >
                <Pencil size={16} />
                Edit Event
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminEvents;
