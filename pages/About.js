import React from "react";

/**
 * About.js - Company Information Section
 *
 * Displays company information including:
 * - Company photo
 * - About Us description
 * - Services offered
 */

const About = () => {
  return (
      <div className="about-section-wrapper tanned-bg" id="about-section">
        {/* Image column - displays company photo */}
        <div className="about-image-column">
          <img src="/images/about-us.jpg" alt="vibrant live violin performance" />
        </div>

        {/* Text column - displays information */}
        <div className="about-content-column">
          {/* Section heading */}
          <h2 className="about-heading">
            <span className="about-heading-text">About Us</span>
          </h2>

          {/* Main content paragraphs */}
          <div className="about-description">
            {/* First paragraph - company description */}
            <p className="about-paragraph">
              ARIETTA Entertainment is a premier music agency specializing in
              expertly curated live performances for weddings, corporate events,
              private parties, and luxury experiences. Our roster features highly
              skilled, professional musicians, including string quartets, ensembles,
              and soloists, delivering an unforgettable musical experience for any
              occasion.
            </p>

            {/* Second paragraph - services and booking CTA */}
            <p className="about-paragraph">
              From classical to rock to pop, our repertoire is dynamic and versatile
              - perfectly tailored to elevate your event. Whether you're planning a
              wedding ceremony, corporate function, or custom recording project,
              ARIETTA provides refined, high-quality live music designed to impress.
            </p>
          </div>

          {/* Company logo */}
          <div className="about-logo-container">
            <img src="/images/arietta-logo-black.svg" alt="black arietta logo" />
          </div>
        </div>
      </div>
  );
};

export default About;