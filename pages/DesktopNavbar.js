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
              HOME
            </button>
          </li>
          <li>
            <button className="urbanist" onClick={() => handleNavigation("about-section")}>
              ABOUT
            </button>
          </li>
          <li>
            <button className="urbanist" onClick={() => handleNavigation("work-section")}>
              OUR WORK
            </button>
          </li>
          <li>
            <button className="urbanist" onClick={() => handleNavigation("artists-section")}>
              THE MUSICIANS
            </button>
          </li>
          <li>
            <button className="urbanist" onClick={() => handleNavigation("contact-section")}>
              INQUIRE
            </button>
          </li>
        </ul>
      </nav>
  );
};

export default DesktopNavbar;