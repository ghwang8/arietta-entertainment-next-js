import React, { useState } from "react";
import { useRouter } from "next/router";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (id) => {
    if (router.pathname === "/Twilight") {
      // Navigate to the home page with a scrollTo query
      router.push(`/?scrollTo=${id}`).then(() => {
        const targetElement = document.getElementById(id);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      });
    } else {
      // Scroll directly to the section on the same page
      const targetElement = document.getElementById(id);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false); // Close the menu after navigation
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`navbar-toggle ${isOpen ? "open" : ""}`}
        onClick={toggleNavbar}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <div className={`sliding-menu-container ${isOpen ? "open" : ""}`}>
        <ul className="mobile-navbar-list">
          <li>
            <button onClick={() => handleNavigation("home-section")}>
              Home
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("about-section")}>
              About
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("artists-section")}>
              Our Artists
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("work-section")}>
              Our Work
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("event-section")}>
              Services
            </button>
          </li>
          <li>
            <button onClick={() => router.push("/Twilight")}>Twilight</button>
          </li>
          <li>
            <button onClick={() => handleNavigation("estie-section")}>
              The Founder
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("contact-section")}>
              Contact Us
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MobileNavbar;
