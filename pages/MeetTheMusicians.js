import React from "react";

/**
 * MeetTheMusicians.js - Featured Musicians Gallery
 *
 * Displays:
 * - Header section with centered text (MEET, The Musicians, description)
 * - 3x3 grid of musician photos (LOVUR_Estie.jpg)
 */

const MeetTheMusicians = () => {
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
                {/* Row 1 */}
                <div className="musicians-grid-row">
                    <div className="musician-image-box">
                        <img src="/images/LOVUR_Estie.jpg" alt="musician 1" />
                    </div>
                    <div className="musician-image-box">
                        <img src="/images/LOVUR_Estie.jpg" alt="musician 2" />
                    </div>
                    <div className="musician-image-box">
                        <img src="/images/LOVUR_Estie.jpg" alt="musician 3" />
                    </div>
                </div>

                {/* Row 2 */}
                <div className="musicians-grid-row">
                    <div className="musician-image-box">
                        <img src="/images/LOVUR_Estie.jpg" alt="musician 4" />
                    </div>
                    <div className="musician-image-box">
                        <img src="/images/LOVUR_Estie.jpg" alt="musician 5" />
                    </div>
                    <div className="musician-image-box">
                        <img src="/images/LOVUR_Estie.jpg" alt="musician 6" />
                    </div>
                </div>

                {/* Row 3 */}
                <div className="musicians-grid-row">
                    <div className="musician-image-box">
                        <img src="/images/LOVUR_Estie.jpg" alt="musician 7" />
                    </div>
                    <div className="musician-image-box">
                        <img src="/images/LOVUR_Estie.jpg" alt="musician 8" />
                    </div>
                    <div className="musician-image-box">
                        <img src="/images/LOVUR_Estie.jpg" alt="musician 9" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MeetTheMusicians;