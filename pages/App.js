import { useEffect } from "react";
import { useRouter } from "next/router";

import MobileNavbar from "./MobileNavbar";
import Home from "./Home";
import ShowcaseVideo from "./ShowcaseVideo";
import About from "./About";
import Artists from "./Artists";
import Artists2 from "./Artists2";
import OtherArtists from "./OtherArtists";
import WorkYoutube from "./WorkYoutube";
import ServiceSetlist from "./ServiceSetlist";
import ServiceMusicians from "./ServiceMusicians";
import ServiceEvent from "./ServiceEvent";
import Estie from "./Estie";
import Twilight from "./Twilight";
import Contact from "./Contact";

import DesktopNavbar from "./DesktopNavbar";

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
 * Differences from index.js:
 * - No client-side rendering check (no isClient state)
 * - Uses "slug" query param instead of "slug" or "scrollTo"
 * - Simpler scroll logic without timeout delay
 * - Includes Twilight component (which index.js also includes)
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
            <DesktopNavbar />
            <Home />
            <ShowcaseVideo />
            <About />
            <Artists/>
            <Artists2/>
            <OtherArtists/>
            <WorkYoutube />
            <ServiceSetlist />
            <ServiceMusicians />
            <ServiceEvent />
            <Estie />
            <Twilight />
            <Contact />
        </div>
    );
}