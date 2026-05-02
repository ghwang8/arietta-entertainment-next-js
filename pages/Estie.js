import React from "react";

/**
 * Estie.js - Featured Founder Biography Section
 *
 * Displays detailed information about Esther Hwang including:
 * - Professional photo
 * - Bio introduction
 * - Biography section with education and collaborations
 * - Solo appearances list
 * - Prizes and achievements
 */

const Estie = () => {
  return (
      <div className="component-container scroll founders" id="estie-section">
        {/* Image column - Esther holding violin */}
        <div className="card-image-container estie">
          <img
              src="/images/estie.jpg"
              className="founder-img estie"
              alt="esther hwang holding violin in white dress"
          />
        </div>

        {/* Text column - biography and achievements */}
        <div className="card-text-container scroll founders estie">

          {/* Introduction section */}
          <div className="founder-text-desc-group-container estie">
            <h2 className="card-text-title">Meet the Creator</h2>

            {/* Background intro paragraph covering:
              - Years of experience
              - Educational background
              - Performance history
              - Education at Juilliard */}
            <p className="card-text-content">
              Introducing the mastermind behind the scene, Estie. Boasting a
              collective experience of over 15 years in Vancouver's vibrant music
              scene, Estie is a gifted violinist who embarked on her musical journey
              at the age of 3. Her solo debut was at the age of 9 with the Vancouver
              Symphony Orchestra. This debut served as a stepping stone towards a
              bright performing career. Estie has graced the stages of illustrious
              halls, from the Orpheum Theatre to the iconic Carnegie Hall. She pursued
              her Bachelor's degree in Music at the renowned Juilliard School.
            </p>
          </div>

          {/* Full name heading */}
          <h2 className="card-text-title estie">Esther Hwang</h2>

          {/* Detailed biography with two columns */}
          <div className="founder-text-desc-group-container">

            {/* Left column - Biography and collaborations */}
            <span className="founder-text-desc-left">
            <h3>BIOGRAPHY</h3>

              {/* Performance style description */}
              <p className="card-text-content">
              Miss Hwang is known for her ability to captivate audiences with her
              virtuosic and passionate performances.
            </p>

              {/* Education details */}
              <p className="card-text-content">
              She studied at <b>The Juilliard School</b> located in New York City
              under Professor Daniel Phillips.
            </p>

              {/* List of notable collaborators */}
              <p className="card-text-content">
              She has worked with <b>world class musicians</b> such as David Finckel,
              Wu Han, David Halen, Paul Kantor, Masao Kawasaki, Sylvia Rosenberg,
              Richard Aaron, Nam Yun Kim, Donald Weilerstein, Joel Smirnoff, and
              James Ehnes.
            </p>
          </span>

            {/* Right column - Solo appearances and prizes */}
            <span className="founder-text-desc-right">
            {/* Solo appearances heading */}
              <h3>SOLO APPEARANCES</h3>

              {/* List of orchestras where she's performed solo */}
              <p className="card-text-content">
              Hong Kong Summer Orchestra<br/>
              Vancouver Symphony Orchestra<br/>
              Vancouver Metropolitan Orchestra<br/>
              Vancouver Academy of Music Senior Orchestra<br/>
              Vancouver Philharmonic Orchestra<br/>
              Canadian Music Competition Orchestra<br/>
              Vancouver Pilgrim Orchestra
            </p>

              {/* Prizes and awards heading */}
              <h3>PRIZES</h3>

              {/* List of awards won */}
              <p className="card-text-content">
              <i>
                Shean Strings Competition<br/>
                Canadian Music Competition<br/>
                National Music Festival<br/>
                Vancouver Women's Music Society Scholarship Competition
              </i>
            </p>
          </span>
          </div>
        </div>
      </div>
  );
};

export default Estie;
