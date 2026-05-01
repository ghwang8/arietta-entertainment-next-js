import React from "react";


const Contact = () => {
  const icons = [
    {
      description: "phone",
      img: "/images/icons/phone.svg",
      text: "778 887 2018",
      link: ""
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
      link: "https://www.instagram.com/arietta.entertainment/"
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
      link: "https://www.youtube.com/@estiehwang"
    }
  ];
  const ContactInfo = icons.map((icon, key) => (
    <div key={key} className="contact-info-section-container">
      <a href={icon.link} target="_blank">
        <img
          src={icon.img}
          alt={`${icon.description} icon`}
          className="contact-icons"
        />
      </a> 
      <p className="contact-text"><a href={icon.link} target="_blank">{icon.text}</a></p>
    </div>
  ));
  return (
    <div className="component-container contact" id="contact-section">
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
     <div className="contact-info-background">
      <div className="contact-details-container">{ContactInfo}</div>
     </div> 
    </div>
  );
};

export default Contact;
