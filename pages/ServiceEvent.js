import React from "react";

/**
 * ServiceEvent.js - Service Offerings Section
 *
 * Displays 4 main service categories:
 * - Weddings & Proposals
 * - Corporate & Private Events
 * - Venue Music Management
 * - Custom Recordings
 *
 * Each category has image, description, and booking link.
 */

const ServiceEvent = () => {
  /**
   * Array of service offerings
   * Each service has: id, image, title, description, and booking form URL
   */
  const eventsArr = [
    {
      id: "a",
      img: "/images/event-wedding.png",
      title: "WEDDINGS & PROPOSALS",
      description: "Elevate your special day with custom acoustical arrangements.",
      url: "https://forms.gle/6DmoDgb2Y3CPDU2C6"
    },
    {
      id: "b",
      img: "/images/event-party.png",
      title: "CORPORATE & PRIVATE EVENTS",
      description: "Unparalleled live entertainment to elevate your next event.",
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
      description: "Find a skilled musician for your upcoming recording endeavour.",
      url: "https://forms.gle/6DmoDgb2Y3CPDU2C6"
    }
  ];

  /**
   * Map service array to displayable JSX event cards
   * Creates a card for each service type
   */
  const events = eventsArr.map((event, key) => {
    return (
        <div key={key} className={`event-option ${event.id}`}>

          {/* Service image */}
          <div className="event-option-img-container">
            <img
                className={`event-option-img ${event.id}`}
                src={event.img}
                alt="event"
            />
          </div>

          {/* Service text information */}
          <div className="event-option-text">

            {/* Service title */}
            <div className="event-option-title-container">
              <h3 className="event-option-title">{event.title}</h3>
            </div>

            {/* Service description  */}
            <div className="event-option-description-container">
              <p className="event-option-description">{event.description}</p>
            </div>

            {/* "INQUIRE" button linking to booking form */}
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
        {/* Section heading */}
        <h2 className="card-text-title event">Music For Any Occasion</h2>

        {/* Grid of service offering cards */}
        <div className="event-options-container">{events}</div>
      </div>
  );
};

export default ServiceEvent;
