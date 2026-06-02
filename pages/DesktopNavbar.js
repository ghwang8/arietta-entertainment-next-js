import React from "react";

/**
 * DesktopNavbar.js - Desktop Navigation Bar
 *
 * Horizontal navigation menu for desktop displays
 * Provides:
 * - Navigation to all main sections
 * - Handles smooth scroll-based navigation on main page
 */

const DesktopNavbar = () => {
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

  return (
      <nav className="desktop-navbar-nav">
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
  );
};

export default DesktopNavbar;