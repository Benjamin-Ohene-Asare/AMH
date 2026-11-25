
import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  Settings,
  LogOut,
  Menu,
  Bell,
  ArrowUpRight,
  Clock3,
  CheckCircle2,
  CircleCheck,
  XCircle,
  RefreshCw,
} from "lucide-react";

import { Link, NavLink } from "react-router-dom";
import { getAdminDashboardStats, logoutUser } from "../../../api/api";

import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loadStats = async () => {
    try {
      setError("");
      setLoading(true);

      const data = await getAdminDashboardStats();
      setStats(data);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Unable to load dashboard statistics. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      window.location.href = "/login";
    }
  };

  const statCards = [
    {
      title: "Total Appointments",
      value: stats.total,
      icon: CalendarDays,
      className: "total",
      description: "All appointment requests",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock3,
      className: "pending",
      description: "Awaiting confirmation",
    },
    {
      title: "Confirmed",
      value: stats.confirmed,
      icon: CheckCircle2,
      className: "confirmed",
      description: "Approved appointments",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: CircleCheck,
      className: "completed",
      description: "Completed appointments",
    },
  ];

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
          name: "Events",
          icon: ClipboardList,
          path: "/admin/events",
        },
      ],
    },
  ];

  return (
    <div className="amh-admin">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="admin-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>

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
              <h1>Dashboard</h1>
              <p>Welcome to your hospital administration portal.</p>
            </div>
          </div>

          <div className="admin-topbar-actions">
            <button
              className="admin-icon-button"
              title="Refresh dashboard"
              onClick={loadStats}
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

        {/* Dashboard content */}
        <div className="admin-content">

          <div className="admin-page-heading">
            <div>
              <h2>Overview</h2>
              <p>Here's what's happening at your hospital.</p>
            </div>

            <button
              className="admin-refresh-button"
              onClick={loadStats}
              disabled={loading}
            >
              <RefreshCw size={16} />
              Refresh Data
            </button>
          </div>

          {/* Statistics */}
          <section className="admin-stats-grid">
            {statCards.map((card) => {
              const Icon = card.icon;

              return (
                <div className="admin-stat-card" key={card.title}>
                  <div className="admin-stat-top">
                    <div className={`admin-stat-icon ${card.className}`}>
                      <Icon size={21} />
                    </div>

                    <ArrowUpRight
                      size={18}
                      className="admin-stat-arrow"
                    />
                  </div>

                  <div className="admin-stat-details">
                    <p>{card.title}</p>

                    <h3>
                      {loading ? "—" : card.value ?? 0}
                    </h3>

                    <span>{card.description}</span>
                  </div>
                </div>
              );
            })}
          </section>

          {/* Error state */}
          {error && (
            <div className="admin-error">
              <XCircle size={20} />

              <div>
                <strong>Unable to load statistics</strong>
                <p>{error}</p>
              </div>

              <button onClick={loadStats}>Try again</button>
            </div>
          )}

          {/* Dashboard lower section */}
          <section className="admin-dashboard-lower">

            <div className="admin-panel admin-welcome-panel">
              <div className="admin-panel-heading">
                <div>
                  <h3>Hospital Overview</h3>
                  <p>Your administration workspace</p>
                </div>

                <div className="admin-panel-icon">
                  <LayoutDashboard size={20} />
                </div>
              </div>

              <div className="admin-welcome-content">
                <h2>Manage hospital operations with ease.</h2>

                <p>
                  Monitor appointment requests, manage hospital events
                  and keep track of important administrative activities
                  from one central location.
                </p>

                <Link
                  to="/admin/appointments"
                  className="admin-primary-link"
                >
                  Manage Appointments
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>

            <div className="admin-panel admin-quick-panel">
              <div className="admin-panel-heading">
                <div>
                  <h3>Quick Access</h3>
                  <p>Frequently used sections</p>
                </div>
              </div>

              <Link to="/admin/appointments" className="admin-quick-link">
                <div className="admin-quick-icon appointments">
                  <CalendarDays size={19} />
                </div>

                <div>
                  <strong>Appointments</strong>
                  <span>View and manage bookings</span>
                </div>

                <ArrowUpRight size={17} />
              </Link>

              <Link to="/admin/events" className="admin-quick-link">
                <div className="admin-quick-icon events">
                  <ClipboardList size={19} />
                </div>

                <div>
                  <strong>Events</strong>
                  <span>Manage hospital events</span>
                </div>

                <ArrowUpRight size={17} />
              </Link>
            </div>

          </section>

          <footer className="admin-content-footer">
            <span>© {new Date().getFullYear()} Ahmadiyya Muslim Hospital</span>
            <span>Administration Portal</span>
          </footer>

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
