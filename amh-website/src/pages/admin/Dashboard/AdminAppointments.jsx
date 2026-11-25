
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
  Clock3,
  CheckCircle2,
  CircleCheck,
  X,
  Eye,
  Check,
  Ban,
  Mail,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import {
  getAdminAppointments,
  updateAppointmentStatus,
  logoutUser,
} from "../../../api/api";

import "./AdminAppointments.css";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Load appointments
  const loadAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminAppointments();

      setAppointments(
        Array.isArray(data) ? data : data.results || []
      );
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Unable to load appointments. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  // Update appointment status
  const handleStatusUpdate = async (appointment, newStatus) => {
    const actionMessages = {
      confirmed: "confirm this appointment",
      cancelled: "cancel this appointment",
      completed: "mark this appointment as completed",
    };

    const confirmed = window.confirm(
      `Are you sure you want to ${actionMessages[newStatus]}?`
    );

    if (!confirmed) return;

    try {
      setUpdatingId(appointment.id);
      setActionError("");
      setSuccessMessage("");

      const updatedAppointment = await updateAppointmentStatus(
        appointment.id,
        newStatus
      );

      setAppointments((previous) =>
        previous.map((item) =>
          item.id === appointment.id
            ? { ...item, ...updatedAppointment }
            : item
        )
      );

      setSelectedAppointment((previous) =>
        previous?.id === appointment.id
          ? { ...previous, ...updatedAppointment }
          : previous
      );

      setSuccessMessage(
        `Appointment successfully ${newStatus}.`
      );
    } catch (err) {
      setActionError(
        err.response?.data?.status?.[0] ||
        err.response?.data?.detail ||
        "Unable to update appointment status. Please try again."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      window.location.href = "/login";
    }
  };

  // Navigation
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

        /*
        {
          name: "Community",
          icon: Users,
          path: "/community/dashboard",
        },
        */
      ],
    },
  ];

  // Search and filter
  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesSearch = [
        appointment.full_name,
        appointment.phone,
        appointment.department,
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        appointment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [appointments, searchTerm, statusFilter]);

  // Format date
  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-GB",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  // Status icons
  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock3 size={14} />;
      case "confirmed":
        return <CheckCircle2 size={14} />;
      case "completed":
        return <CircleCheck size={14} />;
      case "cancelled":
        return <XCircle size={14} />;
      default:
        return null;
    }
  };

  const formatStatus = (status) => {
    if (!status) return "Unknown";

    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Appointment action buttons
  const renderStatusActions = (appointment) => {
    const isUpdating = updatingId === appointment.id;

    return (
      <div className="appointment-status-actions">
        {appointment.status === "pending" && (
          <>
            <button
              className="appointment-action-confirm"
              onClick={() =>
                handleStatusUpdate(appointment, "confirmed")
              }
              disabled={isUpdating}
            >
              <Check size={16} />
              Confirm
            </button>

            <button
              className="appointment-action-cancel"
              onClick={() =>
                handleStatusUpdate(appointment, "cancelled")
              }
              disabled={isUpdating}
            >
              <Ban size={16} />
              Cancel
            </button>
          </>
        )}

        {appointment.status === "confirmed" && (
          <>
            <button
              className="appointment-action-complete"
              onClick={() =>
                handleStatusUpdate(appointment, "completed")
              }
              disabled={isUpdating}
            >
              <CheckCircle2 size={16} />
              Complete
            </button>

            <button
              className="appointment-action-cancel"
              onClick={() =>
                handleStatusUpdate(appointment, "cancelled")
              }
              disabled={isUpdating}
            >
              <Ban size={16} />
              Cancel
            </button>
          </>
        )}

        {isUpdating && (
          <span className="appointment-action-loading">
            Updating...
          </span>
        )}
      </div>
    );
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

          <button
            className="admin-logout"
            onClick={handleLogout}
          >
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
              <h1>Appointments</h1>
              <p>Manage and monitor patient appointment requests.</p>
            </div>
          </div>

          <div className="admin-topbar-actions">
            <button
              className="admin-icon-button"
              title="Refresh appointments"
              onClick={loadAppointments}
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
              <h2>Appointment Management</h2>
              <p>View and keep track of patient bookings.</p>
            </div>

            <button
              className="admin-refresh-button"
              onClick={loadAppointments}
              disabled={loading}
            >
              <RefreshCw size={16} />
              Refresh Data
            </button>
          </div>

          {/* Feedback messages */}
          {successMessage && (
            <div className="appointment-action-success">
              <CheckCircle2 size={18} />
              <span>{successMessage}</span>
              <button onClick={() => setSuccessMessage("")}>
                <X size={16} />
              </button>
            </div>
          )}

          {actionError && (
            <div className="appointment-action-error">
              <XCircle size={18} />
              <span>{actionError}</span>
              <button onClick={() => setActionError("")}>
                <X size={16} />
              </button>
            </div>
          )}

          {/* Appointment summary */}
          <section className="appointment-summary">
            <div>
              <span>Total Appointments</span>
              <strong>{appointments.length}</strong>
            </div>

            <div>
              <span>Pending</span>
              <strong>
                {appointments.filter((a) => a.status === "pending").length}
              </strong>
            </div>

            <div>
              <span>Confirmed</span>
              <strong>
                {appointments.filter((a) => a.status === "confirmed").length}
              </strong>
            </div>

            <div>
              <span>Completed</span>
              <strong>
                {appointments.filter((a) => a.status === "completed").length}
              </strong>
            </div>
          </section>

          {/* Appointment table */}
          <section className="admin-panel appointments-panel">

            <div className="appointments-panel-heading">
              <div>
                <h3>Patient Appointments</h3>
                <p>All appointment requests submitted through the website.</p>
              </div>

              <span className="appointment-count">
                {filteredAppointments.length} Records
              </span>
            </div>

            {/* Search and filter */}
            <div className="appointments-toolbar">
              <div className="appointment-search">
                <Search size={18} />

                <input
                  type="text"
                  placeholder="Search patient, phone or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {error && (
              <div className="admin-error">
                <XCircle size={20} />

                <div>
                  <strong>Unable to load appointments</strong>
                  <p>{error}</p>
                </div>

                <button onClick={loadAppointments}>Try again</button>
              </div>
            )}

            <div className="appointments-table-wrapper">
              <table className="appointments-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Phone Number</th>
                    <th>Department</th>
                    <th>Appointment Date</th>
                    <th>Preferred Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="appointment-table-message">
                        <RefreshCw size={20} className="appointment-spin" />
                        <span>Loading appointments...</span>
                      </td>
                    </tr>
                  ) : filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="appointment-table-message">
                        <CalendarDays size={25} />
                        <span>
                          {appointments.length === 0
                            ? "No appointments have been received yet."
                            : "No appointments match your search."}
                        </span>
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td>
                          <strong>{appointment.full_name}</strong>
                        </td>

                        <td>{appointment.phone}</td>

                        <td>{appointment.department}</td>

                        <td>{formatDate(appointment.appointment_date)}</td>

                        <td>{appointment.preferred_time || "—"}</td>

                        <td>
                          <span
                            className={`appointment-status ${appointment.status}`}
                          >
                            {getStatusIcon(appointment.status)}
                            {formatStatus(appointment.status)}
                          </span>
                        </td>

                        <td>
                          <button
                            className="appointment-view-button"
                            title="View appointment details"
                            onClick={() => {
                              setActionError("");
                              setSelectedAppointment(appointment);
                            }}
                          >
                            <Eye size={17} />
                            View
                          </button>
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

      {/* Appointment details modal */}
      {selectedAppointment && (
        <div
          className="appointment-modal-overlay"
          onClick={() => setSelectedAppointment(null)}
        >
          <div
            className="appointment-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="appointment-modal-heading">
              <div>
                <h3>Appointment Details</h3>
                <p>Patient booking information</p>
              </div>

              <button
                onClick={() => setSelectedAppointment(null)}
                aria-label="Close appointment details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="appointment-modal-body">
              <div>
                <span>Patient Name</span>
                <strong>{selectedAppointment.full_name}</strong>
              </div>

              <div>
                <span>Phone Number</span>
                <strong>{selectedAppointment.phone}</strong>
              </div>

              <div>
                <span>Email Address</span>
                <strong>{selectedAppointment.email || "Not provided"}</strong>
              </div>

              <div>
                <span>Department</span>
                <strong>{selectedAppointment.department}</strong>
              </div>

              <div>
                <span>Appointment Date</span>
                <strong>
                  {formatDate(selectedAppointment.appointment_date)}
                </strong>
              </div>

              <div>
                <span>Preferred Time</span>
                <strong>{selectedAppointment.preferred_time || "—"}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong
                  className={`appointment-status-text ${selectedAppointment.status}`}
                >
                  {formatStatus(selectedAppointment.status)}
                </strong>
              </div>

              <div className="appointment-reason">
                <span>Reason for Appointment</span>
                <p>
                  {selectedAppointment.reason || "No reason provided."}
                </p>
              </div>
            </div>

            {/* Status management */}
            {(selectedAppointment.status === "pending" ||
              selectedAppointment.status === "confirmed") && (
              <div className="appointment-modal-actions">
                <h4>Manage Appointment</h4>

                <p>
                  {selectedAppointment.status === "pending"
                    ? "Review this request and confirm or cancel the appointment."
                    : "Update the status once the appointment has been attended."}
                </p>

                {renderStatusActions(selectedAppointment)}
              </div>
            )}

            {(selectedAppointment.status === "completed" ||
              selectedAppointment.status === "cancelled") && (
              <div className="appointment-final-status">
                <CheckCircle2 size={18} />
                <span>
                  This appointment is {selectedAppointment.status}.
                  No further status actions are available.
                </span>
              </div>
            )}

            <button
              className="appointment-modal-close"
              onClick={() => setSelectedAppointment(null)}
            >
              Close Details
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminAppointments;
