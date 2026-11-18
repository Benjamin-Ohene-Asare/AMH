
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import "./Header.css";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Departments", href: "#departments", dropdown: true },
  { label: "Services", href: "#services" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [departmentsOpen, setDepartmentsOpen] = useState(false);

  const location = useLocation();

  // Close navigation menus after selecting a link
  const closeMenus = () => {
    setMobileOpen(false);
    setDepartmentsOpen(false);
  };

  // Check which navigation page is currently active
  const isActive = (link) => {
    if (link.to) {
      return location.pathname === link.to;
    }

    return false;
  };

  return (
    <header className="amh-header">

      {/* TOP INFORMATION BAR */}
      <div className="amh-topbar">
        <div className="amh-topbar-inner">
          <span>
            Serving the Community with Compassion &amp; Excellence
          </span>

          <a href="tel:+233000000000" className="amh-emergency">
            <span>☎</span> Emergency: +233 (0) 000-000-000
          </a>
        </div>
      </div>

      {/* MAIN NAVIGATION */}
      <div className="amh-header-inner">

        {/* HOSPITAL BRAND */}
        <Link to="/" className="amh-brand" onClick={closeMenus}>
          <div className="amh-logo">
            AMH
          </div>

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
                    className="amh-nav-link"
                    onClick={() =>
                      setDepartmentsOpen(!departmentsOpen)
                    }
                    aria-expanded={departmentsOpen}
                  >
                    {link.label}
                    <ChevronDown size={15} />
                  </button>

                  {departmentsOpen && (
                    <div className="amh-dropdown">
                      <Link to="/departments" onClick={closeMenus}>
                        All Departments
                      </Link>
                    </div>
                  )}
                </>
              ) : link.to ? (
                <Link
                  to={link.to}
                  className={`amh-nav-link ${
                    isActive(link) ? "active" : ""
                  }`}
                  onClick={closeMenus}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  className="amh-nav-link"
                  onClick={closeMenus}
                >
                  {link.label}
                </a>
              )}

            </div>
          ))}
        </nav>

        {/* APPOINTMENT BUTTON */}
        <Link to="/appointments" className="amh-appointment">
          Book Appointment
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          className="amh-mobile-toggle"
          onClick={() => {
            setMobileOpen(!mobileOpen);
            setDepartmentsOpen(false);
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
