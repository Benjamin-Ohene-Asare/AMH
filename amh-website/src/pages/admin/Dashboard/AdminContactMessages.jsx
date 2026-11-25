
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
  Mail,
  MessageSquare,
  Check,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import {
  getAdminContactMessages,
  getContactMessageStats,
  updateContactMessageStatus,
  logoutUser,
} from "../../../api/api";

import "./AdminContactMessages.css";

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    read: 0,
    resolved: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Load messages and statistics
  const loadMessages = async () => {
    try {
      setLoading(true);
      setError("");

      const [messageData, statsData] = await Promise.all([
        getAdminContactMessages(),
        getContactMessageStats(),
      ]);

      setMessages(
        Array.isArray(messageData)
          ? messageData
          : messageData.results || []
      );

      setStats(statsData);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Unable to load contact messages. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  // Update message status
  const handleStatusUpdate = async (message, newStatus) => {
    const actionMessages = {
      read: "mark this message as read",
      resolved: "mark this message as resolved",
      new: "mark this message as new",
    };

    const confirmed = window.confirm(
      `Are you sure you want to ${actionMessages[newStatus]}?`
    );

    if (!confirmed) return;

    try {
      setUpdatingId(message.id);
      setActionError("");
      setSuccessMessage("");

      const updatedMessage = await updateContactMessageStatus(
        message.id,
        newStatus
      );

      setMessages((previous) =>
        previous.map((item) =>
          item.id === message.id
            ? { ...item, ...updatedMessage }
            : item
        )
      );

      setSelectedMessage((previous) =>
        previous?.id === message.id
          ? { ...previous, ...updatedMessage }
          : previous
      );

      await loadMessages();

      setSuccessMessage(
        `Message successfully marked as ${newStatus}.`
      );
    } catch (err) {
      setActionError(
        err.response?.data?.status?.[0] ||
        err.response?.data?.detail ||
        "Unable to update message status. Please try again."
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
  const filteredMessages = useMemo(() => {
    return messages.filter((message) => {
      const searchContent = [
        message.first_name,
        message.last_name,
        message.email,
        message.subject,
        message.message,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchContent.includes(
        searchTerm.toLowerCase()
      );

      const matchesStatus =
        statusFilter === "all" ||
        message.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [messages, searchTerm, statusFilter]);

  // Format date
  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Status icons
  const getStatusIcon = (status) => {
    switch (status) {
      case "new":
        return <Clock3 size={14} />;
      case "read":
        return <CheckCircle2 size={14} />;
      case "resolved":
        return <CircleCheck size={14} />;
      default:
        return null;
    }
  };

  const formatStatus = (status) => {
    if (!status) return "Unknown";

    return status.charAt(0).toUpperCase() + status.slice(1);
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
              <h1>Contact Messages</h1>
              <p>Manage enquiries received from the hospital website.</p>
            </div>
          </div>

          <div className="admin-topbar-actions">
            <button
              className="admin-icon-button"
              title="Refresh messages"
              onClick={loadMessages}
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
              <h2>Message Management</h2>
              <p>Review and respond to enquiries submitted by visitors.</p>
            </div>

            <button
              className="admin-refresh-button"
              onClick={loadMessages}
              disabled={loading}
            >
              <RefreshCw size={16} />
              Refresh Data
            </button>
          </div>

          {/* Feedback */}
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

          {/* Summary cards */}
          <section className="appointment-summary">
            <div>
              <span>Total Messages</span>
              <strong>{stats.total}</strong>
            </div>

            <div>
              <span>New Messages</span>
              <strong>{stats.new}</strong>
            </div>

            <div>
              <span>Read Messages</span>
              <strong>{stats.read}</strong>
            </div>

            <div>
              <span>Resolved</span>
              <strong>{stats.resolved}</strong>
            </div>
          </section>

          {/* Messages table */}
          <section className="admin-panel appointments-panel">

            <div className="appointments-panel-heading">
              <div>
                <h3>Website Enquiries</h3>
                <p>All messages submitted through the Contact Us form.</p>
              </div>

              <span className="appointment-count">
                {filteredMessages.length} Records
              </span>
            </div>

            {/* Search and filter */}
            <div className="appointments-toolbar">
              <div className="appointment-search">
                <Search size={18} />

                <input
                  type="text"
                  placeholder="Search name, email, subject or message..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            {error && (
              <div className="admin-error">
                <XCircle size={20} />

                <div>
                  <strong>Unable to load contact messages</strong>
                  <p>{error}</p>
                </div>

                <button onClick={loadMessages}>Try again</button>
              </div>
            )}

            <div className="appointments-table-wrapper">
              <table className="appointments-table">
                <thead>
                  <tr>
                    <th>Sender</th>
                    <th>Email Address</th>
                    <th>Subject</th>
                    <th>Date Received</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="appointment-table-message">
                        <RefreshCw size={20} className="appointment-spin" />
                        <span>Loading messages...</span>
                      </td>
                    </tr>
                  ) : filteredMessages.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="appointment-table-message">
                        <MessageSquare size={25} />
                        <span>
                          {messages.length === 0
                            ? "No contact messages have been received yet."
                            : "No messages match your search."}
                        </span>
                      </td>
                    </tr>
                  ) : (
                    filteredMessages.map((message) => (
                      <tr key={message.id}>
                        <td>
                          <strong>
                            {message.first_name} {message.last_name}
                          </strong>
                        </td>

                        <td>{message.email}</td>

                        <td>
                          {message.subject || "No subject"}
                        </td>

                        <td>{formatDate(message.created_at)}</td>

                        <td>
                          <span
                            className={`appointment-status ${message.status}`}
                          >
                            {getStatusIcon(message.status)}
                            {formatStatus(message.status)}
                          </span>
                        </td>

                        <td>
                          <button
                            className="appointment-view-button"
                            onClick={() => {
                              setActionError("");
                              setSelectedMessage(message);
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

      {/* Message details modal */}
      {selectedMessage && (
        <div
          className="appointment-modal-overlay"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="appointment-modal contact-message-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="appointment-modal-heading">
              <div>
                <h3>Contact Message</h3>
                <p>Website enquiry details</p>
              </div>

              <button
                onClick={() => setSelectedMessage(null)}
                aria-label="Close message details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="appointment-modal-body">
              <div>
                <span>Sender Name</span>
                <strong>
                  {selectedMessage.first_name} {selectedMessage.last_name}
                </strong>
              </div>

              <div>
                <span>Email Address</span>
                <strong>
                  <a href={`mailto:${selectedMessage.email}`}>
                    {selectedMessage.email}
                  </a>
                </strong>
              </div>

              <div>
                <span>Subject</span>
                <strong>
                  {selectedMessage.subject || "No subject provided"}
                </strong>
              </div>

              <div>
                <span>Date Received</span>
                <strong>{formatDate(selectedMessage.created_at)}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong
                  className={`appointment-status-text ${selectedMessage.status}`}
                >
                  {formatStatus(selectedMessage.status)}
                </strong>
              </div>

              <div className="contact-message-content">
                <span>Message</span>
                <p>{selectedMessage.message}</p>
              </div>
            </div>

            <div className="appointment-modal-actions">
              <h4>Manage Message</h4>

              <p>
                Update the message status as you review and handle this enquiry.
              </p>

              <div className="contact-message-actions">
                {selectedMessage.status !== "new" && (
                  <button
                    className="contact-status-new"
                    disabled={updatingId === selectedMessage.id}
                    onClick={() =>
                      handleStatusUpdate(selectedMessage, "new")
                    }
                  >
                    <Clock3 size={16} />
                    Mark as New
                  </button>
                )}

                {selectedMessage.status !== "read" && (
                  <button
                    className="contact-status-read"
                    disabled={updatingId === selectedMessage.id}
                    onClick={() =>
                      handleStatusUpdate(selectedMessage, "read")
                    }
                  >
                    <Eye size={16} />
                    Mark as Read
                  </button>
                )}

                {selectedMessage.status !== "resolved" && (
                  <button
                    className="contact-status-resolved"
                    disabled={updatingId === selectedMessage.id}
                    onClick={() =>
                      handleStatusUpdate(selectedMessage, "resolved")
                    }
                  >
                    <Check size={16} />
                    Resolve
                  </button>
                )}
              </div>

              {updatingId === selectedMessage.id && (
                <span className="appointment-action-loading">
                  Updating message...
                </span>
              )}
            </div>

            <button
              className="appointment-modal-close"
              onClick={() => setSelectedMessage(null)}
            >
              Close Details
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminContactMessages;
