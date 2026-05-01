import React, { useState } from "react";
import { useRouter } from "next/router";

const DesktopNavbar = () => {
  
  const router = useRouter();

  const handleNavigation = (id) => {
    if (router.pathname === "/Twilight") {
      // If on the Twilight page, navigate to the main page first
      router.push(`/?scrollTo=${id}`);
    } else {
      // If already on the main page, scroll to the section
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    
  };

  return (
    <nav className="desktop-navbar-nav">
      <ul className="desktop-navbar-list">
        <li>
          <button onClick={() => handleNavigation("home-section")}>Home</button>
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
          <button onClick={() => router.push("/Twilight")}>
            Twilight
          </button>
        </li>
        <li>
          <button onClick={() => handleNavigation("estie-section")}>
            The Founder
          </button>
          {/* <ul onMouseEnter={() => expandSubMenu("founders-submenu")} onMouseLeave={closeSubMenu} className={`desktop-submenu ${activeSubMenu === "founders-submenu" ? "active" : ""}`}
          id="founders-submenu">
          <li>
            <button onClick={() => handleNavigation("founders-section")}>Creators</button>
          </li>
          <li>
            <button onClick={() => handleNavigation("estie-section")}>Estie</button>
          </li>
          <li>
            <button onClick={() => handleNavigation("georgy-section")}>Georgy</button>
          </li>
        </ul> */}
        </li>
        
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