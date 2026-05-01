import React from "react";

const ServiceEvent = () => {
  const eventsArr = [
    {
      id: "a",
      img: "/images/event-wedding.png",
      title: "WEDDINGS & PROPOSALS",
      description:
        "Elevate your special day with custom acoustical arrangements.",
      url: "https://forms.gle/6DmoDgb2Y3CPDU2C6"
    },
    {
      id: "b",
      img: "/images/event-party.png",
      title: "CORPORATE & PRIVATE EVENTS",
      description:
        "Unparalleled live entertainment to elevate your next event.",
      url: "https://forms.gle/6DmoDgb2Y3CPDU2C6"
    },
    {
      id: "c",
      img: "/images/event-venue.png",
      title: "VENUE MUSIC MANAGEMENT",
      description: "Discover the ideal package tailored to your venue's needs.",
      url: "https://forms.gle/6DmoDgb2Y3CPDU2C6"
    },
    {
      id: "d",
      img: "/images/event-recording.png",
      title: "CUSTOM RECORDINGS",
      description:
        "Find a skilled musician for your upcoming recording endeavour.",
      url: "https://forms.gle/6DmoDgb2Y3CPDU2C6"
    }
  ];
  const events = eventsArr.map((event, key) => {
    return (
      <div key={key} className={`event-option ${event.id}`}>
        <div className="event-option-img-container">
          <img
            className={`event-option-img ${event.id}`}
            src={event.img}
            alt="event"
          />
        </div>
        <div className="event-option-text">
          <div className="event-option-title-container"><h3 className="event-option-title">{event.title}</h3></div>
          <div className="event-option-description-container"><p className="event-option-description">{event.description}</p></div>
          <div className="inquiry-button-container">
          <a
            href={event.url}
            rel="noreferrer"
            target="_blank"
            className="button1"
          >
            INQUIRE
          </a>
          </div>
         
        </div>
      </div>
    );
  });
  return (
    <div className="component-container" id="event-section">
      <h2 className="card-text-title event">Music For Any Occasion</h2>
      <div className="event-options-container">{events}</div>
    </div>
  );
};

export default ServiceEvent;
