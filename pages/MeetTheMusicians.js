import React from "react";

/**
 * MeetTheMusicians.js - Featured Musicians Gallery
 *
 * Displays:
 * - Header section with centered text (MEET, The Musicians, description)
 * - 3x3 grid of musician photos with name and instrument overlay
 */

const MeetTheMusicians = () => {
    // Array of musicians with their names and instruments
    const musicians = [
        { name: "ESTHER", instrument: "violin" },
        { name: "DAVID", instrument: "violin" },
        { name: "LUCI", instrument: "viola" },
        { name: "ALLEN", instrument: "cello" },
        { name: "SAMANTHA", instrument: "violin" },
        { name: "ANGELA", instrument: "viola" },
        { name: "JOHNATHAN", instrument: "violin" },
        { name: "TERESA", instrument: "piano" },
        { name: "ASLAN", instrument: "piano" }
    ];

    // Create rows of 3 musicians each
    const rows = [];
    for (let i = 0; i < musicians.length; i += 3) {
        rows.push(musicians.slice(i, i + 3));
    }

    return (
        <div className="component-container meet-the-musicians-wrapper" id="artists-section">
            {/* Header Section - Centered Text */}
            <div className="meet-musicians-header">
                {/* "MEET" in Urbanist font */}
                <p className="meet-text">MEET</p>

                {/* "The Musicians" in The Seasons font */}
                <h2 className="musicians-heading">The Musicians</h2>

                {/* Description in The Seasons font */}
                <p className="musicians-description">
                    Discover a community of exceptional live musicians who will take your next event to unparalleled heights.
                </p>
            </div>

            {/* Image Grid Section - 3x3 Layout */}
            <div className="musicians-grid-container">
                {rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="musicians-grid-row">
                        {row.map((musician, index) => (
                            <div key={index} className="musician-image-box">
                                <img src="/images/LOVUR_Estie.jpg" alt={musician.name} />
                                {/* Overlay with musician info */}
                                <div className="musician-overlay">
                                    <p className="musician-name">{musician.name}</p>
                                    <p className="musician-instrument">{musician.instrument}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MeetTheMusicians;