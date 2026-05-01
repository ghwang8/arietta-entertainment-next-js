import React from "react";

const ServiceMusicians = () => {
  return (
    <div className="component-container tanned-bg" id="musicians-section">
      <div className="card-image-container musicians">
        <img src="/images/select_your_artists.jpg" alt="outdoor guitar performance" />
      </div>
      <div className="card-text-container musicians">
        <h2 className="card-text-title musicians">Select Your Artists</h2>
        <p className="card-text-content secondary-font">
          Choose from a wide array of duos, trios, and quartets, allowing you to
          create the perfect musical ensemble for your needs.
        </p>
        <p className="card-text-content third-font">
          VIOLIN | VIOLA | CELLO | PIANO | DRUM | GUITAR | BASS | SAX | VOICE
        </p>
        <div>
          <p className="card-text-content">
            Don’t see what you're looking for? <br /> No problem,{" "}
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
