import React, { useState } from "react";
import { useRouter } from "next/router";

/**
 * MobileNavbar.js - Responsive Mobile Navigation Menu
 *
 * Provides:
 * - Hamburger menu toggle button
 * - Sliding navigation menu
 * - Smooth scrolling to page sections
 * - Navigation to Twilight concert page
 * - Auto-closes menu after selection
 */

const MobileNavbar = () => {
  // Track if hamburger menu is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Next.js router for navigation
  const router = useRouter();

  /**
   * Handle navigation to a section
   * Performs different actions based on current page:
   * - If on main page: scroll directly to section
   * - If on Twilight page: navigate to home with query param, then scroll
   */
  const handleNavigation = (id) => {
    if (router.pathname === "/Twilight") {
      // Currently on Twilight page, need to go back to home first
      // Navigate to home page with scrollTo query parameter
      router.push(`/?scrollTo=${id}`).then(() => {
        // After navigation completes, scroll to target
        const targetElement = document.getElementById(id);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      });
    } else {
      // Already on main page, just scroll directly
      const targetElement = document.getElementById(id);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
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
        </div>
        </div>
      </>
  );
};

export default MobileNavbar;
