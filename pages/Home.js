import React from "react";

/**
 * Home.js - Hero/Landing Section Component
 *
 * Displays the main hero section with:
 * - Full-screen background image
 * - Company logo
 * - Tagline/slogan
 *
 * This is the first section users see when they visit the site.
 */

const Home = () => {
  // Inline styles object that creates the background visual
  const backgroundStyle = {
    // Fallback black color if image doesn't load
    backgroundColor: "#000000",

    // Background image URL (served from public/images folder)
    backgroundImage: "url(/images/temp-home-bg.png)",

    // Image fills the entire container proportionally
    backgroundSize: "cover",

    // Center the image on the screen
    backgroundPosition: "center",

    // Don't repeat the image if screen is larger than image
    backgroundRepeat: "no-repeat",

    // Make container full viewport height
    height: "100%",

    // Hide any overflow content
    overflow: "hidden",

    // Required for absolute/relative positioning of child elements
    position: "relative"
  };

  return (
      <div
          style={backgroundStyle}
          className="component-container home"
          id="home-section"
      >
        {/* Logo container - displays ARIETTA logo */}
        <div className="logo-container home">
          <img src="/images/arietta-logo.svg" alt="arietta logo" />
        </div>

        {/* Company tagline/slogan */}
        <div className="slogan-container">
          <h2 className="secondary-text slogan">
            Where live music and entertainment meet excellence.
          </h2>
        </div>
      </div>
  );
};

export default Home;