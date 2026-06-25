import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import MobileNavbar from "./MobileNavbar";
import Home from "./Home";
import About from "./About";
import OurWork1 from "./OurWork1";
import OurWork2 from "./OurWork2";
import MeetTheMusicians from "./MeetTheMusicians";
import Contact from "./Contact";

/**
 * index.js - Main Landing Page & Router
 *
 * This is the homepage/index page of the application.
 * Responsibilities:
 * - Orchestrates all page sections (Home, About, Artists, Contact, etc.)
 * - Handles smooth scrolling to sections via URL query parameters
 * - Handles client-side rendering to avoid SSR (server-side rendering) issues
 *
 * Query Parameters:
 * - ?slug=section-name  -> Scrolls to that section
 * - ?scrollTo=section-name -> Alternative way to scroll to section
 */

export default function IndexPage() {
    // Track if component has mounted on client (prevents SSR mismatches)
    const [isClient, setIsClient] = useState(false);

    // Access Next.js router for query params and route changes
    const router = useRouter();

    useEffect(() => {
        // Mark component as client-mounted to enable interactive features
        setIsClient(true);

        const handleScrollToSection = () => {
            // Extract both slug and scrollTo params from URL query
            const { slug, scrollTo } = router.query;

            // Use slug if available, otherwise use scrollTo (slug takes priority)
            const target = slug || scrollTo;

            // Only proceed if a target section was specified in the URL
            if (target) {
                // Ensure section ID has "-section" suffix for consistency
                const sectionId = target.endsWith("-section") ? target : `${target}-section`;

                // Use setTimeout to allow component rendering to complete
                const scrollTimeout = setTimeout(() => {
                    // Find the DOM element with this ID
                    const section = document.getElementById(sectionId);

                    // If section exists on page, smoothly scroll to it
                    if (section) {
                        section.scrollIntoView({ behavior: "smooth", block: "start" });
                    } else {
                        // Log warning if section ID doesn't exist
                        console.warn("Section not found:", sectionId);
                    }
                }, 100); // 100ms delay ensures rendering is complete

                // Cleanup function to prevent memory leaks
                return () => clearTimeout(scrollTimeout);
            }
        };

        // Listen for route changes and scroll to new section
        router.events.on("routeChangeComplete", handleScrollToSection);

        // Also run scroll logic on initial page load
        handleScrollToSection();

        // Cleanup: Remove event listener when component unmounts
        return () => {
            router.events.off("routeChangeComplete", handleScrollToSection);
        };
    }, [router]); // Re-run when router object changes

    // Don't render anything on server-side to avoid hydration mismatch
    if (!isClient) {
        return null;
    }

    return (
        <div className="App">
            {/* Mobile hamburger menu (shown on small screens) */}
            <MobileNavbar />

            {/* Hero section with logo and tagline */}
            <Home id="home-section" />

            {/* About the company description */}
            <About id="about-section" />

            <OurWork1 id="work-section" />
            <OurWork2 />

            {/* Musicians: string and piano rosters */}
            <MeetTheMusicians id="artists-section" />

            {/* Commented out - setlist section currently disabled */}
            {/* <ServiceSetlist id="service-setlist-section" />
          <ServiceMusicians id="service-musicians-section" /> */}

            {/* Contact information and booking form */}
            <Contact id="contact-section" />
        </div>
    );
}