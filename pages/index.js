import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";
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
import Contact from "./Contact";

export default function IndexPage() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Ensure this only runs on the client side

    const handleScrollToSection = () => {
      const { slug, scrollTo } = router.query; // Extract both `slug` and `scrollTo`
      const target = slug || scrollTo; // Prioritize `slug` over `scrollTo`

      if (target) {
        const sectionId = target.endsWith("-section") ? target : `${target}-section`;
        const scrollTimeout = setTimeout(() => {
          const section = document.getElementById(sectionId); // Find the section by ID

          if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            console.warn("Section not found:", sectionId);
          }
        }, 100); // Delay to ensure rendering is complete

        return () => clearTimeout(scrollTimeout); // Cleanup timeout if component unmounts
      }
    };

    // Run scroll logic on route change and initial load
    router.events.on("routeChangeComplete", handleScrollToSection);
    handleScrollToSection();

    return () => {
      router.events.off("routeChangeComplete", handleScrollToSection); // Cleanup event listener
    };
  }, [router]);

  if (!isClient) {
    return null; // Prevent server-side rendering issues
  }

  return (
    <div className="App">
      <MobileNavbar />
      <DesktopNavbar />
      <Home id="home-section" />
      <ShowcaseVideo id="showcase-video-section" />
      <About id="about-section" />
      <Artists id="artists-section" />
      <Artists2 id="artists2-section" />
      <OtherArtists id="other-artists-section" />
      <WorkYoutube id="work-youtube-section" />
      {/* <ServiceSetlist id="service-setlist-section" />
      <ServiceMusicians id="service-musicians-section" /> */}
      <ServiceEvent id="service-event-section" />
      <Estie id="estie-section" />
      <Contact id="contact-section" />
    </div>
  );
}
