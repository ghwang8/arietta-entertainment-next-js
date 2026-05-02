/**
 * constants.js - Application-wide constants
 *
 * Centralized location for configuration values that don't change often.
 */

// Pricing add-ons
export const AUDIO_SYSTEM_PER_MUSICIAN = 80;
export const CUSTOM_SONG_PRICE = 45;
export const MIC_OFFICIANT_PRICE = 35;
export const RECORDING_PRICE = 150;

// Tax
export const GST = 0.05;

// Duration options
export const DURATIONS = ["1 hr", "1.5 hr", "2 hr", "2.5 hr", "3 hr"];

// Event occasions
export const OCCASIONS = ["Wedding", "Proposal", "Birthday Party", "Corporate Event", "Other"];

// Time options (every 30 min)
export const TIME_OPTIONS = (() => {
    const times = [];
    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 30) {
            const period = h < 12 ? "AM" : "PM";
            const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
            times.push(`${h12}:${m === 0 ? "00" : "30"} ${period}`);
        }
    }
    return times;
})();

// Formatting utility
export const fmt = (n) =>
    n.toLocaleString("en-CA", { style: "currency", currency: "CAD", minimumFractionDigits: 2 });