import React from "react";
import { useRouter } from "next/router";

/**
 * DesktopNavbar.js - Desktop Navigation Bar
 *
 * Horizontal navigation menu for desktop displays
 * Provides:
 * - Navigation to all main sections
 * - Link to Twilight concert page
 * - Handles scroll-based navigation on main page
 * - Handles cross-page navigation from Twilight page
 */

const DesktopNavbar = () => {
  const router = useRouter();

  /**
   * Handle navigation to section
   * Behavior depends on current page location:
   * - On main page: scroll smoothly to section
   * - On Twilight page: navigate to home with auto-scroll query
   */
  const handleNavigation = (id) => {
    if (router.pathname === "/Twilight") {
      // If on Twilight page, navigate home first with scroll query
      router.push(`/?scrollTo=${id}`);
    } else {
      // If on main page, scroll directly to element
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
      <nav className="desktop-navbar-nav">
        {/* Horizontal menu list */}
        <ul className="desktop-navbar-list">
          <li>
            <button onClick={() => handleNavigation("home-section")}>
              HOME
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("about-section")}>
              ABOUT
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("work-section")}>
              OUR WORK
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("artists-section")}>
              THE MUSICIANS
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("contact-section")}>
              INQUIRE
            </button>
          </li>
        </ul>
      </nav>
  );
};

export default DesktopNavbar;