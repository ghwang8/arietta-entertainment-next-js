/**
 * emailService.js - EmailJS service helpers
 *
 * Handles communication with EmailJS API for sending emails.
 */

/**
 * Load EmailJS library dynamically
 * Only loads when needed to reduce bundle size
 */
export const loadEmailJS = async () => {
    if (window.emailjs) return window.emailjs;

    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
        script.onload = () => {
            window.emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
            resolve(window.emailjs);
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
};

/**
 * Format quote data into a professional email body
 *
 * @param {Object} quoteData - Quote information
 * @param {Array} lineItems - Itemized breakdown
 * @returns {string} - Formatted email body
 */
export const formatQuoteEmail = (quoteData, lineItems, totals) => {
    const { clientName, occasion, eventDate, startTime, endTime, location, venueName, notes } = quoteData;
    const { subtotal, gst, total } = totals;
    const fmt = (n) => n.toLocaleString("en-CA", { style: "currency", currency: "CAD" });

    const formattedDate = eventDate
        ? new Date(eventDate + "T00:00:00").toLocaleDateString("en-CA", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "—";

    const breakdownRows = lineItems.map(({ label, val }) => `  ${label}: ${fmt(val)}`).join("\n");

    return `Hi ${clientName || "there"},

Thank you for your inquiry with Arietta Entertainment! Here is a summary of your quote:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLIENT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Event Date: ${formattedDate}
Start Time: ${startTime || "—"}
End Time: ${endTime || "—"}
Location: ${location || "—"}
Venue: ${venueName || "—"}
Notes: ${notes || "—"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRICING SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${breakdownRows}

Subtotal: ${fmt(subtotal)}
GST (5%): ${fmt(gst)}
TOTAL: ${fmt(total)}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

We will be in touch shortly to confirm your booking.

Warm regards,
Arietta Entertainment`;
};