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

export default function App() {
  const router = useRouter();

  useEffect(() => {
    const { slug } = router.query; // Get the slug from the URL
    if (slug) {
      const section = document.getElementById(`${slug}-section`); // Find the section by ID
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [router.query]); // Re-run when the URL changes
  
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
