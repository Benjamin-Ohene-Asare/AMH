
import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  ChevronDown,
  Menu,
  X,
  PhoneCall,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import {
  getCurrentUser,
  logoutUser,
} from "../../api/api";

import "./Header.css";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Departments", dropdown: true },
  { label: "Services", to: "/services" },
  { label: "Events", to: "/events" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [departmentsOpen, setDepartmentsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(() => getCurrentUser());
  const [loggingOut, setLoggingOut] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = user?.role === "SUPER_ADMIN";

  const dashboardPath = isAdmin
    ? "/admin/dashboard"
    : "/community/dashboard";

  const dashboardLabel = isAdmin
    ? "Admin Dashboard"
    : "My Dashboard";

  const closeMenus = () => {
    setMobileOpen(false);
    setDepartmentsOpen(false);
    setProfileOpen(false);
  };

  useEffect(() => {
    setUser(getCurrentUser());
    closeMenus();
  }, [location.pathname]);

  const isActive = (link) => {
    if (link.to) {
      return location.pathname === link.to;
    }

    if (link.dropdown) {
      return location.pathname.startsWith("/departments");
    }

    return false;
  };

  const getUserName = () => {
    if (!user) return "My Account";

    const fullName = `${user.first_name || ""} ${
      user.last_name || ""
    }`.trim();

    return (
      fullName ||
      user.username ||
      user.email?.split("@")[0] ||
      "My Account"
    );
  };

  const getUserInitial = () => {
    return getUserName().charAt(0).toUpperCase();
  };

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      setUser(null);
      setLoggingOut(false);
      closeMenus();
      navigate("/", { replace: true });
    }
  };

  return (
    <header className="amh-header">

      {/* TOP INFORMATION BAR */}
      <div className="amh-topbar">
        <div className="amh-topbar-inner">
          <span>
            Serving the Community with Compassion &amp; Excellence
          </span>

          <a href="tel:0542663331" className="amh-emergency">
            <PhoneCall size={17} />
            Emergency: 0542-663-331
          </a>
        </div>
      </div>

      {/* MAIN NAVIGATION */}
      <div className="amh-header-inner">

        {/* HOSPITAL BRAND */}
        <Link
          to="/"
          className="amh-brand"
          onClick={closeMenus}
        >
          <div className="amh-logo">AMH</div>

          <div className="amh-brand-text">
            <strong>Ahmadiyya Muslim Hospital</strong>
            <small>Daboase, Ghana</small>
          </div>
        </Link>

        {/* NAVIGATION LINKS */}
        <nav
          className={`amh-nav ${mobileOpen ? "amh-nav-open" : ""}`}
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <div className="amh-nav-item" key={link.label}>
              {link.dropdown ? (
                <>
                  <button
                    type="button"
                    className={`amh-nav-link ${
                      isActive(link) ? "active" : ""
                    }`}
                    onClick={() =>
                      setDepartmentsOpen(!departmentsOpen)
                    }
                    aria-expanded={departmentsOpen}
                    aria-haspopup="true"
                  >
                    {link.label}

                    <ChevronDown
                      size={15}
                      className={
                        departmentsOpen ? "rotate-chevron" : ""
                      }
                    />
                  </button>

                  {departmentsOpen && (
                    <div className="amh-dropdown">
                      <Link
                        to="/departments"
                        onClick={closeMenus}
                      >
                        All Departments
                      </Link>

                      <Link
                        to="/departments/clinical"
                        onClick={closeMenus}
                      >
                        Clinical Departments
                      </Link>

                      <Link
                        to="/departments/non-clinical"
                        onClick={closeMenus}
                      >
                        Non-Clinical Departments
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={link.to}
                  className={`amh-nav-link ${
                    isActive(link) ? "active" : ""
                  }`}
                  onClick={closeMenus}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* ADMIN PROFILE */}
        <div className="amh-header-auth">
          {user && (
            <div className="amh-profile-wrapper">
              <button
                type="button"
                className="amh-profile-trigger"
                onClick={() => setProfileOpen(!profileOpen)}
                aria-expanded={profileOpen}
                aria-label="Open account menu"
              >
                <span className="amh-profile-avatar">
                  {getUserInitial()}
                </span>

                <ChevronDown
                  size={16}
                  className={
                    profileOpen ? "rotate-chevron" : ""
                  }
                />
              </button>

              {profileOpen && (
                <div className="amh-profile-dropdown">

                  <div className="amh-profile-heading">
                    <span className="amh-profile-avatar">
                      {getUserInitial()}
                    </span>

                    <div>
                      <strong>{getUserName()}</strong>
                      <small>{user.email || ""}</small>
                    </div>
                  </div>

                  <div className="amh-profile-divider" />

                  <Link
                    to={dashboardPath}
                    onClick={closeMenus}
                  >
                    <LayoutDashboard size={17} />
                    {dashboardLabel}
                  </Link>

                  <div className="amh-profile-divider" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loggingOut}
                  >
                    <LogOut size={17} />
                    {loggingOut ? "Logging out..." : "Logout"}
                  </button>

                </div>
              )}
            </div>
          )}
        </div>

        {/* APPOINTMENT BUTTON */}
        <Link
          to="/appointment"
          className="amh-appointment"
          onClick={closeMenus}
        >
          Book Appointment
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          className="amh-mobile-toggle"
          onClick={() => {
            setMobileOpen(!mobileOpen);
            setDepartmentsOpen(false);
            setProfileOpen(false);
          }}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={25} /> : <Menu size={25} />}
        </button>

      </div>
    </header>
  );
}
