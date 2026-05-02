import React from "react";

/**
 * ServiceSetlist.js - Music Repertoire & Setlist Section
 *
 * Displays information about available music genres and custom arrangements
 * Lists 15+ genres including Classical, Rock, Pop, Jazz, etc.
 */

const ServiceSetlist = () => {
  return (
      <div className="component-container setlist" id="setlist-section">

        {/* Image column */}
        <div className="card-image-container setlist">
          <img src="/images/setlist.png" alt="outdoor guitar performance" />
        </div>

        {/* Text column */}
        <div className="card-text-container setlist">

          {/* Section heading */}
          <div className="card-text-title-container setlist">
            <h2 className="card-text-title setlist">Our Curated Repertoire</h2>
          </div>

          {/* Overview of music selection */}
          <p className="card-text-content setlist">
            Ask for our setlist. We have over 1,000+ songs ranging from
            Classical to Rock.
          </p>

          {/* Two-column genre list */}
          <div className="card-text-content list setlist">

            {/* Left column genres */}
            <div className="setlist-list-container">
              <ul>
                <li>Top 40's</li>
                <li>Pop</li>
                <li>Rock</li>
                <li>Classic Rock</li>
                <li>Progressive Rock</li>
                <li>Jazz</li>
                <li>Funk</li>
                <li>Classical</li>
              </ul>
            </div>

            {/* Right column genres */}
            <div className="setlist-list-container">
              <ul>
                <li>Soundtrack</li>
                <li>Instrumental</li>
                <li>Soul</li>
                <li>R&B</li>
                <li>Latin</li>
                <li>Indie</li>
                <li>60s, 70s, 80s, 90s</li>
                <li>Electronic Dance Music</li>
              </ul>
            </div>
          </div>

          {/* Custom arrangements note and CTA */}
          <div className="card-text-content footer setlist">
            <p>
              We understand that each event is unique in its own way. Our services
              cater to your specific needs, offering customized arrangements such
              as mash-ups, medleys, and even original tracks.{" "}
              <span className="hyperlink-text">
              <a
                  href="https://forms.gle/6DmoDgb2Y3CPDU2C6"
                  rel="noreferrer"
                  target="_blank"
              >
                Contact us
              </a>
            </span>{" "}
              for more details.
            </p>
          </div>
        </div>
      </div>
  );
};

export default ServiceSetlist;
