/**
 * API Route: send-quote
 *
 * This backend endpoint handles:
 * 1. Formatting the quote email
 * 2. (Email sending to be added later)
 *
 * Called from component via: fetch('/api/send-quote', { method: 'POST', ... })
 */

import { formatQuoteEmail } from "../../utils/emailService";

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

        // Format professional email
        const emailBody = formatQuoteEmail(quoteData, lineItems, totals);

        return res.status(200).json({
            success: true,
            message: "Quote received successfully",
        });
    } catch (error) {
        console.error("❌ Error in send-quote API:", error.message);
        console.error("Full error:", error);
        return res.status(500).json({
            error: "Failed to process quote. Please try again or contact us directly.",
        });
    }
}