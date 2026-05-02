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
          <h1>
            Interested in booking us? Fill out{" "}
            <span className="hyperlink-text contact">
            <a
                href="https://forms.gle/6DmoDgb2Y3CPDU2C6"
                rel="noreferrer"
                target="_blank"
            >
              this quick form.
            </a>
          </span>
          </h1>
        </div>

        {/* Contact information grid */}
        <div className="contact-info-background">
          <div className="contact-details-container">
            {/* Rendered contact boxes */}
            {ContactInfo}
          </div>
        </div>
      </div>
  );
};

export default Contact;
