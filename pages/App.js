import { useEffect } from "react";
import { useRouter } from "next/router";

import MobileNavbar from "./MobileNavbar";
import Home from "./Home";
import About from "./About";
import OurWork1 from "./OurWork1";
import OurWork2 from "./OurWork2";
import MeetTheMusicians from "./MeetTheMusicians";
import ServiceSetlist from "./ServiceSetlist";
import ServiceMusicians from "./ServiceMusicians";
import Contact from "./Contact";

/**
 * App.js - LEGACY/ALTERNATE ROUTE (Not currently used)
 *
 * IMPORTANT: This component is similar to pages/index.js but is NOT actively used.
 *
 * Why it exists:
 * - Next.js uses pages/index.js as the primary homepage route
 * - App.js remains in the codebase as a backup or reference implementation
 * - May have been kept for future use or as a fallback pattern
 *
 * Current behavior:
 * - This file does NOT render when you visit the site
 * - Use pages/index.js for any homepage changes
 *
 * Recommendation:
 * - Delete this file if no longer needed, OR
 * - Document why it should be kept (for legacy support, A/B testing, etc.)
 */

export default function App() {
    const router = useRouter();

    useEffect(() => {
        // Extract slug parameter from URL query string
        const { slug } = router.query;

        // If slug exists in URL, scroll to that section
        if (slug) {
            // Find the DOM element with matching section ID
            const section = document.getElementById(`${slug}-section`);

            // Scroll to section if it exists
            if (section) {
                section.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    }, [router.query]); // Re-run whenever URL query params change

    return (
        <div className="App">
            <MobileNavbar />
            <Home />
            <About />
            <OurWork1/>
            <OurWork2/>
            <MeetTheMusicians/>
            <ServiceSetlist />
            <ServiceMusicians />
            <Contact />
        </div>
    );
}