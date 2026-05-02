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

          {/* Home link */}
          <li>
            <button onClick={() => handleNavigation("home-section")}>
              Home
            </button>
          </li>

          {/* About section link */}
          <li>
            <button onClick={() => handleNavigation("about-section")}>
              About
            </button>
          </li>

          {/* Featured artists section link */}
          <li>
            <button onClick={() => handleNavigation("artists-section")}>
              Our Artists
            </button>
          </li>

          {/* Video gallery section link */}
          <li>
            <button onClick={() => handleNavigation("work-section")}>
              Our Work
            </button>
          </li>

          {/* Services section link */}
          <li>
            <button onClick={() => handleNavigation("event-section")}>
              Services
            </button>
          </li>

          {/* Navigate to Twilight concert page */}
          <li>
            <button onClick={() => router.push("/Twilight")}>
              Twilight
            </button>
          </li>

          {/* Founder biography section */}
          <li>
            <button onClick={() => handleNavigation("estie-section")}>
              The Founder
            </button>

            {/* Commented out: submenu code (not currently in use) */}
            {/* <ul className={`desktop-submenu ${activeSubMenu === "founders-submenu" ? "active" : ""}`}>
            <li><button>Creators</button></li>
            <li><button>Estie</button></li>
            <li><button>Georgy</button></li>
          </ul> */}
          </li>

          {/* Contact section link */}
          <li>
            <button onClick={() => handleNavigation("contact-section")}>
              Contact Us
            </button>
          </li>
        </ul>
      </nav>
  );
};

export default DesktopNavbar;