
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import "./Header.css";
import { PhoneCall } from "lucide-react";

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

  const location = useLocation();

  const closeMenus = () => {
    setMobileOpen(false);
    setDepartmentsOpen(false);
  };

  const isActive = (link) => {
    if (link.to) {
      return location.pathname === link.to;
    }

    if (link.dropdown) {
      return location.pathname.startsWith("/departments");
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

    
<a href="tel:0542663331" className="amh-emergency">
  <PhoneCall size={17} /> 
  Emergency: 0542-663-331
</a>   </div>
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
                      className={departmentsOpen ? "rotate-chevron" : ""}
                    />
                  </button>

                  {departmentsOpen && (
                    <div className="amh-dropdown">
                      <Link to="/departments" onClick={closeMenus}>
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

        {/* APPOINTMENT BUTTON */}
        <Link
          to="/appointment"
          className="amh-appointment"
        >
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
