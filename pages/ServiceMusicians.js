import React from "react";

/**
 * ServiceMusicians.js - Musician Selection & Customization Section
 *
 * Displays information about selecting custom musician ensembles
 * Lists available instruments and ensemble options
 */

const ServiceMusicians = () => {
  return (
      <div className="component-container tanned-bg" id="musicians-section">

        {/* Image column - shows performance photo */}
        <div className="card-image-container musicians">
          <img src="/images/select_your_artists.jpg" alt="outdoor guitar performance" />
        </div>

        {/* Text column - selection info */}
        <div className="card-text-container musicians">

          {/* Section title */}
          <h2 className="card-text-title musicians">Select Your Artists</h2>

          {/* Main description - ensemble options */}
          <p className="card-text-content secondary-font">
            Choose from a wide array of duos, trios, and quartets, allowing you to
            create the perfect musical ensemble for your needs.
          </p>

          {/* List of available instruments */}
          <p className="card-text-content third-font">
            VIOLIN | VIOLA | CELLO | PIANO | DRUM | GUITAR | BASS | SAX | VOICE
          </p>

          {/* CTA for custom requests */}
          <div>
            <p className="card-text-content">
              Don't see what you're looking for? <br /> No problem,{" "}
              <span className="hyperlink-text">
              <a
                  href="https://forms.gle/6DmoDgb2Y3CPDU2C6"
                  rel="noreferrer"
                  target="_blank"
              >
                get in touch here
              </a>
            </span>{" "}
              to discuss your vision!
            </p>
          </div>
        </div>
      </div>
  );
};

export default ServiceMusicians;
