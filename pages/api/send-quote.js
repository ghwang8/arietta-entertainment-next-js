/**
 * API Route: send-quote
 *
 * This backend endpoint handles:
 * 1. Sending email via EmailJS (with secrets safe from client)
 * 2. Saving quote to Firebase database
 *
 * Called from component via: fetch('/api/send-quote', { method: 'POST', ... })
 */

import { loadEmailJS, formatQuoteEmail } from "../../utils/emailService";
import { saveQuoteToFirebase } from "../../utils/firebase";

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { clientEmail, clientName, quoteData, lineItems, totals } = req.body;

        // Validate required fields
        if (!clientEmail || !clientName) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Initialize EmailJS (server-side - secrets are safe)
        await loadEmailJS();

        // Format professional email
        const emailBody = formatQuoteEmail(quoteData, lineItems, totals);

        // Send email via EmailJS
        await window.emailjs.send(
            process.env.EMAILJS_SERVICE_ID,
            process.env.EMAILJS_TEMPLATE_ID,
            {
                to_email: clientEmail,
                cc_email: process.env.ARIETTA_EMAIL,
                to_name: clientName,
                from_name: "Arietta Entertainment",
                reply_to: process.env.ARIETTA_EMAIL,
                subject: `Your Arietta Quote — ${quoteData.occasion || "Event"}`,
                message: emailBody,
            }
        );

        // Save quote to Firebase
        const quoteId = await saveQuoteToFirebase({
            clientName,
            clientEmail,
            ...quoteData,
            lineItems,
            totals,
        });

        return res.status(200).json({
            success: true,
            quoteId,
            message: "Quote sent successfully",
        });
    } catch (error) {
        console.error("Error in send-quote API:", error);
        return res.status(500).json({
            error: "Failed to send quote. Please try again or contact us directly.",
        });
    }
}