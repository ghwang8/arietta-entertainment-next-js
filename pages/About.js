import React from "react";

/**
 * About.js - Company Information Section
 *
 * Displays company information including:
 * - Company photo
 * - About Us description
 * - Services offered
 * - Link to booking form
 */

const About = () => {
  return (
      <div className="component-container tanned-bg" id="about-section">
        {/* Image column - displays company photo */}
        <div className="card-image-container">
          <img src="/images/about-us.jpg" alt="vibrant live violin performance" />
        </div>

        {/* Text column - displays information */}
        <div className="card-text-container">
          <div className="card-text-container-group about">
            {/* Section heading */}
            <div className="card-text-title about">
              <h2 className="card-text-title">About Us</h2>
            </div>

            {/* Main content paragraphs */}
            <div className="card-text-content-container about">
              {/* First paragraph - company description */}
              <p className="card-text-content about">
                ARIETTA Entertainment is a premier music agency specializing in
                expertly curated entertainment programs and live performances. We
                possess a roster of highly skilled and experienced musicians,
                providing an exquisite and unforgettable experience for any
                occasion, event, venue, or establishment.
              </p>

              {/* Second paragraph - services and booking CTA */}
              <p className="card-text-content about">
                From classical, to rock, to pop our setlist consists of a dynamic
                selection of musical repertoire.
                <span className="hyperlink-text">
                <a
                    href="https://forms.gle/6DmoDgb2Y3CPDU2C6"
                    rel="noreferrer"
                    target="_blank"
                >
                  Book us
                </a>
              </span>
                {" "}for a private event, wedding, party, or custom recording today!
              </p>
            </div>

            {/* Company logo (smaller version) */}
            <div className="logo-container sm-logo about">
              <img src="/images/arietta-logo-black.svg" alt="black arietta logo" />
            </div>
          </div>
        </div>
      </div>
  );
};

export default About;