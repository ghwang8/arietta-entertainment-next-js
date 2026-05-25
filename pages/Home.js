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
        {/* Background video */}
        <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
              filter: 'brightness(0.6)'
            }}
        >
          <source src="/videos/ARIETTA Website Video.mp4" type="video/mp4" />
        </video>

        {/* Logo container */}
        <div className="logo-container home" style={{position: 'relative', zIndex: 1}}>
          <img src="/images/ARIETTA%20Logo%20-%20White%20Font%20no%20graphic.png" alt="arietta logo" />
        </div>

        {/* Tagline */}
        <div className="slogan-container" style={{position: 'relative', zIndex: 1}}>
            <h2 className="secondary-text slogan" style={{fontFamily: "'The Seasons', serif", color: 'white'}}>
                <em style={{fontFamily: "'The Seasons Italic', serif"}}>Elevating</em> EVENTS with <em style={{fontFamily: "'The Seasons Italic', serif"}}>timeless</em> MUSIC.
            </h2>

            <div className="urbanist" style={{color: 'white', fontSize: '0.9rem', letterSpacing: '2px', marginTop: '1rem'}}>
                VANCOUVER • SQUAMISH • WHISTLER • VICTORIA • VANCOUVER ISLAND • THE OKANAGAN • AND BEYOND
            </div>
        </div>
      </div>
  );

};

export default Home;