
import React, { useState } from "react";
import {
  Phone,
  PhoneCall,
  Mail,
  MapPin,
  X,
  ChevronRight,
  Hospital,
} from "lucide-react";
import "./FloatingContact.css";

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="amh-floating-contact">
      {isOpen && (
        <div className="amh-contact-panel">
          <div className="amh-contact-panel-header">
            <div>
              <h3>Need Assistance?</h3>
              <p>Contact Ahmadiyya Muslim Hospital</p>
            </div>

            <button
              className="amh-contact-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close contact panel"
            >
              <X size={20} />
            </button>
          </div>

          <div className="amh-contact-panel-body">

            <a
              href="tel:0542663331"
              className="amh-emergency-contact"
            >
              <div className="amh-emergency-icon">
                <PhoneCall size={21} />
              </div>

              <div>
                <span>Emergency Telephone</span>
                <strong>0542-663-331</strong>
                <small>Tap to call</small>
              </div>

              <ChevronRight size={19} />
            </a>

            <a
              href="tel:0206301219"
              className="amh-contact-item"
            >
              <Phone size={19} />
              <div>
                <span>Hospital Telephone</span>
                <strong>0206-301-219</strong>
              </div>
            </a>

            <a
              href="mailto:ahmadiyyahospital.daboase@gmail.com"
              className="amh-contact-item"
            >
              <Mail size={19} />
              <div>
                <span>Email Address</span>
                <strong>
                  ahmadiyyahospital.daboase@gmail.com
                </strong>
              </div>
            </a>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Daboase+near+the+cemetery+Wassa+East+District+Ghana"
              target="_blank"
              rel="noopener noreferrer"
              className="amh-contact-item"
            >
              <MapPin size={19} />
              <div>
                <span>Our Location</span>
                <strong>
                  Daboase, near the cemetery, Western Region
                </strong>
                <small>View on Google Maps</small>
              </div>
            </a>

          </div>

          <div className="amh-contact-panel-footer">
            <Hospital size={17} />
            <span>Ahmadiyya Muslim Hospital</span>
          </div>
        </div>
      )}

      <button
        className={`amh-floating-contact-button ${
          isOpen ? "active" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close contact panel" : "Open hospital contact details"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={25} /> : <PhoneCall size={25} />}
      </button>
    </div>
  );
};

export default FloatingContact;
