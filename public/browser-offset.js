/**
 * browser-offset.js - Mobile Viewport Height Fix
 *
 * This script fixes a common mobile browser issue where 100vh (viewport height)
 * doesn't account for browser UI elements like address bars and tabs.
 *
 * Solution: Calculate the actual viewport height and set as CSS variable "--vh"
 * Then use "calc(var(--vh) * 100)" in CSS instead of "100vh"
 *
 * Why this is needed:
 * - Mobile browsers expand/collapse their UI as users scroll
 * - 100vh in CSS includes the full screen height including hidden UI
 * - This causes content to overflow on mobile devices
 */

/**
 * Function to calculate and update viewport height CSS variable
 * Called on load and window resize
 */
const resizeOps = () => {
  // Calculate 1% of actual viewport height
  // window.innerHeight = current visible height (excluding browser UI)
  // Divide by 100 to get 1% of the viewport
  document.documentElement.style.setProperty(
      "--vh",                           // CSS variable name
      window.innerHeight * 0.01 + "px" // Value: 1% of viewport height in pixels
  );

  // Log to console to verify script is running
};

// Run on initial page load
resizeOps();

// Re-calculate when window is resized (e.g., rotating device, browser resize)
window.addEventListener("resize", resizeOps);