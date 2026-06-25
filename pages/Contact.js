import React from "react";

/**
 * Contact.js - Contact & Social Media Section
 *
 * Displays all contact methods:
 * - Phone number
 * - Email
 * - Location
 * - Social media links (Instagram, Spotify, YouTube)
 * - Booking form link
 */

const Contact = () => {
  // Array of contact information objects
  // Each object has: description, image, text, and link
  const icons = [
    {
      description: "phone",
      img: "/images/icons/phone.svg",
      text: "778 887 2018",
      link: "" // No link for phone - just display
    },
    {
      description: "email",
      img: "/images/icons/email.svg",
      text: "arietta.entertainment@gmail.com",
      link: ""
    },
    {
      description: "location",
      img: "/images/icons/location.svg",
      text: "Vancouver, British Columbia (available to travel worldwide)",
      link: ""
    },
    {
      description: "instagram",
      img: "/images/icons/instagram.svg",
      text: "@arietta.entertainment",
      link: "https://www.instagram.com/arietta.entertainment/" // Link to Instagram profile
    },
    {
      description: "spotify",
      img: "/images/icons/spotify.svg",
      text: "Spotify",
      link: ""
    },
    {
      description: "youtube",
      img: "/images/icons/youtube.svg",
      text: "Youtube",
      link: "https://www.youtube.com/@estiehwang" // Link to YouTube channel
    }
  ];

  /**
   * Handle navigation to a section
   * Scrolls smoothly to the section on the main page
   */
  const handleNavigation = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  /**
   * Map contact array to displayable JSX elements
   * Creates a contact box for each item in the icons array
   */
  const ContactInfo = icons.map((icon, key) => (
      <div key={key} className="contact-info-section-container">
        {/* Link wrapper around icon - only follows link if one exists */}
        <a href={icon.link} target="_blank">
          <img
              src={icon.img}
              alt={`${icon.description} icon`}
              className="contact-icons"
          />
        </a>

        {/* Contact text - also a link if URL exists */}
        <p className="contact-text">
          <a href={icon.link} target="_blank">
            {icon.text}
          </a>
        </p>
      </div>
  ));

  return (
      <div className="component-container contact" id="contact-section">
        {/* Booking call-to-action */}
        <div className="contact-link-container">
          <div className="contact-booking-content">
            <h1>READY TO <em style={{fontFamily: "'The Seasons Italic', serif"}}>elevate</em> YOUR EVENT <br /> WITH <em style={{fontFamily: "'The Seasons Italic', serif"}}>timeless</em> MUSIC?</h1>
            <a href="/pricing" className="book-now-button urbanist">
              BOOK NOW
            </a>
          </div>
        </div>

        {/* Contact information grid */}
        <div className="contact-info-background">
          <div className="contact-details-container">
            {/* Left Side */}
            <div className="footer-left">
              {/* Top Middle - Logos */}
              <div className="footer-logos">
                <img src="/images/Arietta-Logo-black-no-text.png" alt="Arietta Logo Placeholder" />
                <img src="/images/ARIETTA Logo - Black Font no graphic.png" alt="Arietta Logo Black" />
              </div>

              {/* Bottom Middle - Contact Info Grid */}
              <div className="footer-contact-grid">
                <div className="contact-item">
                  <div className="contact-label urbanist">PHONE</div>
                  <div className="contact-value urbanist">778 887 2018</div>
                </div>
                <div className="contact-item">
                  <div className="contact-label urbanist">EMAIL</div>
                  <div className="contact-value urbanist">arietta.entertainment@gmail.com</div>
                </div>
              </div>
            </div>

            {/* Right Side - Navigation and Social Links */}
            <div className="footer-right">
              {/* Footer Navigation */}
              <div className="footer-navigation">
                <button onClick={() => handleNavigation("home-section")}>
                  <span className="footer-navigation-text">HOME</span>
                </button>
                <button onClick={() => handleNavigation("about-section")}>
                  <span className="footer-navigation-text">ABOUT</span>
                </button>
                <button onClick={() => handleNavigation("work-section")}>
                  <span className="footer-navigation-text">OUR WORK</span>
                </button>
                <button onClick={() => handleNavigation("artists-section")}>
                  <span className="footer-navigation-text">THE MUSICIANS</span>
                </button>
                <button onClick={() => handleNavigation("contact-section")}>
                  <span className="footer-navigation-text">INQUIRE</span>
                </button>
              </div>

              {/* Social Media Links */}
              <div className="footer-social">
                <a href="https://www.youtube.com/@estiehwang" className="urbanist">
                  <span className="footer-social-text">YouTube</span>
                </a>
                <a href="https://www.instagram.com/arietta.entertainment/" className="urbanist">
                  <span className="footer-social-text">Instagram</span>
                </a>
                <a href="https://open.spotify.com/artist/0HJkJhSSyp7IVB7DPOLHj2" className="urbanist">
                  <span className="footer-social-text">Spotify</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

  );
};

export default Contact;