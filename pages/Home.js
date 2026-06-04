import React from "react";

/**
 * Home.js - Hero/Landing Section Component
 *
 * Displays the main hero section with:
 * - Desktop navigation bar
 * - Full-screen background image
 * - Company logo
 * - Tagline/slogan
 *
 * This is the first section users see when they visit the site.
 */

const Home = () => {
    /**
     * Handle navigation to section
     * Scrolls smoothly to the section on the main page
     */
    const handleNavigation = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

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

            {/* Desktop Navigation Bar */}
            <nav className="desktop-navbar-nav" style={{position: 'relative', zIndex: 2}}>
                {/* Horizontal menu list */}
                <ul className="desktop-navbar-list">
                    <li>
                        <button className="urbanist" onClick={() => handleNavigation("home-section")}>
                            <span className="navbar-text">HOME</span>
                        </button>
                    </li>
                    <li>
                        <button className="urbanist" onClick={() => handleNavigation("about-section")}>
                            <span className="navbar-text">ABOUT</span>
                        </button>
                    </li>
                    <li>
                        <button className="urbanist" onClick={() => handleNavigation("work-section")}>
                            <span className="navbar-text">OUR WORK</span>
                        </button>
                    </li>
                    <li>
                        <button className="urbanist" onClick={() => handleNavigation("artists-section")}>
                            <span className="navbar-text">THE MUSICIANS</span>
                        </button>
                    </li>
                    <li>
                        <button className="urbanist" onClick={() => handleNavigation("contact-section")}>
                            <span className="navbar-text">INQUIRE</span>
                        </button>
                    </li>
                </ul>
            </nav>

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