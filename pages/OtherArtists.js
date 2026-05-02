import React from "react";

/**
 * OtherArtists.js - String and Piano Musician Rosters
 *
 * Displays two artist categories:
 * - String Musicians (violins, violas, cellos, guitars, bass)
 * - Piano Musicians
 *
 * Each category has description, image, and booking link.
 */

const OtherArtists = () => {
    /**
     * Array of artist rosters
     * Each roster has: id, image, title, description, booking URL
     */
    const artistsArr = [
        {
            id: "a",
            img: "/images/group_photo.jpg",
            title: "STRING ROSTER",
            description: "Our string roster represents the epitome of musical excellence. " +
                "Featuring violinists, violists, cellists, double bassists, and guitarists, " +
                "these accomplished artists bring a wealth of experience and unmatched artistry to the stage...",
            url: "https://forms.gle/6DmoDgb2Y3CPDU2C6"
        },
        {
            id: "b",
            img: "/images/duo_photo.jpg",
            title: "PIANO ROSTER",
            description: "Our piano roster features some of the most talented and versatile pianists " +
                "in the industry. These artists are not only graduates of leading conservatories but also " +
                "seasoned performers who have graced the stages of prestigious venues...",
            url: "https://forms.gle/6DmoDgb2Y3CPDU2C6"
        }
    ];

    /**
     * Map artist array to JSX display cards
     * Creates a card for each roster with image, title, description
     */
    const artists = artistsArr.map((artist, key) => {
        return (
            <div key={key} className={`artist-option ${artist.id}`}>
                {/* Artist category title */}
                <div className="artist-option-title-container">
                    <h3 className="artist-option-title">{artist.title}</h3>
                </div>

                {/* Artist roster image */}
                <div className={`artist-option-img-container ${artist.id}`}>
                    <img
                        className={`artist-option-img ${artist.id}`}
                        src={artist.img}
                        alt="artist"
                    />
                </div>

                {/* Artist description text */}
                <div className="artist-option-text">
                    <div className="artist-option-description-container">
                        <p className="artist-option-description">{artist.description}</p>
                    </div>

                    {/* Commented out: Inquire button - currently not shown */}
                    {/* <div className="artist-button-container">
            <a href={artist.url} rel="noreferrer" target="_blank" className="button1">
              INQUIRE
            </a>
          </div> */}
                </div>
            </div>
        );
    });

    return (
        <div className="component-container" id="other-artists-section">
            {/* Section heading */}
            <h2 className="card-text-title artist">Other Artists</h2>

            {/* Grid of artist roster cards */}
            <div className="artist-options-container">{artists}</div>
        </div>
    );
};

export default OtherArtists;
