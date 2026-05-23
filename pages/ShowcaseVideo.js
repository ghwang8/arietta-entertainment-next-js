// import React, { useEffect, useRef } from "react";
// import ShowcaseBackgroundMobile from "../public/videos/showcase-video-mobile.mp4";
// import ShowcaseBackgroundDesktop from "../public/videos/showcase-video-desktop.mp4";
//
// /**
//  * ShowcaseVideo.js - Showcase Section with Background Video
//  *
//  * Displays:
//  * - Background video (responsive mobile/desktop versions)
//  * - Tagline describing the service
//  * - Geographic service area
//  * - Manages user interaction on videos
//  */
//
// const ShowcaseVideo = () => {
//   // Refs to control video elements directly
//   const mobileVideoRef = useRef(null);
//   const desktopVideoRef = useRef(null);
//
//   useEffect(() => {
//     /**
//      * Disable video interactivity on initial load
//      * This prevents accidental video controls during page loading/scrolling
//      */
//     const disableInteractivityOnLoad = () => {
//       // Disable focus on mobile video
//       if (mobileVideoRef.current) {
//         mobileVideoRef.current.setAttribute("tabindex", "-1"); // Remove from tab focus
//         mobileVideoRef.current.blur(); // Remove any current focus
//       }
//
//       // Disable focus on desktop video
//       if (desktopVideoRef.current) {
//         desktopVideoRef.current.setAttribute("tabindex", "-1");
//         desktopVideoRef.current.blur();
//       }
//     };
//
//     // Call disable function on component mount
//     disableInteractivityOnLoad();
//
//     /**
//      * Re-enable video interactivity after scrolling stops
//      * This allows users to control videos after page navigation is complete
//      */
//     const handleScrollStop = () => {
//       if (mobileVideoRef.current) {
//         mobileVideoRef.current.removeAttribute("tabindex"); // Add back to tab focus
//       }
//       if (desktopVideoRef.current) {
//         desktopVideoRef.current.removeAttribute("tabindex");
//       }
//     };
//
//     // Track scroll timeout to detect when scrolling stops
//     let scrollTimeout;
//     window.addEventListener("scroll", () => {
//       // Clear existing timeout each time user scrolls
//       clearTimeout(scrollTimeout);
//
//       // After 100ms of no scrolling, re-enable video controls
//       scrollTimeout = setTimeout(handleScrollStop, 100);
//     });
//
//     // Cleanup: Remove scroll listener when component unmounts
//     return () => {
//       window.removeEventListener("scroll", handleScrollStop);
//     };
//   }, []);
//
//   return (
//       <div className="component-container" id="showcase-section">
//         {/* Tagline text overlay on video */}
//         <div className="showcase-text-container">
//           <h2 className="secondary-text slogan">
//             Discover a community of exceptional live musicians who will take your
//             next event to unparalleled heights.
//           </h2>
//         </div>
//
//         {/* Geographic service areas footer */}
//         <div className="showcase-footer-container">
//         <span>
//           VANCOUVER • SQUAMISH • WHISTLER • VICTORIA • VANCOUVER ISLAND • THE
//           OKANAGAN • AND BEYOND
//         </span>
//         </div>
//
//         {/* Mobile background video (shown on small screens) */}
//         <video
//             className="background-video mobile"
//             autoPlay               // Play automatically
//             loop                   // Repeat when finished
//             muted                  // Mute audio (required for autoPlay)
//             playsInline           // Play inline on mobile (not fullscreen)
//             ref={mobileVideoRef}   // Reference for JavaScript control
//         >
//           <source src={ShowcaseBackgroundMobile} type="video/mp4" />
//         </video>
//
//         {/* Desktop background video (shown on large screens) */}
//         <video
//             className="background-video desktop"
//             autoPlay
//             loop
//             muted
//             playsInline
//             ref={desktopVideoRef}
//         >
//           <source src={ShowcaseBackgroundDesktop} type="video/mp4" />
//         </video>
//       </div>
//   );
// };
//
// export default ShowcaseVideo;
