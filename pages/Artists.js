import React from "react";
import Image from "next/image";
import LOVURBackgroundDesktop from "../public/images/LOVUR_Quartet.jpg";

/**
 * Artists.js - Featured Artists Section
 *
 * Displays the LOVUR String Quartet with:
 * - Responsive background image (mobile/desktop versions)
 * - Quartet name and description
 */

const ShowcaseVideo = () => {
    return (
        <div className="component-container" id="artists-section">
            {/* Text overlay on image */}
            <div className="showcase-text-container-LOVUR LOVUR">
                <h2 className="secondary-text slogan">
                    LOVUR String Quartet
                </h2>
            </div>

            {/* Commented out: Video background code (not currently in use) */}
            {/* <video className="background-video mobile" autoPlay loop muted>
        <source src={LOVURBackgroundDesktop} type="video/mp4" />
      </video> */}

            {/* Image component from Next.js (optimized for performance) */}
            {/* Note: This imports LOVURBackgroundDesktop image but only shows on mobile class */}
            <Image
                className="LOVUR-bg-image mobile"
                src={LOVURBackgroundDesktop}
                alt="LOVUR String Quartet"
            />
        </div>
    );
};

export default ShowcaseVideo;