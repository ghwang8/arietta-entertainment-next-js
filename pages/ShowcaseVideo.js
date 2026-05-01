import React, { useEffect, useRef } from "react";
import ShowcaseBackgroundMobile from "../public/videos/showcase-video-mobile.mp4";
import ShowcaseBackgroundDesktop from "../public/videos/showcase-video-desktop.mp4";

const ShowcaseVideo = () => {
  const mobileVideoRef = useRef(null);
  const desktopVideoRef = useRef(null);

  useEffect(() => {
    // Disable user interaction on navigation load
    const disableInteractivityOnLoad = () => {
      if (mobileVideoRef.current) {
        mobileVideoRef.current.setAttribute("tabindex", "-1"); // Prevent focus
        mobileVideoRef.current.blur(); // Remove any accidental focus
      }
      if (desktopVideoRef.current) {
        desktopVideoRef.current.setAttribute("tabindex", "-1");
        desktopVideoRef.current.blur();
      }
    };

    disableInteractivityOnLoad();

    // Optional: Re-enable interactivity after scrolling is complete
    const handleScrollStop = () => {
      if (mobileVideoRef.current) {
        mobileVideoRef.current.removeAttribute("tabindex");
      }
      if (desktopVideoRef.current) {
        desktopVideoRef.current.removeAttribute("tabindex");
      }
    };

    let scrollTimeout;
    window.addEventListener("scroll", () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScrollStop, 100); // Re-enable after scrolling stops
    });

    return () => {
      window.removeEventListener("scroll", handleScrollStop);
    };
  }, []);

  return (
    <div className="component-container" id="showcase-section">
      <div className="showcase-text-container">
        <h2 className="secondary-text slogan">
          Discover a community of exceptional live musicians who will take your
          next event to unparalleled heights.
        </h2>
      </div>
      <div className="showcase-footer-container">
        <span>
          VANCOUVER • SQUAMISH • WHISTLER • VICTORIA • VANCOUVER ISLAND • THE
          OKANAGAN • AND BEYOND
        </span>
      </div>
      <video
        className="background-video mobile"
        loading="lazy"
        autoPlay
        loop
        muted
        playsInline
        ref={mobileVideoRef}
      >
        <source src={ShowcaseBackgroundMobile} type="video/mp4" />
      </video>
      <video
        className="background-video desktop"
        loading="lazy"
        autoPlay
        loop
        muted
        playsInline
        ref={desktopVideoRef}
      >
        <source src={ShowcaseBackgroundDesktop} type="video/mp4" />
      </video>
    </div>
  );
};

export default ShowcaseVideo;
