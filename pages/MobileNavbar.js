import React, { useState } from "react";

/**
 * MobileNavbar.js - Responsive Mobile Navigation Menu
 *
 * Provides:
 * - Hamburger menu toggle button
 * - Sliding navigation menu
 * - Smooth scrolling to page sections
 * - Auto-closes menu after selection
 */

const MobileNavbar = () => {
  // Track if hamburger menu is open or closed
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Handle navigation to a section
   * Scrolls directly to the section on the main page
   */
  const handleNavigation = (id) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }

    // Close menu after navigation
    setIsOpen(false);
  };

  /**
   * Toggle hamburger menu visibility
   */
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
      <>
        {/* Hamburger menu toggle button with 3 bars */}
        <div
            className={`navbar-toggle ${isOpen ? "open" : ""}`}
            onClick={toggleNavbar}
        >
          {/* Top bar of hamburger */}
          <span className="bar"></span>
          {/* Middle bar of hamburger */}
          <span className="bar"></span>
          {/* Bottom bar of hamburger */}
          <span className="bar"></span>
        </div>

        {/* Sliding menu container - shown/hidden based on isOpen state */}
        <div className={`sliding-menu-container ${isOpen ? "open" : ""}`}>
          <div className="mobile-navbar-content">
            {/* Navigation menu items */}
            <ul className="mobile-navbar-list">
              <li>
                <button className="urbanist" onClick={() => handleNavigation("home-section")}>
                  <span className="mobile-navbar-text">HOME</span>
                </button>
              </li>
              <li>
                <button className="urbanist" onClick={() => handleNavigation("about-section")}>
                  <span className="mobile-navbar-text">ABOUT</span>
                </button>
              </li>
              <li>
                <button className="urbanist" onClick={() => handleNavigation("work-section")}>
                  <span className="mobile-navbar-text">OUR WORK</span>
                </button>
              </li>
              <li>
                <button className="urbanist" onClick={() => handleNavigation("artists-section")}>
                  <span className="mobile-navbar-text">THE MUSICIANS</span>
                </button>
              </li>
              <li>
                <button className="urbanist" onClick={() => handleNavigation("contact-section")}>
                  <span className="mobile-navbar-text">INQUIRE</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </>
  );
};

export default MobileNavbar;